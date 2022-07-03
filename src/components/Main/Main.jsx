import { useEffect, useState } from 'react'
import { Title, Card, Toolbar } from '@components'
import { game3x2 } from '@data'
import { getPadTime } from '../../helpers/getPadTime'

import styles from './Main.module.scss'

export const Main = () => {
  const columnCount = Math.ceil(game3x2.length / 2)
  const rowsCount = Math.ceil(game3x2.length / columnCount)

  const [cardHeight, setCardHeight] = useState(0)
  const [values, setValues] = useState({
    counter: 0,
    score: 0,
  })
  const { counter, score } = values
  const [isCounting, setIsCounting] = useState(false)

  const [timeLeft, setTimeLeft] = useState(2 * 60)
  const minutes = getPadTime(Math.floor(timeLeft / 60))
  const seconds = getPadTime(timeLeft - minutes * 60)

  const [items, setItems] = useState(game3x2)
  const [prev, setPrev] = useState(-1)

  const check = (current) => {
    if (items[current].value === items[prev].value) {
      items[current].status = 'correct'
      items[prev].status = 'correct'
      setItems([...items])
      setPrev(-1)
    } else {
      items[current].status = 'wrong'
      items[prev].status = 'wrong'
      setItems([...items])
      setTimeout(() => {
        items[current].status = ''
        items[prev].status = ''
        setItems([...items])
        setPrev(-1)
      }, 1000)
    }
  }

  const handelSelectCard = (index) => {
    if (prev === -1) {
      items[index] = {
        ...items[index],
        status: 'active',
      }
      setItems([...items])
      setPrev(index)
    } else {
      check(index)
    }
  }

  useEffect(() => {
    const card = document.querySelector('[data-value]')
    setCardHeight(card.offsetWidth)

    const interval = setInterval(() => {
      // eslint-disable-next-line no-unused-expressions
      isCounting && setTimeLeft((time) => (time >= 1 ? time - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
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
            {items.map((card, index) => (
              <Card
                key={card.id}
                selectCard={handelSelectCard}
                card={card}
                index={index}
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
              value={counter}
            />
            <Toolbar
              title="Score"
              value={score}
            />
          </div>
        </div>
      </div>
    </main>
  )
}
