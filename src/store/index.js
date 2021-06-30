import { configureStore } from '@reduxjs/toolkit';
import lunchReducer from '../store/ducks/lunch'
export default configureStore({
    reducer:{
        lunch: lunchReducer
    }
})