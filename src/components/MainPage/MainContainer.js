import React from 'react'
import { useEffect, useState } from 'react'

import HeroList from './HeroList'
import { axiosDB } from '../../axios'
import Filter from './Filter'
import { useDispatch, useSelector } from 'react-redux'
import { setFilterAction, setGenderAction } from '../../actions/FilterActions'

const MainContainer = () => {
  const dispatch = useDispatch()
  const [isGetData, setIsGetData] = useState(false)
  const [heroesArr, setHeroesArr] = useState([])
  const [heroesArrFiltering, setHeroesArrFiltering] = useState(heroesArr)

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
    let name = ''
    let gender = ''
    let homeworld = ''
    let img = ''
    let heroesArr = []
    for (let i = 1; i <= 5; i++) {
      await axiosDB
        .get(`/people/${i}`)
        .then(response => {
          name = response.data.name
          gender = response.data.gender
        })
        .catch(error => {
          name = 'unknown'
        })
      await axiosDB
        .get(`/planets/${i}`)
        .then(response => {
          homeworld = response.data.name
        })
        .catch(error => {
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
    setHeroesArr(heroesArr)
    setHeroesArrFiltering(heroesArr)
  }

  useEffect(() => {
    if (!isGetData) {
      fetchHeroes()
      setIsGetData(true)
    }
    heroFiltering()
  }, [filter, gender])

  if (heroesArrFiltering.length !== 0) {
    return (
      <div>
        <Filter heroFiltering={heroFiltering} gender={gender} setGender={setGender} setFilter={setFilter} />
        <HeroList heroes={heroesArrFiltering} />
      </div>
    )
  } else {
    return (
      <div>
        <Filter heroFiltering={heroFiltering} gender={gender} setGender={setGender} setFilter={setFilter} />
        <p>Star Wars Heroes Loading...</p>
      </div>
    )
  }
}

export default MainContainer
