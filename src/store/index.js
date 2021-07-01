import { configureStore } from '@reduxjs/toolkit';
import lunchReducer from './ducks/lunch'
import qrcodeReducer from  './ducks/QRcode'
export default configureStore({
    reducer:{
        lunch: lunchReducer,
        qrcode: qrcodeReducer,
    }
})