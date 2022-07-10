import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import {
  Title, Card, Score, MainPopup,
} from '@components'
import { game3x2 } from '@data'
import { getPadTime } from '@helpers/getPadTime'

import styles from './Main.module.scss'

export const Main = () => {
  const router = useRouter()
  const columnCount = Math.ceil(game3x2.length / 3)
  const rowsCount = Math.ceil(game3x2.length / columnCount)

  const [cardHeight, setCardHeight] = useState(0)
  const [counter, setCounter] = useState(0)
  const [score, setScore] = useState(0)

  const [isCounting, setIsCounting] = useState(false)
  const [timeLeft, setTimeLeft] = useState(2 * 60)
  const minutes = getPadTime(Math.floor(timeLeft / 60))
  const seconds = getPadTime(timeLeft - minutes * 60)

  const [items, setItems] = useState(game3x2)
  const [prev, setPrev] = useState(-1)

  const [isShow, setIsShow] = useState(false)
  const [modalTitles, setModalTitles] = useState('')

  const handlerCheck = (current) => {
    items[current].open = true
    setItems([...items])

    if (items[current].value === items[prev].value) {
      setTimeout(() => {
        items[current] = { ...items[current], open: false, status: 'correct' }
        items[prev] = { ...items[prev], open: false, status: 'correct' }
        setItems([...items])

        setScore((prevScore) => prevScore + 1)
      }, 500)
    } else {
      items[current] = { ...items[current], status: 'wrong' }
      items[prev] = { ...items[prev], status: 'wrong' }
      setItems([...items])
      setTimeout(() => {
        items[current] = { ...items[current], open: false, status: '' }
        items[prev] = { ...items[prev], open: false, status: '' }
        setItems([...items])
      }, 500)
    }
    setPrev(-1)
  }

  const handlerSelectCard = (index) => {
    setIsCounting(true)
    setCounter((prevCounter) => prevCounter + 1)

    if (prev === -1) {
      items[index] = {
        ...items[index],
        open: true,
      }
      setItems([...items])
      setPrev(index)
    } else {
      handlerCheck(index)
    }
  }

  const handlerWin = () => {
    const statusCard = items.findIndex((item) => item.status === '')
    if (statusCard === -1) {
      setIsCounting(false)
      setModalTitles('It was a wonderful game! Great job!')
      setIsShow(true)
    }
  }
  const handlerLost = () => {
    setModalTitles('You Lost')
    setIsShow(true)
  }

  const handlerRepeatGame = () => {
    router.reload()
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line no-unused-expressions
      isCounting && setTimeLeft((time) => (time >= 1 ? time - 1 : 0))
    }, 1000)

    handlerWin()

    return () => {
      clearInterval(interval)
      handlerWin()
    }
  }, [isCounting, items])

  useEffect(() => {
    const card = document.querySelector('[data-value]')
    setCardHeight(card.offsetWidth)

    items.sort(() => Math.random() - 0.5)
    setItems([...items])
  }, [columnCount])

  useEffect(() => {
    if (minutes === '00' && seconds === '00') {
      handlerLost()
    }
  }, [minutes, seconds])

  const handlerCloseModal = () => {
    setIsShow(false)
  }

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
                selectCard={handlerSelectCard}
                card={card}
                index={index}
              />
            ))}
          </div>
          <Score
            counter={counter}
            score={score}
            time={{ minutes, seconds }}
          />
        </div>
      </div>
      <MainPopup
        isShow={isShow}
        onClose={handlerCloseModal}
        title={modalTitles}
      >
        <button
          type="button"
          className={styles.reload}
          onClick={handlerRepeatGame}
        >
          REPEAT
          <i className={`${styles.icon} bx bx-repeat bx-sm`} />
        </button>
      </MainPopup>
    </main>
  )
}
