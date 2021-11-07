import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  RefreshControl,
  ScrollView,
  SafeAreaView
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

const Menu=({navigation})=>{
  const dispatch = useDispatch();
  const [modalRating, setModalRating] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false);
  const [diaSemana, setDiaSemana] = useState('')
  const [menu, setMenu] = useState({});
  const reserve = useSelector(state=> state.reserve);
 
  const isMenu = (item_menu) => {
    dispatch(addLunch(item_menu))
  }

  const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getMenu();
      setRefreshing(false)
    });
  }, []);

  const apiGetStudentReserve = async _ => {
    let data = await AsyncStorage.getItem('student');
    let student = JSON.parse(data)
    api.post(`/reserves/find/${student?._id}`, {id: menu?._id}).
    then(resp=>{
      dispatch(setReserveID(resp.data));
    }).catch(error=>{
      showMessage({
        message: "Aconteceu algum erro.",
        type: "danger",
      });
    });
  
  };

  const getMenu = async () => {
   await api.get('/menu').then(resp => {
      const menu = resp.data
      menu?.date ?
        setDiaSemana(format(parse(menu?.date, 'dd/mm/yyyy', new Date()), 'EEEE'))
        : ''
      isMenu(menu);
      setMenu(menu);

    }).catch(erro=>{
     showMessage({
            message: "Aconteceu algum erro.",
            type: "danger",
      });
   })
  }
  
  useEffect(() => {
   getMenu();  
    apiGetStudentReserve()
    
  },[])
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
      {modalRating && <Avaliation modalRating={modalRating} setModalRating={setModalRating} />}
      <View style={styles.buttonContent}>
          <TextBox style={styles.title}>{translate(diaSemana)}</TextBox>
        </View>
        <SwiperContent 
          date={'26/10/2021'}
        />
        </ScrollView>
    </SafeAreaView>
  )
};
export default Menu;


const styles = StyleSheet.create({
  container:{
    flex: 1,
    paddingTop: 15,
    alignItems: 'center'
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20
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
