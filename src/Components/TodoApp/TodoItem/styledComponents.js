import styled from "styled-components";
import { TextInput, TouchableOpacity } from "react-native";

export const Input = styled(TextInput)`
  height: 40;
  borderColor: gray;
  borderWidth: 1;
  padding: 5px;
`;

export const CheckContainer = styled.View`
  width: 50;
`;

export const Item = styled.View`
  flexDirection: row;
  alignItems: center;
`;

export const TodoText = styled.Text`
  textDecorationLine: ${props =>
    props.todo.isCompleted ? "line-through" : "none"};
`;

export const TextContainer = styled(TouchableOpacity)`
flex:1;
`;