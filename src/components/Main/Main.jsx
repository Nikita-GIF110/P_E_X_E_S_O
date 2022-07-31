import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  Offcanvas,
  OffcanvasHeader,
  OffcanvasBody,
  Button,
} from 'reactstrap'
import { Card, Score, Settings } from '@components'
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

  const [timeLeft, setTimeLeft] = useState(2 * 60)
  const minutes = getPadTime(Math.floor(timeLeft / 60))
  const seconds = getPadTime(timeLeft - minutes * 60)
  const [modalTitles, setModalTitles] = useState('')
  const [settingOpen, setSettingOpen] = useState(false)

  const hendlerSettingclick = () => {
    setSettingOpen(!settingOpen)
  }

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
    dispatch(game.methods.fetchCharactersList(6))
  }, [])

  return (
    <main className={styles.root}>
      <Container>
        <Button onClick={hendlerSettingclick}>
          <i className="bx bx-hive" />
        </Button>
        <h1 className="fw-bold text-white text-center mb-2">
          MEMORY GAME
        </h1>
        <Row>
          <Col className="col-12 mb-3 col-lg-9 mx-lg-auto col-xxl-4 order-xxl-2">
            <Score
              view={view}
              score={score}
              time={{ minutes, seconds }}
            />
          </Col>
          <Col className="col-12 col-lg-9 mx-lg-auto col-xxl-8 order-xxl-1">
            <div
              id="area"
              className={`${styles.area} p-1 p-sm-2`}
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
          </Col>
        </Row>
      </Container>
      <Modal isOpen={isShow} centered>
        <ModalHeader>{modalTitles}</ModalHeader>
        <ModalBody>
          <button
            type="button"
            className={styles.reload}
            onClick={handlerRepeatGame}
          >
            REPEAT
            <i className={`${styles.icon} bx bx-repeat bx-sm`} />
          </button>
        </ModalBody>
      </Modal>
      <Offcanvas
        isOpen={settingOpen}
        direction="end"
        toggle={hendlerSettingclick}
      >
        <OffcanvasHeader className="border-bottom">
          <strong>Settings</strong>
        </OffcanvasHeader>
        <OffcanvasBody>
          <Settings
            onClose={hendlerSettingclick}
          />
        </OffcanvasBody>
      </Offcanvas>
    </main>
  )
}
