#!/usr/bin/env bash

set -ev
APP_ENV=$1

# more bash-friendly output for jq
JQ="jq --raw-output --exit-status"

configure_aws_cli() {
  aws --version
  aws configure set default.region us-west-2
  aws configure set default.output json
}

deploy_cluster() {
    family="x-team-unleash"

    make_task_def
    register_definition
    if [[ $(aws ecs update-service --cluster x-team-unleash-cluster --service x-team-unleash-$APP_ENV --task-definition $revision | \
                   $JQ '.service.taskDefinition') != $revision ]]; then
        echo "Error updating service."
        return 1
    fi
}

make_task_def() {
	task_template='[
		{
			"name": "web",
      "image": "%s.dkr.ecr.us-west-2.amazonaws.com/x-team-unleash:%s",
			"essential": true,
			"memory": 256,
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "awslogs-x-team-unleash",
          "awslogs-region": "us-west-2"
        }
      },
			"portMappings": [
				{
					"hostPort": 0,
          "containerPort": 80,
          "protocol": "tcp"
        }
			]
		}
	]'

	task_def=$(printf "$task_template" $AWS_ACCOUNT_ID $TRAVIS_BUILD_NUMBER-$APP_ENV)
}

push_ecr_image() {
  eval $(aws ecr get-login --region us-west-2)
  docker push $AWS_ACCOUNT_ID.dkr.ecr.us-west-2.amazonaws.com/x-team-unleash:$TRAVIS_BUILD_NUMBER-$APP_ENV
}

register_definition() {

    if revision=$(aws ecs register-task-definition --container-definitions "$task_def" --family $family | $JQ '.taskDefinition.taskDefinitionArn'); then
        echo "Revision: $revision"
    else
        echo "Failed to register task definition"
        return 1
    fi

}

configure_aws_cli
push_ecr_image
deploy_cluster
