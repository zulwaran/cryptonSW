const initialState = {
  gender: 'all',
  filter: ''
}

export const SET_GENDER = 'SET_GENDER'
export const SET_FILTER = 'SET_FILTER'

const filter = (state = initialState, action) => {
  switch (action.type) {
    case SET_GENDER:
      return {
        ...state,
        gender: action.payload
      }
    case SET_FILTER:
      return {
        ...state,
        filter: action.payload
      }
    default:
      return state
  }
}

export default filter
