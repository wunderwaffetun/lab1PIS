import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const url = "http://localhost:5001/api/"

export const api = createApi ({
    reducerPath: 'api1', // so key into react array
    baseQuery: retry(fetchBaseQuery({ baseUrl: url, headers: {
        'Content-Type': 'application/json'
    } }), { maxRetries: 3 }), 
    tagTypes: ['Users', 'Products', 'Operations'],
    endpoints:  (builder) => ({
        getUsers: builder.query({
            query:  () => {
                return { url: '/get-users'}
            },
        }), 
        
        getProducts: builder.query({
            query: () => {
                return {url: 'get-products'}
            }
        }),
        getProduct: builder.query({
            query: (product) => {
                return {url: `get-product/${product}`}
            }
        }),
        getOperations: builder.query({
            query: () =>  'get-operations'
        }), 
        order: builder.mutation({
            query: (body) => ({
                url: 'order',
                method: 'POST',
                body
            }),
            transformResponse: ( response, meta, arg ) => {
                return response
            }, 
            transformErrorResponse: ( response, meta, arg ) => {
                return response
            },
            extraOptions: { maxRetries: 1}
        })
        
    })
})

export const { useGetUsersQuery, useGetProductsQuery, useGetProductQuery, useGetOperationsQuery, useOrderMutation } = api