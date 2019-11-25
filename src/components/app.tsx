import * as React from 'react'
import { connect } from 'react-redux'
import { Target } from '../domain'
import { State } from '../redux/store'
import { updateTarget, addTarget } from '../usecases'

const mapStateToProps = (state: State) => {
  const { targets } = state.domain
  const { now } = state.time
  return {
    now,
    targets: targets.items.map(target => ({
      id: target.createdAt,
      streak: Target.getStreak(target, now),
      all: Target.getStreak(target, now),
      description: target.description,
    })),
  }
}

const mapDispatchToProps = { updateTarget, addTarget }

namespace Component {
  type Props = {
    targets: {
      streak: number
      all: number
      id: string
      description: string
    }[]
    updateTarget: (id: string, now: Date) => void
    addTarget: (description: string, now: Date) => void
    now: Date
  }

  export function App({ targets, updateTarget, addTarget, now }: Props) {
    const { useState } = React
    const [description, setDesription] = useState('')
    return (
      <div>
        <input
          type="text"
          value={description}
          onChange={e => setDesription(e.target.value)}
        />
        <button onClick={() => addTarget(description, now)}>add</button>
        {targets.map(({ streak, id, description, all }, i) => (
          <div key={i}>
            <p>{description}</p>
            <p>連続{streak}日</p>
            <p>累計{all}日</p>
            <button onClick={() => updateTarget(id, now)}>できた</button>
          </div>
        ))}
      </div>
    )
  }
}

export const App = connect(mapStateToProps, mapDispatchToProps)(Component.App)
