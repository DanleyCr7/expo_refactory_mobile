import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
} from 'react-native';

import Icon from '@expo/vector-icons/MaterialIcons';
import Swiper from 'react-native-swiper';

import isMonday from 'date-fns/isMonday';
import isThurday from 'date-fns/isThursday';
import isWednesday from 'date-fns/isWednesday';
import isTuesday from 'date-fns/isTuesday';
import isFriday from 'date-fns/isFriday';
import isSaturday from 'date-fns/isSaturday';


import { Colors } from '../config/colors';
import { Container } from '../components/container'; 
import { Box } from '../components/box';
import { ButtonOpacityMenu } from '../components/buttonOpacityMenu';
import { TextBox } from '../components/textBox';
import SwiperContent from '../components/swiperContent';
import api from '../services/api';


const Menu = _ => {
  const [data, setData] = useState([]);
  
  const apiGetData = async _ => {
    try {
      const resp = await api.get('/menu')
      const data = resp.data;
      setData(data);
    } catch(err) {
      console.log(err);
    }
  };
  
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
    <Swiper loop={false} index={index} showsPagination={false}>
      <Container>
        <ButtonOpacityMenu style={styles.buttonContent}>
          <TextBox style={styles.title}>Segunda</TextBox>
        </ButtonOpacityMenu>
        <SwiperContent 
          dataLunch={data[0]} 
          dataDinner={data[1]} 
          date={index === 0}
        />
      </Container>

      <Container>
        <ButtonOpacityMenu style={styles.buttonContent}>
          <TextBox style={styles.title}>Terca</TextBox>
        </ButtonOpacityMenu>
        <SwiperContent 
          dataLunch={data[2]} 
          dataDinner={data[3]} 
          date={index === 1}
        />
      </Container>

      <Container>
        <ButtonOpacityMenu  style={styles.buttonContent}>
          <TextBox style={styles.title}>Quarta</TextBox>
        </ButtonOpacityMenu>
        <SwiperContent 
          dataLunch={data[4]} 
          dataDinner={data[5]} 
          date={index === 2}
        />
      </Container>

      <Container>
        <ButtonOpacityMenu activeOpacity={0.8} style={styles.buttonContent}>
          <TextBox style={styles.title}>Quinta</TextBox>
        </ButtonOpacityMenu >
        <SwiperContent 
          dataLunch={data[6]} 
          dataDinner={data[7]} 
          date={index === 3}
        />
      </Container>

      <Container>
        <ButtonOpacityMenu activeOpacity={0.8} style={styles.buttonContent}>
          <TextBox style={styles.title}>Sexta</TextBox>
        </ButtonOpacityMenu>
        <SwiperContent 
          dataLunch={data[8]} 
          dataDinner={data[9]} 
          date={index === 4}
        />
      </Container>
    </Swiper> 
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

export default Menu;