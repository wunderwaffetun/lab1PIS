import React, { useState } from 'react'

export default function Searcher({ cb = Function.prototype, placeholder }) {
    const [value, setValue] = useState('')
    const update = (text) => {
        cb(text)
        setValue(text)
    }

  return (
    <input 
        value={value}
        onChange={(e)=>{update(e.target.value)}}
        className="searcher-style"
        placeholder={placeholder}
    />
  )
}
