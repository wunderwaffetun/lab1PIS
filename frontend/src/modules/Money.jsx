import React, { useState } from 'react'
import { setContribution } from '../redux/globalData'
import { useDispatch } from 'react-redux'

export function Money() {

  const [ value, setValue ] = useState('')
  const dispatch = useDispatch()

  const update = (value) => {
    if ( /^[0-9]*$/.test(value) ) {
      setValue(value)
      dispatch(setContribution(value))
    }
  }

  return (
    <input 
        value={value}
        onChange={(e)=>{update(e.target.value)}}
        className="searcher-style"
        placeholder='Contribution'
    />
  )
}
