import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = [];

export const getLunch = createAction('ADD_LUNCH');
export default createReducer(INITIAL_STATE, {
    [getLunch.type]: (state,action) => [ ...action.payload ]
})