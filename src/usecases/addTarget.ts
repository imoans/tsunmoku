import { update } from '../redux/domain/module'
import { UseCaseAction } from '../redux/store'

export const addTarget = (description: string, date: Date): UseCaseAction => (
  dispatch,
  getState,
) => {
  const target = {
    description,
    createdAt: date.toISOString(),
    startAt: date.toISOString(),
    status: {},
  }

  const targets = {
    items: getState().domain.targets.items.concat(target),
  }

  dispatch(update({ targets }))
}
