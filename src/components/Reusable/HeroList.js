import React from 'react'
import { AiTwotoneHeart } from 'react-icons/ai'

const HeroList = props => {
  return (
    <div className="hero">
      {props.heroes.map(hero => {
        return (
          <div key={hero.id} className="hero__card">
            <img src={hero.img} alt="hero" className="hero__card-img"></img>
            <p className="hero__card-largeText">Имя: {hero.name}</p>
            <p className="hero__card-mediumText">Планета проживания: {hero.homeworld}</p>
            <AiTwotoneHeart
              cursor="pointer"
              color={props.favoriteHeroId.includes(hero.id) ? 'red' : 'black'}
              onClick={() => props.toggleFavorite(hero)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default HeroList
