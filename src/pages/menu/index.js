import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux'
import Icon from '@expo/vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';

import isMonday from 'date-fns/isMonday';
import isThurday from 'date-fns/isThursday';
import isWednesday from 'date-fns/isWednesday';
import isTuesday from 'date-fns/isTuesday';
import isFriday from 'date-fns/isFriday';
import isSaturday from 'date-fns/isSaturday';


import { Colors } from '../../config/colors';
import { Container } from '../../components/container';
import { Box } from '../../components/box';
import { ButtonOpacityMenu } from '../../components/buttonOpacityMenu';
import { TextBox } from '../../components/textBox';
import SwiperContent from '../../components/swiperContent';
import ContainerSwiper from '../../components/containerSwiper';
import api from '../../services/api';
import { addLunch, setStudent, setReserveID } from '../../store/fetchActions'
import Avaliation from '../../components/avaliation';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { format, parse  } from 'date-fns';

import { translate } from '../../config/textWeekDay'

const Menu=({route,navigation})=>{
  const dispatch = useDispatch();
  const [modalRating, setModalRating] = useState(true)
  const [diaSemana, setDiaSemana] = useState('')
  const isMenu=(item_menu)=>{
    dispatch(addLunch(item_menu))
  }
  const apiGetStudentReserve = async _ => {
    let data = await AsyncStorage.getItem('student');
    let student = JSON.parse(data)
    const { menu } = route.params;
    api.post(`/reserves/find/${student?._id}`, {id: menu._id}).
    then(resp=>{
      dispatch(setReserveID(resp.data));
    }).catch(error=>{
      console.log(error)
    });
  
  };

  useEffect(() => {
    const { menu } = route.params;
    // let dateFormat = format(menu.date, 'dd/mm/yyyy')
    // let date = format(dateFormat, 'EEEE')
    setDiaSemana(menu.date)
    isMenu(menu);
    apiGetStudentReserve()
  },[])
  
  return (
    <View style={styles.container}>
      {modalRating && <Avaliation modalRating={modalRating} setModalRating={setModalRating} />}
      <View style={styles.buttonContent}>
          <TextBox style={styles.title}>{diaSemana}</TextBox>
        </View>
        <SwiperContent 
          date={'26/10/2021'}
        />
    </View>
  )
};
export default Menu;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 15,
    alignItems: 'center'
  },
  buttonContent: {
    width: 100,
    borderWidth: 2,
    borderColor: Colors.GREEN,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 0,
    alignItems: 'center',
  },
  title: {
    color: Colors.GREEN,
  },
});
