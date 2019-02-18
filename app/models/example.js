import {createAction, delay, NavigationActions, Storage} from '../utils'
import * as authService from '../services/auth'

import {exampleGET,examplePost,examplePostFile,examplePUT,examplePUTFile} from "../services/service";

export default {
  namespace: 'example',
  state: {
    example:{}
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *taskExampleGET({payload}, { call, put }) {
      const example = yield call(exampleGET, payload);
      yield put(createAction('updateState')({example}))
    },
    *taskExamplePost({payload}, { call, put }) {
      const example = yield call(examplePost, {age:"18"});
      yield put(createAction('updateState')({example}))
    },
    *taskExamplePostFile({payload}, { call, put }) {
      const example = yield call(examplePostFile, {age:"18"});
      yield put(createAction('updateState')({ example}))
    },
    *taskExamplePut({payload}, { call, put }) {
      const example = yield call(examplePUT, {age:"18"});
      yield put(createAction('updateState')({example}))
    },
    *taskExamplePutFile({payload}, { call, put }) {
      const example = yield call(examplePUTFile, {age:"18"});
      yield put(createAction('updateState')({example}))
    },
  },
}
