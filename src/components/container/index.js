import React from 'react';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import { Colors } from '../../config/colors';

export const Container = styled.View`
  flex: 1;
  background-color: ${Colors.BGCONTAINER};
  align-items: center;
  padding-top: 15px; 
`;