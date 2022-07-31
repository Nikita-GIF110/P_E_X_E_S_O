import API from '@api'
import {
  setItems,
  setUpdateItem,
  setPrev,
  setCounting,
  setOpen,
  setRepeatGame,
  setScoreGame,
} from './store'

const getRandomNumbersInRange = (min, max, count) => {
  const result = []
  while (result.length < count) {
    const randomNumber = Math.floor(Math.random() * (max - min)) + min
    if (result.indexOf(randomNumber) === -1) {
      result.push(randomNumber)
    }
  }

  return result
}

export const fetchCharactersList = (cardQuantity = 6) => async (dispatch) => {
  const { results } = await API.characters.index()
  const indexs = getRandomNumbersInRange(0, results.length, cardQuantity)
  const temp = []

  indexs.forEach((index) => {
    temp.push({
      ...results[index], id: index, open: false, status: '',
    })
    temp.push({
      ...results[index], id: index + 1, open: false, status: '',
    })
  })
  temp.sort(() => Math.random() - 0.5)
  dispatch(setItems(temp))
}

export const updateItem = (index, status) => (dispatch) => {
  dispatch(setUpdateItem({ index, status }))
}
export const prev = (value) => (dispatch) => {
  dispatch(setPrev(value))
}
export const gameStart = (value) => (dispatch) => {
  dispatch(setCounting(value))
}
export const openDialog = () => (dispatch) => {
  dispatch(setOpen())
}
export const repeatGame = () => async (dispatch) => {
  dispatch(fetchCharactersList())
  dispatch(setRepeatGame())
}
export const setAnAccount = (values) => (dispatch) => {
  dispatch(setScoreGame(values))
}
