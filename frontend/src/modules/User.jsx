import React from 'react'

export default function User(props) {
    const {id, name, debt, loan_ceiling, remains, money, comment} = props.data

    console.log()

  return (
    <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td style={{'color': `${debt >= loan_ceiling * .9 ? 'red': 'black'}`}}>{debt}</td>
        <td>{loan_ceiling}</td>
        <td>{remains}</td>
        <td>{money}</td>
        <td>{comment}</td>
    </tr>
  )
}
