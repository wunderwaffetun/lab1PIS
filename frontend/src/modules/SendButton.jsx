import { store } from '../redux/store'
import { useSelector } from 'react-redux'
import { setActiveInfo, setInfoModuleContent } from '../redux/globalData'
import { useDispatch } from 'react-redux'
import { useOrderMutation } from '../redux/api'
import { useEffect, useState } from 'react'

const operCreator = ( state, dispatch ) => {
  let body = {
    orderType: state.operationType,
    userId: state.user?.id,
  }
  switch(state.operationType){
    case 'online':
      body.purchases = state.products
    break
    case 'offline':
      body.purchases = state.products
    break
    case 'barter':
      body.barter = {
        from: state.barterFrom,
        to: state.barterTo
      }
    break
    case 'contribution':
      body.contribution = state.contribution  
    break
    case 'debt':
      body.purchases = state.products
    break
    default: 
      console.log('no such Type SendButton.jsx')
  }
  return body
}



export function SendButton({name = 'Buy'}) {
  const state = useSelector(state => state.globals)
  const dispatch = useDispatch()
  const [ body, setBody ] = useState()
  const [ sendOperation, result ] = useOrderMutation()
  const [ answerMessage, setAnswerMessage ] = useState()

  const operationHandler = () => {

    dispatch(setActiveInfo(false))
    if ( state.user?.id  && ( state.products.length !== 0 || state.barterFrom.length !== 0 || state.barterTo.length !== 0 || state.contribution)) {
      setBody( operCreator(state, dispatch) ) 
      
    } else { 
      dispatch(setInfoModuleContent('Enter data'))
      dispatch(setActiveInfo(true))
    }
  }

  useEffect(() => {
    if ( body ) sendOperation(body)
  }, [body])

  useEffect(() => {
    switch( result.status ) {
      case 'fulfilled': 
        setAnswerMessage(result.data.message)
        break
      case 'rejected': 
        setAnswerMessage(result.error.data.message)

      break
      default: 
        console.log('loading')
    }
  }, [result])

  useEffect(() => {
    if (answerMessage) {
      dispatch(setInfoModuleContent(answerMessage))
      dispatch(setActiveInfo(true))
    }
  }, [ answerMessage ])


  return (
    <button className='button-send' onClick={operationHandler}>{name}</button>
  )
}
