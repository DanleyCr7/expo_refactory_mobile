import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { Colors } from '../../config/colors'

const WIDTH = Dimensions.get('window').width;

export const ButtonOpacityMenu = styled.TouchableOpacity`
  width: ${WIDTH - 150};
  height: 35px;
  background-color: transparent;
  justify-content: center;
`;