/**
 * Unleash | ProfileContainer.js
 * @author X-Team 2016 <http://www.x-team.com>
 * @author Sergio Tashdjian <sergio.tashdjian@x-team.com>
 */

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import * as ProfileActions from '../actions/ProfileActions';
import * as PathsActions from '../actions/PathsActions';
import * as GoalsActions from '../actions/GoalsActions';
import Profile from '../components/Profile';

function mapStateToProps(state) {
  return {
    userId: state.userId,
    paths: state.paths,
    profiles: state.profiles,
    loggedInUser: state.user.userData,
    addModalParameters: state.goals.addGoalsModal,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...ProfileActions,
      ...PathsActions,
      ...GoalsActions,
    }, dispatch),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Profile));
