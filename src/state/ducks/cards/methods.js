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

export const fetchCharactersList = () => async (dispatch) => {
  const temp = []
  const { results } = await API.characters.index()
  results.forEach((character, index) => {
    temp.push({
      ...character, id: index, open: false, status: '',
    })
    temp.push({
      ...character, id: index + 1, open: false, status: '',
    })
  })
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
