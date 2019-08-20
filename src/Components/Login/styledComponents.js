import styled from "styled-components";
import {TextInput} from "react-native";
import {IconToggle} from "react-native-material-ui";

export const Container = styled.View`
 flex: 1;
      alignItems: center;
      justifyContent: center;
      backgroundColor: #ecf0f1;
`;

export const Input = styled(TextInput)`
width: 200;
      height: 44;
      padding: 10px;
      borderWidth: 1;
      borderColor: black;
      marginBottom: 10;
`;

export const DeleteIcon = styled(IconToggle)`
padding: 5px;
`;