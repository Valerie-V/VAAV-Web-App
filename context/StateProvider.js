"use client"
import {createContext, useContext, useReducer} from 'react';
import { initialState,reducer } from './reducer'

//this is the data layer
export const StateContext = createContext()

//build a provider
export const StateProvider = ({ children}) => (
    <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContext.Provider>
)

//this is how we use it inside of a component
export const useStateValue = () => useContext(StateContext)