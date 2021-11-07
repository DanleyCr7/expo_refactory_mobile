import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '../../services/api';
import {useSelector, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage } from 'react-native-flash-message';
import {isCode} from '../../store/ducks/QRcode';

const {width, height} = Dimensions.get('window')
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const scan = useSelector(state => state.qrcode.scan);
  const reserve = useSelector(state => state.reserve);
  const menu = useSelector(state => state.lunch);
  const [pathCode, setPathCode] = useState('esperando')
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(()=>{
    api.get('/qrcode').then(response=>{
      setPathCode(response.data)
    }).catch(error=>{
      showMessage({
         message: "Aconteceu algum erro.",
         type: "danger",
      });
    })
  },[])

  const handleBarCodeScanned = ({ type, data }) => {
    api.post(`/qrcode/reserve/${reserve._id}`, { qrcode: pathCode }).then(resp=>{
      dispatch(isCode(scan))
      showMessage({
        message: "Presença confirmada.",
        type: "success",
      });

    }).catch(error=>{
      showMessage({
        message: "Aconteceu algum erro.",
        type: "danger",
      });
    })
    setScanned(true);
    setTimeout(()=>{
      setScanned(false)
    }, 2000)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  if(!scan) return null
  return (    
      <BarCodeScanner
        onBarCodeScanned={scanned ? null :handleBarCodeScanned}
        style={{width: width-50, height: height-250, marginTop: 20}}
      />
  );
}


