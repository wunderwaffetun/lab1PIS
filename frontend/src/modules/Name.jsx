import { useGetProductQuery } from '../redux/api'
import React, { useEffect, useState } from 'react'

export default function Name({elem}) {
    const {data, isLoading, isError} = useGetProductQuery(elem.id)
    const [name, setName] = useState('') 

    useEffect(() => {
        setName(data?.productName || '')
    })
    return (
        <>
            {
                isLoading ? '' : (
                    <div className='operation-elem'>{name} - {elem.quantity}</div>
                )
            }
        </>
    )
}
