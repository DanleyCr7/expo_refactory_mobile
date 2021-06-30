import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('screen')

export const ContentQRCancel= styled.View`
    width: ${props => (props.cancel? width-40: width)};
    flex-direction: row;
    justify-content: ${props => (props.cancel? 'space-between': 'center')};
    align-items: center;
`
export const ButtonIconQR= styled.TouchableOpacity`
    width: 40px;
    height: 40px;
    align-items: center;
    justify-content: center;
`