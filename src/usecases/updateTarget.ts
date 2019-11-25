import { update } from '../redux/domain/module'
import { UseCaseAction } from '../redux/store'
import { Target } from '../domain'

export const updateTarget = (createdAt: string, date: Date): UseCaseAction => (
  dispatch,
  getState,
) => {
  const { targets } = getState().domain
  const index = targets.items.findIndex(
    target => target.createdAt === createdAt,
  )
  if (index != null) {
    const target = targets.items[index]
    const key = Target.getDateKey(date)
    const slicedItems = targets.items.slice()
    slicedItems.splice(index, 1, {
      ...target,
      status: {
        ...target.status,
        [key]: { date: date.toISOString(), executed: true },
      },
    })
    const newTargets = {
      items: slicedItems,
    }
    dispatch(update({ targets: newTargets }))
  }
}
