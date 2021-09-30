import React from 'react'
import { useEffect, useState } from 'react'
import { axiosDB } from '../../axios'

//Components
import HeroList from '../Reusable/HeroList'
import Filter from '../Reusable/Filter'

//Redux
import { useDispatch, useSelector } from 'react-redux'
import { setFilterAction, setGenderAction } from '../../actions/FilterActions'
import { fetchHeroesArrAction, setFavoriteHeroIdAction, setIsGetDataAction } from '../../actions/HeroesActions'

const MainContainer = () => {
  const dispatch = useDispatch()

  const heroesArr = useSelector(state => state.heroes.heroesArr)
  const fetchHeroesArr = array => {
    dispatch(fetchHeroesArrAction(array))
  }

  const isGetData = useSelector(state => state.heroes.isGetData)
  const setIsGetData = value => {
    dispatch(setIsGetDataAction(value))
  }

  const favoriteHeroId = useSelector(state => state.heroes.favoriteHeroId)
  const setFavoriteHeroId = value => {
    dispatch(setFavoriteHeroIdAction(value))
  }

  const filter = useSelector(state => state.filter.filter)
  const setFilter = filter => {
    dispatch(setFilterAction(filter))
  }

  const gender = useSelector(state => state.filter.gender)
  const setGender = gender => {
    dispatch(setGenderAction(gender))
  }

  const [heroesArrFiltering, setHeroesArrFiltering] = useState(heroesArr)

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
    let name = ''
    let gender = ''
    let homeworld = ''
    let img = ''
    let heroesArr = []
    for (let i = 1; i <= 83; i++) {
      await axiosDB
        .get(`/people/${i}`)
        .then(response => {
          name = response.data.name
          gender = response.data.gender
        })
        .catch(error => {
          console.log(error)
          name = 'unknown'
        })
      await axiosDB
        .get(`/planets/${i}`)
        .then(response => {
          homeworld = response.data.name
        })
        .catch(error => {
          console.log(error)
          homeworld = 'unknown'
        })
      img = `https://starwars-visualguide.com/assets/img/characters/${i}.jpg`
      const hero = {
        id: i,
        name: name,
        gender: gender,
        homeworld: homeworld,
        img: img
      }
      heroesArr = [...heroesArr, hero]
    }
    fetchHeroesArr(heroesArr)
    setHeroesArrFiltering(heroesArr)
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
    setFavoriteHeroId(idsArray)
    return
  }

  useEffect(() => {
    if (!isGetData) {
      fetchHeroes()
      setIsGetData(true)
    }
    fetchLocaleStorage()
    heroFiltering()
  }, [filter, gender])

  if (heroesArr.length !== 0) {
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
        <p className="containerText">Загружаем список персонажей...</p>
      </div>
    )
  }
}

export default MainContainer
