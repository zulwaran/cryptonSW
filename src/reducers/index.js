import { combineReducers } from 'redux'
import filter from './filter'
import heroes from './heroes'

const Reducers = combineReducers({
  filter: filter,
  heroes: heroes
})

export default Reducers
