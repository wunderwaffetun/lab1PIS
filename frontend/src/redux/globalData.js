import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    infoModuleContent: 'Test',
    infoActive: false,
    user: null,
    userId: null,
    users: [],
    products: [],
    isBarter: false,
    barterFrom: [],
    barterTo: [],
    activeComponent: 'barterFrom',
    operationType: '',
    contribution: 0
}

const fillArrHandler = (array, actionPayload) => {
    const arrProductIndex = array.findIndex( product => actionPayload.id === product.id)
    if (~arrProductIndex) {
        array[arrProductIndex].quantity += 1
    } else {
        actionPayload.quantity = 1
        array = [ ...array, actionPayload ]
    }

    return array
}

export const dataSlice = createSlice({
    name: 'globalStore',
    initialState,
    reducers: {
        setUser(state, action) { // Пользователь, который будет оплачивать
            console.log(action.payload)
            state.user = action.payload
            console.log(state.user)
        }, 
        setBarter: (state, action) => {
            state.isBarter = action.payload
        },
        setActiveComponent: (state, action) => {
            state.activeComponent = action.payload
        },
        delChosenProduct: (state, action) => {
            const prod = action.payload
            const changeArr = action.payload.arr === 'chosen' ? 'products' : action.payload.arr
            state[changeArr] = state[changeArr].filter( product => product.id !== prod.id)
        }, 
        addChosenProduct: (state, action) => {
            state.products = fillArrHandler(state.products, action.payload)
        },
        addBarterFrom: (state, action) => {
            state.barterFrom = fillArrHandler(state.barterFrom, action.payload)
        },
        addBarterTo: (state, action) => {
            state.barterTo = fillArrHandler(state.barterTo, action.payload)
        },
        setOperationType: (state, action) => {
            state.operationType = action.payload
        },
        setContribution: (state, action) => {
            state.contribution = action.payload
        },
        setInfoModuleContent: (state, action) => {
            state.infoModuleContent = action.payload
        },
        setActiveInfo: (state, action) => {
            state.infoActive = action.payload
        },
        clearStore: () => initialState
    } 
})


export const {   addChosenProduct, delChosenProduct, setUser, setActiveComponent,
                 clearStore, addBarterFrom, addBarterTo, setBarter, 
                 setOperationType, setInfoModuleContent, setActiveInfo, setContribution } = dataSlice.actions
export default dataSlice.reducer