import React, {useState} from 'react'
import {ButtonOpacityMenu} from '../buttonOpacityMenu';
import SwiperContent from '../swiperContent';
import { Container } from '../container'; 
import { TextBox} from '../textBox';

import styles from './styles';

export default function containerSwiper({index, day_of_the_week, number}){
    const [data, setData] = useState([]);

    return(
    <Container>
        <ButtonOpacityMenu style={styles.buttonContent}>
          <TextBox style={styles.title}>{day_of_the_week}</TextBox>
        </ButtonOpacityMenu>
        <SwiperContent 
          dataLunch={data[0]} 
          dataDinner={data[1]} 
          date={index === number}
        />
      </Container>
    )
}