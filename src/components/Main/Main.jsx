import { useEffect, useState } from 'react'
import { Title, Card, Toolbar } from '@components'
import { game3x2 } from '@data'
import { getPadTime } from '../../helpers/getPadTime'

import styles from './Main.module.scss'

export const Main = () => {
  const columnCount = Math.ceil(game3x2.length / 2)
  const rowsCount = Math.ceil(game3x2.length / columnCount)
  const [cardHeight, setCardHeight] = useState(0)
  const [view, setView] = useState(0)
  const [isCounting, setisCounting] = useState(false)

  const [timeLeft, setTimeLeft] = useState(2 * 60)
  const minutes = getPadTime(Math.floor(timeLeft / 60))
  const seconds = getPadTime(timeLeft - minutes * 60)

  useEffect(() => {
    const card = document.querySelector('[data-value]')
    setCardHeight(card.offsetWidth)

    const area = document.getElementById('area')
    const handelViewCount = (event) => {
      const { target } = event
      const parent = target.parentNode

      if (parent.closest('[data-value]') && parent.getAttribute('data-open') === 'false') {
        setisCounting(true)
        setView((prevValue) => prevValue + 1)
      }
    }
    const interval = setInterval(() => {
      // eslint-disable-next-line no-unused-expressions
      isCounting
                && setTimeLeft((time) => (time >= 1 ? time - 1 : 0))
    }, 1000)

    area.addEventListener('click', handelViewCount)
    return () => {
      area.removeEventListener('click', handelViewCount)
      clearInterval(interval)
    }
  }, [columnCount, isCounting])

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <Title>
          PEXESO
        </Title>
        <div className={styles.body}>
          <div
            id="area"
            className={styles.area}
            style={{
              gridTemplateColumns: `repeat(${columnCount}, 1fr)`,
              gridTemplateRows: `repeat(${rowsCount}, ${cardHeight}px)`,
            }}
          >
            {game3x2.map((card) => (
              <Card
                key={card.value}
                {...card}
              />
            ))}
          </div>
          <div className={styles.score}>
            <Toolbar
              title="Time"
              time={{ minutes, seconds }}
            />
            <Toolbar
              title="View"
              value={view}
            />
            <Toolbar
              title="View"
              value="0"
            />
          </div>
        </div>
      </div>
    </main>
  )
}
