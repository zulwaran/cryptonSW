import React from 'react'
import { useState } from 'react/cjs/react.development'

const Filter = props => {
  const [value, setValue] = useState('')
  const changeFilterValue = e => {
    setValue(e.target.value)
    props.setFilter(e.target.value)
  }
  return (
    <div className='filter'>
      <h1>Фильтрация</h1>
      <div className='filter__block'>
        <input type="text" className='filter__input' value={value} onChange={e => changeFilterValue(e)}></input>
        <div className='filter__gender'>
          <label>
            Любой
            <input
              className='filter__checkbox'
              type="checkbox"
              checked={props.gender === 'all'}
              onChange={e => {
                props.setGender('all')
              }}
            />
          </label>
          <label>
            Мужчина
            <input
              type="checkbox"
              className='filter__checkbox'
              checked={props.gender === 'male'}
              onChange={e => {
                props.setGender('male')
              }}
            />
          </label>
          <label>
            Женщина
            <input
              type="checkbox"
              className='filter__checkbox'
              checked={props.gender === 'female'}
              onChange={e => {
                props.setGender('female')
              }}
            />
          </label>
          <label>
            Другое
            <input
              type="checkbox"
              className='filter__checkbox'
              checked={props.gender === 'n/a'}
              onChange={e => {
                props.setGender('n/a')
              }}
            />
          </label>
        </div>
      </div>
    </div>
  )
}

export default Filter
