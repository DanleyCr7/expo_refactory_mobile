import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Container } from "../container";
import { Box } from "../box";
import { TextButton } from "../textButton";
import { TextButtonMenu } from "../textButtonMenu";
import { ButtonOpacity } from "../buttonOpacity";
import { ButtonOpacityMenu } from "../buttonOpacityMenu";
import ConfirmModal from "../confirmModal";
import { useSelector, useDispatch } from "react-redux";

import { Colors } from "../../config/colors";
import Order from "../../pages/order";

const SwiperContent = ({ date }) => {
  const [meal, setMeal] = useState({ lunch: true, dinner: false });
  const menu = useSelector((state) => state.lunch);
  const reserve = useSelector((state) => state.reserve);

  const condicao = () => {
    if (reserve?.confirm == "não") {
      return `Confirmação até às ${menu.hourConfirmReserve}`;
    } else if (menu?._id) {
      return `Pedidos encerram às ${menu.hourReserve}`;
    }
    return "Aguardando";
  };

  return (
    <Box style={styles.boxContainer}>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonActual}>
          <TextButtonMenu style={styles.textActual}>
            {menu.type == 1 ? "Jantar" : "Almoço"}
          </TextButtonMenu>
        </View>
      </View>

      <ButtonOpacity style={styles.warning} activeOpacity={0.8}>
        <TextButton style={styles.warningText}>{condicao()}</TextButton>
      </ButtonOpacity>

      <Order meal={meal} date={date} />
    </Box>
  );
};

const styles = StyleSheet.create({
  boxContainer: {
    paddingBottom: 0,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonActual: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.GREEN,
    width: "50%",
    marginHorizontal: 30,
    marginTop: 8,
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
    backgroundColor: "transparent",
    marginBottom: 4,
  },
  warningText: {
    color: Colors.RED,
  },
});

export default SwiperContent;
