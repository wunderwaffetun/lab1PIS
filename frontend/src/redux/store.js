import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api"
import globalStoreReducer from './globalData'


export const store = configureStore({
    
    reducer: {
        [api.reducerPath]: api.reducer,
        globals: globalStoreReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
})