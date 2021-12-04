import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  TextInput,
  ActivityIndicator,
} from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";

import logo from "../../images/logo.png";
import { Colors } from "../../config/colors";
import { Container } from "../../components/container";
import { TextBox } from "../../components/textBox";
import { TextButton } from "../../components/textButton";
import { ButtonOpacity } from "../../components/buttonOpacity";
import api from "../../services/api";
import { setStudent } from "../../store/fetchActions/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width: WIDTH } = Dimensions.get("window");
import { showMessage } from "react-native-flash-message";

const Login = ({ navigation }) => {
  const [code, setCode] = useState("");
  const [load, setLoad] = useState(false);

  const login = () => {
    setLoad(true);
    api
      .post("/login/student", { code })
      .then(async (resp) => {
        await AsyncStorage.setItem("student", JSON.stringify(resp.data));
        resp?.data
          ? navigation.navigate("Menu")
          : showMessage({
              message: "Matricula incorreta",
              type: "danger",
            });
        setLoad(false);
      })
      .catch((error) => {
        showMessage({
          message: "Ops, verifique sua conexão com a internet!",
          type: "danger",
        });
        setLoad(false);
      });
  };

  return (
    <Container style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
        <Text style={styles.textLogo}>Refeitório</Text>
      </View>

      <View style={styles.inputContainer}>
        <Icon
          name={"person"}
          style={styles.inputIcon}
          size={28}
          color={Colors.TRANSPARENT}
        />
        <TextInput
          style={styles.input}
          placeholder={"Matricula"}
          placeholderTextColor={Colors.TRANSPARENT}
          value={code}
          underlineColorAndroid={"transparent"}
          onChangeText={setCode}
        />
      </View>
      {load ? (
        <ActivityIndicator
          size="large"
          style={{ marginTop: 10, textAlign: "center" }}
          color={Colors.GREEN}
        />
      ) : (
        <ButtonOpacity style={styles.btnLogin} onPress={login}>
          <TextButton>Entrar</TextButton>
        </ButtonOpacity>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    width: null,
    height: null,
    backgroundColor: Colors.BGLOGIN,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 50,
  },
  logo: {
    width: 120,
    height: 120,
  },
  textLogo: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1B232A",
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
    backgroundColor: "rgba(0, 0, 0, 0.35)",
    color: Colors.TEXTBOX,
    marginHorizontal: 25,
  },
  inputIcon: {
    position: "absolute",
    top: 8,
    left: 37,
  },
  btnLogin: {
    marginTop: 40,
    width: WIDTH - 55,
  },
});

export default Login;
