import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  ScrollView,
} from 'react-native';

import areIntervalsOverlapping from 'date-fns/areIntervalsOverlapping'
import setHours from 'date-fns/setHours';
import addMinutes from 'date-fns/addMinutes';
import isAfter from 'date-fns/isAfter';

import { Container } from '../../components/container';
import { Box } from '../../components/box';
import { TextBox } from '../../components/textBox';
import { ButtonOpacity } from '../../components/buttonOpacity';
import ConfirmModal from '../../components/confirmModal';
import QRcode from '../../components/cameraQR';
import { Colors } from '../../config/colors';
import api from '../../services/api';
import axios from 'axios';

const Hours = { 
  lunch: {
    start: setHours(new Date, 6),
    end: setHours(new Date, 10),
  },
  dinner: {
    start: setHours(new Date, 18),
    end: addMinutes(setHours(new Date, 23), 59),
  },
};

const Order = ({ dataLunch, dataDinner, meal, date }) => {
  const mealHour = {
    isLunch: areIntervalsOverlapping(
      { start: Hours.lunch.start, end: Hours.lunch.end }, 
      { start: new Date, end: addMinutes(new Date, 1) },
    ),
    isDinner: areIntervalsOverlapping(
      { start: Hours.dinner.start, end: Hours.dinner.end }, 
      { start: new Date, end: addMinutes(new Date, 1) },
    ),
  };
  const [isReader, setisReader] = useState(false)

  return ( 
    <Box style={styles.descrip}>
      {!!meal.lunch && meal.lunch ?
      <>
        <ScrollView>{
          !!dataLunch && <>
            <Text style={styles.title}>{dataLunch.title}</Text> 
            <Text style={styles.description}>{dataLunch.description}</Text>
          </>} 
           <QRcode isReader={isReader}/>
        </ScrollView>
        <ConfirmModal date={mealHour.isLunch && date} />
      </>
      :
      <>
        <ScrollView>{
          !!dataDinner && <> 
            <Text style={styles.title}>{dataDinner.title}</Text> 
            <Text style={styles.description}>{dataDinner.description}</Text>
           <QRcode isReader={isReader}/>
          </>
          } 
        </ScrollView>
        <ConfirmModal date={mealHour.isDinner && date} />
      </>
      }
    </Box>
  )
};

const styles = StyleSheet.create({
  descrip: {
    flex: 1,
    borderRadius: 0,
    borderTopColor: Colors.BGCONTAINER,
    borderBottomColor: 'transparent',
    paddingBottom: 0,
    marginBottom: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    color: Colors.TEXTBOX,
  }, 
});

export default Order;