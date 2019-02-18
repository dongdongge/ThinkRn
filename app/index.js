import './theme.js';
import React from 'react'
import { AppRegistry } from 'react-native'
import dva from './utils/dva'
import createLoading from '../app/common/AppLoading';
import Router, { routerMiddleware, routerReducer } from './router'
import appModel from './models';
import {name as appName} from '../app.json';
import logger from 'redux-logger'
const app = dva({
  initialState: {},
  models: appModel,
  extraReducers: { router: routerReducer },
  onAction: [routerMiddleware,logger],
  onError(err) {
    log('dva-onError', err);
  },
});
app.use(createLoading());
const App = app.start(<Router />);
AppRegistry.registerComponent(appName, () => App);
