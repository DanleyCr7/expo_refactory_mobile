import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {};

export const setReserve = createAction('ADD_RESERVE');

export default createReducer(INITIAL_STATE, {
    [setReserve.type]: (state,action) => ({ ...action.payload })
})