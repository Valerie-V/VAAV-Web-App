"use client"
import { createContext, useContext, useEffect, useReducer } from 'react';
import { initialState, reducer } from './reducer'

const BASKET_STORAGE_KEY = 'vaav-basket';

//this is the data layer
export const StateContext = createContext()

//build a provider
export const StateProvider = ({ children }) => {
  const value = useReducer(reducer, initialState);
  const [state, dispatch] = value;

  // Restore the basket saved from a previous visit.
  useEffect(() => {
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem(BASKET_STORAGE_KEY)) || [];
    } catch {
      saved = [];
    }
    dispatch({ type: 'HYDRATE_BASKET', payload: Array.isArray(saved) ? saved : [] });
  }, []);

  // Save the basket whenever it changes (only after it has been restored,
  // so the empty initial basket doesn't overwrite the saved one).
  useEffect(() => {
    if (!state.hydrated) return;
    try {
      localStorage.setItem(BASKET_STORAGE_KEY, JSON.stringify(state.basket));
    } catch {
      // Storage can be unavailable (private mode, full quota). The cart still
      // works for this visit.
    }
  }, [state.basket, state.hydrated]);

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
}

//this is how we use it inside of a component
export const useStateValue = () => useContext(StateContext)
