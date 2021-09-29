import { combineReducers } from 'redux'
import filter from './filter'

const Reducers = combineReducers({
  filter: filter
})

export default Reducers
