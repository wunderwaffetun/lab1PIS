import React from 'react'
import M from 'materialize-css'

export function Option({value}){
  return <option value={value}>
    {value}
  </option>
}

export default function Select(props) {

    const { cb } = props

    React.useEffect(() => {
        const elems = document.querySelectorAll('select');
        M.FormSelect.init(elems);
    }, [])

  return (
    <div className="input-field col s12">
        <select defaultValue='default' onChange={(e) => {cb(e.target.value)}}>
          <option value='default' disabled>Choose item</option>
          {
            React.Children.map(props.children, (child) => {
              return child
            })
          }
        </select>
        <label>Select type of operation</label>
      </div>
  )
}
