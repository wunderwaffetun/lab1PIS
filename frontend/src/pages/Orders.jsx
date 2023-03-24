import React, { useEffect, useState } from 'react'
import Select from '../modules/Select';
import {  Outlet } from "react-router-dom";
import { useNavigate } from 'react-router-dom'
import { Option } from '../modules/Select';
import { useDispatch } from 'react-redux';
import { clearStore, setOperationType } from '../redux/globalData';

export default function Orders() {
  const [type, setType] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const cb = (text) => setType(text) 

  useEffect(() => {
    dispatch( clearStore() )
    dispatch( setOperationType(type) )
    navigate(`${type}`)
  }, [type])


  return (
    <>
      <Select cb={cb}>
        <Option value={'online'} />
        <Option value={'offline'} />
        <Option value={'contribution'} />
        <Option value={'barter'} />
        <Option value={'debt'} />
      </Select>
      <div className='order-container'>
        <Outlet />
      </div>
      
    </>
  )
}
