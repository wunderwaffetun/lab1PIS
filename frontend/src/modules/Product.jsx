import React from 'react'

export default function Product(props) {
    const {id, name, count, cost} = props.data
  return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{count}</td>
        <td>{cost}</td>
    </tr>
  )
}
