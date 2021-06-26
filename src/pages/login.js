import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native'

import Icon from '@expo/vector-icons/MaterialIcons';

import logo from '../images/logo.png';
import { Colors } from '../config/colors';
import { Container } from '../components/container';
import { TextBox } from '../components/textBox';
import { TextButton } from '../components/textButton';
import { ButtonOpacity } from '../components/buttonOpacity';

const { width: WIDTH } = Dimensions.get('window');

const Login = ({ navigation }) => {
  return (
    <Container style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.textLogo}>Refeitório</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon 
          name={'person'}
          style={styles.inputIcon}
          size={28} color={Colors.TRANSPARENT}
        />
        <TextInput style={styles.input} 
          placeholder={'Matricula'}
          placeholderTextColor={Colors.TRANSPARENT}
          underlineColorAndroid={'transparent'}
        />
      </View>

      <ButtonOpacity 
        style={styles.btnLogin}
        onPress={() => navigation.navigate('Menu')} 
      >
        <TextButton>Entrar</TextButton>
      </ButtonOpacity>
    </Container>
  )
};

const styles = StyleSheet.create({
  container: {
    width: null,
    height: null,
    backgroundColor: Colors.BGLOGIN,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },  
  logo: {
    width: 120,
    height: 120,
  },
  textLogo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B232A',
    opacity: 0.95,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 10,
  },  
  input: {
    width: WIDTH - 55,
    height: 45,
    borderRadius: 20,
    fontSize: 14,
    paddingLeft: 45,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    color: Colors.TEXTBOX,
    marginHorizontal: 25,
  },
  inputIcon: {
    position: 'absolute',
    top: 8,
    left: 37,
  },  
  btnLogin: {
    marginTop: 40,
  },
});

export default Login;