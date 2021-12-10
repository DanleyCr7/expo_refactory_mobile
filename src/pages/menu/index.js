import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { Colors } from "../../config/colors";
import { TextBox } from "../../components/textBox";
import SwiperContent from "../../components/swiperContent";
import api from "../../services/api";
import { addLunch, setStudent, setReserveID } from "../../store/fetchActions";
import Avaliation from "../../components/avaliation";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showMessage } from "react-native-flash-message";
import { translate } from "../../config/textWeekDay";

const Menu = ({ navigation }) => {
  const dispatch = useDispatch();
  const [modalRating, setModalRating] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);
  const [diaSemana, setDiaSemana] = useState("");
  const [menu, setMenu] = useState({});
  const scan = useSelector((state) => state.qrcode.scan);

  const isMenu = (item_menu) => {
    dispatch(addLunch(item_menu));
  };

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      getMenu();
      setRefreshing(false);
    });
  }, []);

  const apiGetStudentReserve = async (_) => {
    let data = await AsyncStorage.getItem("student");
    let student = JSON.parse(data);
    api
      .post(`/reserves/find/${student?._id}`, { id: menu?._id })
      .then((resp) => {
        dispatch(setReserveID(resp.data));
      })
      .catch((error) => {
        showMessage({
          message: "Aconteceu algum erro.",
          type: "danger",
        });
      });
  };

  const getMenu = async () => {
    await api
      .get("/menu")
      .then((resp) => {
        console.log(resp.data);
        const menu = resp.data;
        isMenu(menu);
        setMenu(menu);
      })
      .catch((erro) => {
        console.log(erro);
        showMessage({
          message: "Aconteceu algum erro.",
          type: "danger",
        });
      });
  };

  useEffect(() => {
    getMenu();
    apiGetStudentReserve();
  }, [scan]);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {modalRating && (
          <Avaliation
            modalRating={modalRating}
            setModalRating={setModalRating}
          />
        )}
        <View style={styles.buttonContent}>
          <TextBox style={styles.title}>{translate(menu.dayOfWeek)}</TextBox>
        </View>
        <SwiperContent />
      </ScrollView>
    </SafeAreaView>
  );
};
export default Menu;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: "center",
  },
  scrollView: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },

  buttonContent: {
    width: 100,
    borderWidth: 2,
    borderColor: Colors.GREEN,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 0,
    alignItems: "center",
  },
  title: {
    color: Colors.GREEN,
  },
});
