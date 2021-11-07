import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native';
import Icon from '@expo/vector-icons/MaterialIcons';
import Modal from 'react-native-modal';
import { showMessage } from "react-native-flash-message";

import { Box } from '../box';
import { TextBox } from  '../textBox';
import { TextButton } from  '../textButton';
import { ButtonOpacity } from '../buttonOpacity';
import { Colors } from '../../config/colors';
import { TextInfo } from '../../config/textInfo';
import { ContentQRCancel, ButtonIconQR } from '../contentQRcancel'
import api from '../../services/api';
import {useSelector, useDispatch} from 'react-redux'
import {isCode} from '../../store/ducks/QRcode';
import AsyncStorage from '@react-native-async-storage/async-storage';
const { width } = Dimensions.get('screen')
import { setReserveID } from '../../store/fetchActions'

const ConfirmModal = ({ date }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [reason_for_cancellation, setReason_for_cancellation] = useState('');
  const [info, setInfo] = useState('cancel');
  const [canRequired, setCanRequired] = useState(false);
  const [menuEmpty, setMenuEmpty] = useState(false);
  const reserve = useSelector(state=> state.reserve);
  const scan = useSelector(state => state.qrcode.scan);
  const menu = useSelector(state => state.lunch);
  const dispatch = useDispatch();
  const isScan=()=>{
    dispatch(isCode(scan))
  }
  date = []
  const apiGetStudentReserve = async _ => {
    const data = await AsyncStorage.getItem('student');
    const student = JSON.parse(data);

    api.post(`/reserves/find/${student?._id}`, {id: menu._id}).
    then(resp=>{
      dispatch(setReserveID(resp.data));
    }).catch(error => {
        showMessage({
            message: "Aconteceu algum erro.",
            type: "danger",
          });
    });
  };
  const reserveMeal = async () => {
    const data = await AsyncStorage.getItem('student');
    const student = JSON.parse(data)
    api.post(`/menu/reserve/${menu?._id}`,
      { id: student?._id }).then(async (resp) => {
         showMessage({
            message: `${message}`,
            type: "success",
          });
       let message = resp.data?.message 
       if(message){
         showMessage({
            message: `${message}`,
            type: "danger",
          });
       }
      apiGetStudentReserve();
    }).catch(erro=>{
    })
  }
  const cancelMeal = () => {
    if(reason_for_cancellation!=''){
      api.put(`/reserves/cancel/${reserve?._id}`,{reason_for_cancellation: 'teste'})
        .then(async(resp)=>{
          
        await apiGetStudentReserve();
        onModalClose()
      
      }).catch(erro=>{
      })
    } else {
      showMessage({
            message: `Informe o motivo`,
            type: "warning",
        });
    }
    
  }

  function isEmptyObject(obj)
   {
     const menuIsEmpty = Object.keys(obj).length === 0;
     setMenuEmpty(menuIsEmpty);
   }
  

  const onPress = _ => {
    // apiUpdateData();
    setModalVisible(true);
  };

  const onModalClose = _ => {
    setModalVisible(false);
  };
 
  useEffect(() => {
    apiGetStudentReserve();
    isEmptyObject(menu);
  }, [menu]);
  return (
    <>
    <ContentQRCancel cancel={(canRequired && required) && date}>
      { reserve?.approved && !reserve?.cancel && reserve?.confirm!="sim"?
      <ButtonIconQR onPress={isScan}>
        <MaterialCommunityIcons 
        name={scan? 'close': "qrcode-scan"}
        size={30}
        color={scan? '#f50a19': '#000'}/>
      </ButtonIconQR> : null}
      {/* Essas condições são para alterar a cor do botao e desabilitar ele caso caia na condicao de ser confirmado ou cancelado */}
      <ButtonOpacity
        style=
          {
          //verificando se existe cardapio
          menuEmpty ? styles.blockButton :
          reserve?.confirm == "sim" ? styles.buttonConfirmReserve : !date ? styles.blockButton :
          reserve?.cancel ? styles.blockButton :
          reserve?.approved ? styles.finishButton :
          styles.noAbleButton}
          onPress={reserve?.approved ? onPress : reserveMeal}
          disabled={menuEmpty ? true : reserve?.confirm=="sim" ? true: reserve?.cancel}
      >
        <TextButton
          style={ reserve?.approved ? {} : {color: Colors.GREEN} }  
        >
            {reserve?.confirm == "sim" ? 'Reserva feita'
              : reserve?.cancel ? 'Reserva cancelada' :
                reserve?.approved ? 'Cancelar Reserva' :
                  menuEmpty ? "Sem refeição"
                  :  'Reservar refeição'}
        </TextButton>
      </ButtonOpacity>
      </ContentQRCancel>
      <Modal 
        isVisible={isModalVisible}
        style={styles.modalContainer}
        onBackButtonPress={onModalClose}
      >
        <Box style={styles.boxContainer}>
          <TextBox>
            {info === 'info' ? TextInfo.MODALOK : 
            info === 'err' ? TextInfo.MODALERR :
            info === 'cancel' ? TextInfo.CANCELMEAL :
            TextInfo.MODALWARN}
          </TextBox>
          {info === 'cancel'&& 
          <>
          <TextInput
          style={styles.input}
          numberOfLines={6}
          onChangeText={setReason_for_cancellation}
          value={reason_for_cancellation}
          placeholder="Motivo"/>
          <ButtonOpacity onPress={cancelMeal} style={styles.finishButton}>
            <TextButton>Cancelar</TextButton>
          </ButtonOpacity>
          </>
          }
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
    marginTop: 10
  },
  noAbleButton: {
    marginBottom: 5,
    backgroundColor: 'transparent',
    borderColor: Colors.GREEN,
    borderWidth: 1,
    color: Colors.GREEN,
  },
  buttonConfirmReserve: {
    marginBottom: 5,
    backgroundColor: Colors.GREEN,
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
  input: {
    backgroundColor: '#f7f7f7',
    width: '80%',
    marginTop: 10,
    textAlign: 'left',
    textAlignVertical: 'top'
  },
});

export default ConfirmModal;