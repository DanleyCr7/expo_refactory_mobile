import { createAction, createReducer } from '@reduxjs/toolkit';

const INITIAL_STATE = {}
export const student = createAction('GETSTUDENT');

export default createReducer(INITIAL_STATE,{
    [student.type]: (state, action)=> ({...state, ...action.payload})
})