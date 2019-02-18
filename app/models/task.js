import { createAction, NavigationActions, Storage } from '../utils'

export default {
  namespace: 'task',
  state: {
    classList:{}
  },
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    },
  },
  effects: {
    *taskGetClassList(action, { call, put }) {

    },
  },
}
