import React from 'react';
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Rating, AirbnbRating } from 'react-native-ratings';
import Modal from 'react-native-modal';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useState } from "react";
export default function Avaliation({ modalRating, setModalRating }) {
    const [rating, setRating] = useState(0)
    return (
        <Modal isVisible={false}>
            <View style={styles.container}>
                <TouchableOpacity
                style={styles.buttonIconClose}
                onPress={()=>setModalRating(false)}
                >
                    <MaterialCommunityIcons name="close" color='#000' size={25}/>
                </TouchableOpacity>
                <AirbnbRating
                    count={5}
                    reviews={["Horrivel", "ruim", "bom", "ótimo", "perfeito"]}
                    defaultRating={3}
                    size={25}
                    onFinishRating={number=>setRating(number)}
                />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
   container: { 
    backgroundColor: '#fff',
    width: '90%',
    paddingVertical: 30,
    alignSelf: 'center',
    borderRadius: 4
   },
   buttonIconClose:{
       position: 'absolute',
       right: 5,
       top: 2,
       padding: 8
   }
})