import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet, 
    FlatList,
    Image
} from 'react-native';
import api from '../../services/api';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import logo from '../../images/logo.png';
import { Colors } from '../../config/colors';
import { format, parse  } from 'date-fns'
import { translate } from '../../config/textWeekDay';
export const ListMeal =({ navigation })=> {
    const [data, setData] = useState([]);

    const apiGetData = async _ => {
        try {
            const resp = await api.get('/menu')
            setData(resp.data);
        } catch (err) {
            console.log(err);
        }
    };
    useEffect(_ => {
        apiGetData();
        translate()
    }, []);

    const getMeal= async (id)=>{
        try {
            const resp = await api.get(`/menu/${id}`)
            navigation.navigate('Menu', {
                menu: resp.data
            });
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <View style={styles.container}>     
           <FlatList
                data={data}
                renderItem={({item})=>{
                return(
                    <TouchableOpacity style={styles.buttonList} onPress={()=>getMeal(item._id)}>
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image source={logo} style={styles.logo} />
                            <View style={{ width: '70%' }}>
                                <Text style={{fontWeight: 'bold', fontSize: 16,color: Colors.GREEN}}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                            {/* view que contem a data e a informacao do almoço*/}
                            <View style={styles.meal}>
                                <Text style={styles.textDate}>{translate(format(parse(item.date, 'dd/mm/yyyy', new Date()), 'EEEE'))}</Text>

                                <View style={styles.contenTextMeal}>
                                    <Text style={styles.textMeal}>{item.type == 1? 'Jantar' : 'Almoço'}</Text>
                                </View>
                                </View>
                            </View>
                        </View>

                        <MaterialCommunityIcons name="chevron-right" color={Colors.TEXTBOX} size={25}/>
                    </TouchableOpacity>
                )}}
                keyExtractor={item => item._id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
        width: '100%',
        backgroundColor: '#fff',
        flex:1,
        paddingTop: 30,
     },
  buttonList:{
         width: '95%',
         backgroundColor: '#fff',
         flexDirection: 'row',
         justifyContent: 'space-between',
         borderRadius: 8,
         borderBottomColor: '#fff',
         borderBottomWidth: 0.4,
         marginBottom: 3,
         paddingVertical: 10,
         paddingHorizontal: 4,
         marginLeft: 10
   },
   logo: {
    width: 80,
    height: 80,
  },
  textDate:{
      fontSize: 12,
      color: '#999',
  },
  description:{
    color: Colors.TEXTBOX
  },
  meal:{
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 5
    },
    contenTextMeal:{
        backgroundColor: Colors.GREEN,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4
    },
    textMeal:{
      fontSize: 12,
      color: '#fff',
    }
})