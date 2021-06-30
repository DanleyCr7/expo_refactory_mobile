import React from 'react';
import { StyleSheet } from 'react-native'
import { Colors } from '../../config/colors';

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

  export default styles;