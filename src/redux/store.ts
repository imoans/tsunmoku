import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk, { ThunkAction } from 'redux-thunk'
import {
  reducer as domainReducer,
  Action as domainAction,
} from './domain/module'
import { reducer as timeReducer, Action as timeAction } from './time/module'

const reducers = combineReducers({
  domain: domainReducer,
  time: timeReducer,
})

export const store = createStore(reducers, applyMiddleware(thunk))

export type State = ReturnType<typeof store.getState>

type Action = domainAction | timeAction
export type UseCaseAction = ThunkAction<void, State, null, Action>
