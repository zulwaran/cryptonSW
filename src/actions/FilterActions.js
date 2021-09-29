import { SET_GENDER, SET_FILTER } from '../reducers/filter'

export const setGenderAction = payload => ({
  type: SET_GENDER,
  payload
})

export const setFilterAction = payload => ({
  type: SET_FILTER,
  payload
})
