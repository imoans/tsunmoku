const type = 'time/update'

type State = {
  now: Date
}

export type Action = ReturnType<typeof update>

export const update = (state: State) => {
  return {
    type,
    payload: state,
  }
}

export const reducer = (state: State = { now: new Date() }, action: Action) => {
  if (action.type === type) {
    return action.payload
  }
  return state
}
