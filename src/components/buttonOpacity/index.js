import React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';

import { Colors } from '../../config/colors'

const WIDTH = Dimensions.get('window').width;

export const ButtonOpacity = styled.TouchableOpacity`
  width: ${WIDTH - 55};
  height: 40px;
  margin-top: 0px;
  border-radius: 20px;
  background-color: ${Colors.GREEN};
  justify-content: center;
`;