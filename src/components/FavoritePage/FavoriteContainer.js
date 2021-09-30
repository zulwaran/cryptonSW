import React from 'react'
import { useEffect, useState } from 'react'

//Components
import HeroList from '../Reusable/HeroList'
import Filter from '../Reusable/Filter'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setFilterAction, setGenderAction } from '../../actions/FilterActions'

const FavoriteContainer = () => {
  const dispatch = useDispatch()
  const [isGetData, setIsGetData] = useState(false)
  const [heroesArr, setHeroesArr] = useState([])
  const [heroesArrFiltering, setHeroesArrFiltering] = useState(heroesArr)
  const [favoriteHeroId, setFavoriteHeroId] = useState([])

  const filter = useSelector(state => state.filter.filter)
  const setFilter = filter => {
    dispatch(setFilterAction(filter))
  }
  const gender = useSelector(state => state.filter.gender)
  const setGender = gender => {
    dispatch(setGenderAction(gender))
  }

  const heroFiltering = () => {
    let a = []
    setHeroesArrFiltering(heroesArr)
    if (gender === 'all') {
      a = heroesArr.filter(item => {
        return item.name.toLowerCase().includes(filter.toLowerCase())
      })
      setHeroesArrFiltering(a)
      return
    } else {
      a = heroesArr.filter(item => {
        return item.name.toLowerCase().includes(filter.toLowerCase()) && item.gender === gender
      })
      setHeroesArrFiltering(a)
    }
  }

  const fetchHeroes = async () => {
    let a = []
    let heroesArray = []
    a = (await JSON.parse(localStorage.getItem('favorite'))) || []
    a.forEach(element => {
      heroesArray.push(element)
    })
    setHeroesArr(heroesArray)
    setHeroesArrFiltering(heroesArray)
  }
  const fetchLocaleStorage = () => {
    let a = []
    a = JSON.parse(localStorage.getItem('favorite')) || []
    let idsArray = []
    if (a.length !== 0) {
      a.forEach(element => {
        idsArray.push(element.id)
      })
      setFavoriteHeroId(idsArray)
    }
  }

  const toggleFavorite = hero => {
    let a = []
    let idsArray = []
    a = JSON.parse(localStorage.getItem('favorite')) || []
    a.forEach(element => {
      idsArray.push(element.id)
    })
    if (a.length === 0 || !idsArray.includes(hero.id)) {
      addFavorite(a, hero)
    } else {
      deleteFavorite(a, hero)
    }
  }

  const addFavorite = (a, hero) => {
    a.push(hero)
    localStorage.setItem('favorite', JSON.stringify(a))
    setFavoriteHeroId([...favoriteHeroId, hero.id])
    return
  }
  const deleteFavorite = (a, hero) => {
    let idsArray = []
    a = a.filter(elem => {
      return elem.id !== hero.id
    })
    a.forEach(element => {
      idsArray.push(element.id)
    })
    localStorage.setItem('favorite', JSON.stringify(a))
    let arr = heroesArrFiltering.filter(elem => {
      return elem.id !== hero.id
    })
    setHeroesArrFiltering(arr)
    setFavoriteHeroId(idsArray)
    return
  }

  useEffect(() => {
    if (!isGetData) {
      fetchHeroes()
      fetchLocaleStorage()
      setIsGetData(true)
    }
    heroFiltering()
  }, [filter, gender])

  if (heroesArrFiltering.length !== 0) {
    return (
      <div>
        <Filter heroFiltering={heroFiltering} gender={gender} setGender={setGender} setFilter={setFilter} />
        <HeroList
          heroes={heroesArrFiltering}
          favoriteHeroId={favoriteHeroId}
          setFavoriteHeroId={setFavoriteHeroId}
          toggleFavorite={toggleFavorite}
        />
      </div>
    )
  } else {
    return (
      <div>
        <Filter heroFiltering={heroFiltering} gender={gender} setGender={setGender} setFilter={setFilter} />
        <p className="containerText">Список любимых персонажей пуст</p>
      </div>
    )
  }
}

export default FavoriteContainer
