import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button, Dimensions } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import api from '../../services/api';
import {useSelector, useDispatch} from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window')
export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const scan = useSelector(state => state.qrcode.scan) 
  const reserve = useSelector(state=> state.reserve);
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
      console.log(error)
    })
  },[])

  const apiGetStudentReserve = async _ => {
    let data = await AsyncStorage.getItem('student');
    let student = JSON.parse(data)
    api.post(`/reserves/find/${student?._id}`, {id: menu._id}).
    then(resp=>{
      dispatch(setReserveID(resp.data));
    }).catch(error=>{
      console.log(error)
    });
  };
  const handleBarCodeScanned = ({ type, data }) => {
    api.post(`/qrcode/reserve/${reserve._id}`, { qrcode: pathCode }).then(resp=>{
      apiGetStudentReserve()
      console.log(resp.data)
      alert(`Reserva feita!`);

    }).catch(error=>{
      console.log(error)
    })
    setScanned(true);
    alert(`${reserve._id} code ${pathCode} has been scanned! `);
    console.log(data)
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
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={{width: width, height: height-250, marginTop: 20}}
      />
  );
}


