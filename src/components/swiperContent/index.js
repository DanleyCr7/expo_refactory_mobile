import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
} from 'react-native';
import { Container } from '../container'; 
import { Box } from '../box';
import { TextButton } from '../textButton';
import { TextButtonMenu } from '../textButtonMenu';
import { ButtonOpacity } from '../buttonOpacity';
import { ButtonOpacityMenu } from '../buttonOpacityMenu';
import ConfirmModal from '../confirmModal';
import {useSelector, useDispatch} from 'react-redux'

import { Colors } from '../../config/colors';
import Order from '../../pages/order';

const SwiperContent = ({  date }) => {
  const [isButtonActual, setIsButtonActual] = useState(true);
  const [warningMsg, setWarningMsg] = useState('10h');
  const [meal, setMeal] = useState({ lunch: true, dinner: false });
  const menu = useSelector(state => state.lunch);
  
  const _onPressActual = _ => {
      if(!isButtonActual) {
        setIsButtonActual(true);
        setWarningMsg(menu.deadline);
        setMeal({ lunch: true, dinner: false });
      }
    };

  const _onPressNoActual = _ => {
    if(isButtonActual) {
      setIsButtonActual(false);
      setWarningMsg('16:30h');
      setMeal({ lunch: false, dinner: true });
    }
  };

  return (
    <Box style={styles.boxContainer}>
      <View style={styles.buttonContainer}>
        <View 
          style={isButtonActual ? styles.buttonActual : styles.noButtonActual} 
          onPress={_onPressActual}
          >
          <TextButtonMenu 
            style={isButtonActual ? styles.textActual : styles.noTextActual}>
            {menu.type == 1? 'Jantar' : 'Almoço'}
          </TextButtonMenu>
        </View>
      </View>

      <ButtonOpacity style={styles.warning} activeOpacity={0.8}>
        <TextButton style={styles.warningText}>Pedidos encerram às {menu.type == 1 ? '20h' : '10h'}</TextButton>
      </ButtonOpacity>

      <Order meal={meal} date={date} />
    </Box>
  )
};

const styles = StyleSheet.create({
  boxContainer: {
    paddingBottom: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonActual: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.GREEN,
    width: '50%',
    marginHorizontal: 30,
    marginTop: 8
  },
  noButtonActual: {
    backgroundColor: Colors.BGCONTAINER,
    width: 100,
    borderRadius: 20,
    marginHorizontal: 30,
  },
  textActual: {
    color: Colors.GREEN,
    fontSize: 18,
  },
  noTextActual: {
    color: Colors.TRANSPARENT,
  },
  warning: {
    borderWidth: 2,
    borderColor: Colors.RED,
    marginTop: 20,
    backgroundColor: 'transparent',
    marginBottom: 4
  },
  warningText: {
    color: Colors.RED,
  },
});

export default SwiperContent;