import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

import areIntervalsOverlapping from "date-fns/areIntervalsOverlapping";
import setHours from "date-fns/setHours";
import addMinutes from "date-fns/addMinutes";

import { Box } from "../../components/box";
import ConfirmModal from "../../components/confirmModal";
import QRcode from "../../components/cameraQR";
import { Colors } from "../../config/colors";
import { useSelector } from "react-redux";

const Hours = {
  lunch: {
    start: setHours(new Date(), 6),
    end: setHours(new Date(), 10),
  },
  dinner: {
    start: setHours(new Date(), 18),
    end: addMinutes(setHours(new Date(), 23), 59),
  },
};

const Order = ({ meal, date }) => {
  const menu = useSelector((state) => state.lunch);
  const scan = useSelector((state) => state.qrcode.scan);
  const [isReader, setisReader] = useState(false);

  return (
    <Box style={styles.descrip}>
      {!!meal.lunch && meal.lunch ? (
        <>
          {!scan && (
            <View style={styles.menu}>
              <Text style={styles.title}>{menu?.title ?? "Sem cardápio"}</Text>
              <Text style={styles.descrip}>
                {menu?.description ?? "Sem refeição para o dia de hoje"}
              </Text>
            </View>
          )}
          <QRcode isReader={isReader} />

          <ConfirmModal />
        </>
      ) : (
        <>
          {!scan && (
            <View style={styles.menu}>
              <Text style={styles.title}>{menu?.title ?? "Sem cardápio"}</Text>
              <Text style={styles.descrip}>
                {menu?.description ?? "Sem refeição para o dia de hoje"}
              </Text>
            </View>
          )}
          <QRcode isReader={isReader} />
          <ConfirmModal />
        </>
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  menu: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  descrip: {
    borderTopColor: Colors.GREEN,
    borderBottomColor: "transparent",
    paddingBottom: 0,
    marginBottom: 0,
    textAlign: "center",
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    color: Colors.TEXTBOX,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Order;
