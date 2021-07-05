import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
} from 'react-native';
import { useSelector, useDispatch} from 'react-redux'
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
import { addLunch } from '../../store/fetchActions'
import Avaliation from '../../components/avaliation';
export default function Menu () {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();
  const [modalRating, setModalRating] = useState(true)
  const teste = useSelector(state=>state.lunch);
  // const apiGetData = async _ => {
  //   try {
  //     const resp = await api.get('/menu')
  //     const data = resp.data;
  //     setData(data);
  //   } catch(err) {
  //     console.log(err);
  //   }
  // };
    useEffect(_=>{
      dispatch(addLunch())
      console.log(teste)
    },[])
  
  const getIndexSwipper = _ => {
    if(isMonday(new Date)) return 0;
    else if(isTuesday(new Date)) return 1;
    else if(isWednesday(new Date)) return 2;
    else if(isThurday(new Date)) return 3;
    else if(isFriday(new Date)) return 4;
  };
  
  const [index, setIndex] = useState(getIndexSwipper());

  // useEffect(_ => { 
  //   apiGetData();
  // }, []);

  return (
    <>
    {modalRating&& <Avaliation modalRating={modalRating} setModalRating={setModalRating}/> }
    <Swiper loop={false} index={index} showsPagination={false}>
      <ContainerSwiper day_of_the_week="Segunda" number={0} index={index}/>
      <ContainerSwiper day_of_the_week="Terça" number={1}  index={index}/>
      <ContainerSwiper day_of_the_week="Quarta" number={2}  index={index}/>
      <ContainerSwiper day_of_the_week="Quinta" number={3}  index={index}/>
      <ContainerSwiper day_of_the_week="Sexta" number={4}  index={index}/>
    </Swiper> 
    </>
  )
}; 

const styles = StyleSheet.create({
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
