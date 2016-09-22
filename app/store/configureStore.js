import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers/rootReducer';

const logger = createLogger({
  predicate: () => process.env.NODE_ENV !== 'production'
});

const middleware = [thunk, logger];
let applyMiddlewareConfig = applyMiddleware(...middleware);

if (process.env.NODE_ENV !== 'production') {
  applyMiddlewareConfig = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
}

export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, applyMiddlewareConfig);
}
