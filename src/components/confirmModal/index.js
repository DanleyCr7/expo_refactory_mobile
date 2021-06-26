import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';

import styled from 'styled-components/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import Modal from 'react-native-modal';

import { Box } from '../box';
import { TextBox } from  '../textBox';
import { TextButton } from  '../textButton';
import { ButtonOpacity } from '../buttonOpacity';
import { Colors } from '../../config/colors';
import { TextInfo } from '../../config/textInfo';
import api from '../../services/api';

const ConfirmModal = ({ date }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [info, setInfo] = useState('err');
  const [canRequired, setCanRequired] = useState(false);
  const [required, setRequired] = useState(false);
  
  const apiGetData = async _ => {
    try {
      api.get('/students/1')
      .then(resp => {
        setCanRequired(resp.data.canRequiredMeal);
        setRequired(resp.data.requiredMeal);
      })
    } catch(err) {
      console.log(err);
    }
  };

  const apiUpdateData = _ => {
    if(date) {
      try {
        api.put('/students/required-meal/5cf98c572596950d0a70f89f')
        .then(resp => {
          setRequired(!required);
          setInfo(required ? 'cancel' : 'info');
        })
        .catch(_ => {
          setInfo('err')
        })
      } catch(err) {
        console.log(err);
      }
    } else {
      setInfo('warn');
    }
  };

  const onPress = _ => {
    apiUpdateData();
    setModalVisible(true);
  };

  const onModalClose = _ => {
    setModalVisible(false);
  };

  useEffect(_ => { apiGetData() }, []);

  return (
    <>
      <ButtonOpacity 
        style=
          {!date ? styles.blockButton : 
          !canRequired  ? styles.noAbleButton :
          canRequired && required ? styles.finishButton :
          styles.Button}
        onPress={onPress}
      >
        <TextButton
          style={date && !canRequired  ? {color: Colors.GREEN} : {}}  
        >
          {(canRequired && required) && date ? 'Cancelar Reserva' :
          'Reservar Refeição'}
        </TextButton>
      </ButtonOpacity>
      <Modal 
        isVisible={isModalVisible}
        style={styles.modalContainer}
        onBackButtonPress={onModalClose}
      >
        <Box style={styles.boxContainer}>
          <TextBox>
            {info === 'info' ? TextInfo.MODALOK : 
            info === 'err' ? TextInfo.MODALERR :
            info === 'cancel' ? TextInfo.MODALCANCEL :
            TextInfo.MODALWARN}
          </TextBox>

          <TouchableOpacity
            style={styles.icon}
            onPress={onModalClose}>
            <Icon
              name='highlight-off'
              size={26}
              color={Colors.RED}
            />
          </TouchableOpacity>
        </Box>
      </Modal>
    </>      
  )
};

const { height: HEIGHT, width: WIDTH } = Dimensions.get('window');

const styles = StyleSheet.create({
  Button: {
    marginBottom: 5,
  },
  blockButton: {
    marginBottom: 5,
    backgroundColor: Colors.TRANSPARENT,
  },
  finishButton: {
    marginBottom: 5,
    backgroundColor: Colors.RED,
  },
  noAbleButton: {
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderColor: Colors.GREEN,
    borderWidth: 1,
    color: Colors.GREEN,
  },
  modalContainer: {
    justifyContent: 'flex-end',
  },
  boxContainer: {
    position: 'absolute',
    height: HEIGHT / 3,
    width: WIDTH - 30,
  },
  icon: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
});

export default ConfirmModal;