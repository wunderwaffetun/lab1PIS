import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {  setActiveInfo } from '../redux/globalData'
import { store } from '../redux/store'

// const throttle = (func, ms) => {
//   let isThrottled = false, 
//       savedArgs,
//       savedThis
  
//   return function wrapper() {
    
//     if ( isThrottled ) {
//       savedArgs = arguments
//       console.log(this)
//       savedThis = this
//       return 
//     }

//     console.log(this)

//     func.apply(this, arguments)
//     isThrottled = true
  
//     setTimeout(() => {
//       if (savedArgs) {
//         wrapper.apply( savedThis, savedArgs )
//         savedArgs = savedThis = null
//       }
//     }, ms)

//   }
// }

export function Info() {
  const [ active, setActive ] = useState(false)
  const [ info, setInfo ] = useState('')
  console.log('info')
  // const throttledMesage = throttle(() => {
  //   setActive(false)
  //   setActiveInfo(false)
  // }, 3000)

  const dispatch = useDispatch()

  store.subscribe(() => {
    setInfo(store.getState().globals.infoModuleContent)
    setActive(store.getState().globals.infoActive)
  })

  useEffect( () => {

    // throttledMesage()
    setTimeout(() => {
      dispatch(setActiveInfo(false))
      setActive(false)
    }, 3000)


  }, [active])

  return (
    <div className='info' style={{'display': `${ active ? 'flex' : 'none' }`}}>{info}</div>
  )
}
