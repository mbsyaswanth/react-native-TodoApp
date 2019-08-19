import styled from "styled-components";
import {Dimensions} from "react-native";

const getDimensions = () => Dimensions.get('window').width;


export const Container = styled.View`
 position : absolute;
 bottom : 0;
 width : ${getDimensions()};
 backgroundColor : yellow;
`;
