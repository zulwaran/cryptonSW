import React from 'react'
import { useState } from 'react/cjs/react.development'

const Filter = props => {
  const [value, setValue] = useState('')
  const changeFilterValue = e => {
    setValue(e.target.value)
    props.setFilter(e.target.value)
  }
  return (
    <div>
      <input type="text" value={value} onChange={e => changeFilterValue(e)}></input>
      <label>
        Любой
        <input
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
          checked={props.gender === 'n/a'}
          onChange={e => {
            props.setGender('n/a')
          }}
        />
      </label>
    </div>
  )
}

export default Filter
