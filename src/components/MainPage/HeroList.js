import React, { useEffect } from 'react'
import { AiTwotoneHeart } from 'react-icons/ai'
import { useState } from 'react/cjs/react.development'

const HeroList = props => {
  const [favoriteHeroId, setFavoriteHeroId] = useState([])
  useEffect(() => {
    let a = []
    a = JSON.parse(localStorage.getItem('favorite')) || []
    let idsArray = []
    if (a.length !== 0) {
      a.forEach(element => {
        idsArray.push(element.id)
      })
      setFavoriteHeroId(idsArray)
    }
  }, [])

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

  return (
    <div>
      {props.heroes.map(hero => {
        return (
          <div key={hero.id}>
            <img src={hero.img} alt="hero"></img>
            <p>Имя: {hero.name}</p>
            <p>Планета проживания: {hero.homeworld}</p>
            <AiTwotoneHeart
              color={favoriteHeroId.includes(hero.id) ? 'red' : 'black'}
              onClick={() => toggleFavorite(hero)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default HeroList
