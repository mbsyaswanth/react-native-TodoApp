import styled from "styled-components";

export const Container = styled.View`
flex: 1;
justifyContent: center;
alignItems: center;
backgroundColor: linear-gradient(
    45deg,
    rgb(140, 85, 250) 0%,
    rgb(200, 215, 253) 75%,
    rgb(143, 230, 243) 100%
  );
`;

export const Logo = styled.Text`
fontSize: 45;
fontWeight: bold;
color: white;
`;
