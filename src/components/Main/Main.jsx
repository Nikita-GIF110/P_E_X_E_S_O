import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Title, Card, Score, MainPopup,
} from '@components'
import { getPadTime } from '@helpers/getPadTime'
import { game } from '../../state'

import styles from './Main.module.scss'

export const Main = () => {
  const dispatch = useDispatch()

  const {
    items,
    prev,
    isCounting,
    isShow,
    view,
    score,
    gameStart,
  } = useSelector(game.selectors.gameSelector)

  const columnCount = Math.ceil(items.length / 3)
  const rowsCount = Math.ceil(items.length / columnCount)
  const [cardHeight, setCardHeight] = useState(0)

  const [timeLeft, setTimeLeft] = useState(2 * 60)
  const minutes = getPadTime(Math.floor(timeLeft / 60))
  const seconds = getPadTime(timeLeft - minutes * 60)
  const [modalTitles, setModalTitles] = useState('')

  const handlerCheck = (current) => {
    dispatch(game.methods.updateItem([current]))

    if (items[current].name === items[prev].name) {
      setTimeout(() => {
        dispatch(game.methods.updateItem([current, prev], 'correct'))
        dispatch(game.methods.setAnAccount({ view: view + 1, score: score + 1 }))
      }, 500)
    } else {
      setTimeout(() => {
        dispatch(game.methods.updateItem([current, prev], ''))
        dispatch(game.methods.setAnAccount({ view: view + 1, score }))
      }, 500)
    }
    dispatch(game.methods.prev(-1))
  }

  const handlerSelectCard = (index) => {
    dispatch(game.methods.gameStart(true))

    if (prev === -1) {
      dispatch(game.methods.updateItem([index]))
      dispatch(game.methods.prev(index))
    } else {
      handlerCheck(index)
    }
  }

  const handlerWin = () => {
    dispatch(game.methods.gameStart(false))
    setModalTitles('It was a wonderful game! Great job')
    dispatch(game.methods.openDialog())
  }

  const handlerLost = () => {
    setModalTitles('You Lost')
    dispatch(game.methods.openDialog())
  }

  const handlerRepeatGame = () => {
    dispatch(game.methods.repeatGame())
    setTimeLeft(2 * 60)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line no-unused-expressions
      isCounting && setTimeLeft((time) => (time >= 1 ? time - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [isCounting])

  useEffect(() => {
    const area = document.getElementById('area')
    const height = Math.ceil(area.offsetWidth / (columnCount) - (10 * (columnCount - 1)))
    setCardHeight(height)
  }, [columnCount])

  useEffect(() => {
    const correctItems = items.filter((item) => item.status === 'correct')
    const conditionItems = correctItems.length === items.length

    if (gameStart && conditionItems) {
      handlerWin()
    }
    if (minutes === '00' && seconds === '00') {
      handlerLost()
    }
  }, [minutes, seconds])

  useEffect(() => {
    dispatch(game.methods.fetchCharactersList())
  }, [])

  return (
    <main className={styles.root}>
      <div className={styles.container}>
        <Title>
          MEMORY GAME
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
                key={`${card.name}-${card.id}`}
                selectCard={handlerSelectCard}
                card={card}
                index={index}
              />
            ))}
          </div>
          <Score
            view={view}
            score={score}
            time={{ minutes, seconds }}
            className={styles.score}
          />
        </div>
      </div>
      <MainPopup
        isShow={isShow}
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
