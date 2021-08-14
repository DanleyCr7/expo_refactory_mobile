import { configureStore } from '@reduxjs/toolkit';
import lunchReducer from './ducks/lunch'
import qrcodeReducer from  './ducks/QRcode'
import studentReducer from  './ducks/student'
import reserveReducer from  './ducks/reserve'
export default configureStore({
    reducer:{
        lunch: lunchReducer,
        qrcode: qrcodeReducer,
        student: studentReducer,
        reserve: reserveReducer,
    }
})