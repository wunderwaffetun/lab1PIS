import React from 'react'
import Name from './Name'


export default function Hist(props) {
    const {id, userId, userName, operationType, purchase, barter, contribution} = props.data
    let operation = null

    


    switch(operationType){
        case 'online':
            operation = 'By Card'
        break
        case 'offline':
            operation = 'Cash'
        break
        case 'barter':
            operation = 'Trade'
        break
        case 'credit':
            operation = 'To credit'
        break
        case 'contribution':
            operation = 'Payment'
        break
        default:
            operation = null
    }


  return (
    <tr>
        <td>{id}</td>
        <td>{operation}</td>
        <td>{userName}</td>
        <td>
            {
                !purchase ? '-' : (
                    <div className='operation-arr'>
                        {
                            purchase.map( elem => {
                                return <Name key={Math.random()} elem={elem}/>
                            })
                        }
                    </div>
                ) 
            }
        </td>
        <td>
            {
                contribution ? contribution: '-'
            }
        </td>
        
        <td>
            {
                !barter ? '-' : (
                    <div className='barter-elem'>
                        <div className='barter-elem-from'>
                            <h6>Вернул: </h6>
                            {
                                barter.from.map( elem => {
                                    return <Name key={Math.random()} elem={elem}/>
                                })
                            } 
                        </div>
                        <div className='barter-elem-to'>
                        <h6>Получил: </h6>
                            
                            {
                                barter.to.map( elem => {
                                    return <Name key={Math.random()} elem={elem}/>
                                })
                            }
                        </div>
                    </div>
                )
            }
        </td>
    </tr>
  )
}
