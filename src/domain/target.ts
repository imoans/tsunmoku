import { subDays, isAfter } from 'date-fns'

export namespace Target {
  export type State = {
    description: string
    startAt: string
    createdAt: string
    status: { [yyyymmdd: string]: { date: string; executed: boolean } }
  }

  export function getDateKey(date: Date) {
    return (
      date.getFullYear() + `0${date.getMonth() + 1}`.slice(-2) + date.getDate()
    )
  }

  export function getFirstExecutedDate(state: State) {
    const keys = Object.keys(state.status)
    if (keys.length === 0) return null
    const firstKey = Math.min(
      ...keys
        .filter(key => state.status[key].executed === true)
        .map(key => parseInt(key, 10)),
    )
    const status = state.status[firstKey]
    if (status == null) return null
    return new Date(status.date)
  }

  export function getStreak(state: State, date: Date) {
    let currentDate = date
    const firstDate = getFirstExecutedDate(state)
    let streak = 0
    if (firstDate == null) return streak

    while (!isAfter(currentDate, firstDate)) {
      const key = getDateKey(currentDate)
      const status = state.status[key]
      if (status == null) break
      if (!status.executed) break
      streak = streak + 1
      currentDate = subDays(currentDate, 1)
    }
    return streak
  }

  export function getAll(state: State) {
    const keys = Object.keys(state.status)
    return keys.filter(key => state.status[key].executed === true).length
  }
}
