import { Targets } from '../../domain'

const type = 'domain/update'

export type Action = ReturnType<typeof update>

type State = {
  targets: Targets.State
}

const initialState = {
  targets: { items: [] },
}

export const update = (state: State) => {
  return {
    type,
    payload: state,
  }
}

export const reducer = (state: State = initialState, action: Action) => {
  if (action.type === type) {
    return action.payload
  }
  return state
}
