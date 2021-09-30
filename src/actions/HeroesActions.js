import { FETCH_HEROES, SET_DATA, SET_FAVORITE_HERO_ID } from '../reducers/heroes'

export const fetchHeroesArrAction = payload => ({
  type: FETCH_HEROES,
  payload
})

export const setIsGetDataAction = payload => ({
  type: SET_DATA,
  payload
})

export const setFavoriteHeroIdAction = payload => ({
  type: SET_FAVORITE_HERO_ID,
  payload
})
