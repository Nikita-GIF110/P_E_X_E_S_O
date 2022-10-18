import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [],
  prev: -1,
  isCounting: false,
  isShow: false,
  view: 0,
  score: 0,
  gameStart: false,
  setting: {
    quantity: 6,
    time: 120,
  },
}

const { actions, reducer } = createSlice({
  name: 'gameSlice',
  initialState,

  reducers: {
    setItems: (state, action) => {
      state.items = action.payload
    },
    setUpdateItem: (state, action) => {
      const { index, status } = action.payload
      index.map((num) => {
        state.items[num] = {
          ...state.items[num],
          open: handlerOpenCards(status),
          status,
        }
        return state.items[num]
      })
    },
    setPrev: (state, action) => {
      state.prev = action.payload
    },
    setCounting: (state, action) => {
      state.isCounting = action.payload
      state.gameStart = action.payload
    },
    setOpen: (state) => {
      state.isShow = true
    },
    setRepeatGame: (state) => {
      state.isShow = false
      state.isCounting = false
      state.prev = -1
      state.score = 0
      state.view = 0
    },
    setScoreGame: (state, action) => {
      const { score, view } = action.payload
      state.score = score
      state.view = view
    },
    setSetting: (state, action) => {
      const { quantity, time } = action.payload
      state.setting = {
        time: parseInt(time, 10),
        quantity,
      }
    },
  },
})

const handlerOpenCards = (status) => {
  switch (status) {
    case 'correct':
      return false
    case '':
      return false
    default:
      return true
  }
}

export default reducer
export const {
  setItems,
  setUpdateItem,
  setPrev,
  setCounting,
  setOpen,
  setRepeatGame,
  setScoreGame,
  setSetting,
} = actions
