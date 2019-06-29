import { combineReducers } from "redux";

export default combineReducers({
  rootState: () => null
})

export type Action = {
  type: string,
  payload?: any,
}