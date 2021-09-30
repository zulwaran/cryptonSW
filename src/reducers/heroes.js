const initialState = {
  heroesArr: [],
  isGetData: false,
  favoriteHeroId: []
}

export const FETCH_HEROES = 'FETCH_HEROES'
export const SET_DATA = 'SET_DATA'
export const SET_FAVORITE_HERO_ID = 'SET_FAVORITE_HERO_ID'

const heroes = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_HEROES:
      return {
        ...state,
        heroesArr: action.payload
      }
    case SET_DATA:
      return {
        ...state,
        isGetData: action.payload
      }
    case SET_FAVORITE_HERO_ID:
      return {
        ...state,
        favoriteHeroId: action.payload
      }
    default:
      return state
  }
}

export default heroes
