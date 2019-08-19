import styled from "styled-components";

export const Item = styled.View`
flexDirection: row;
alignItems: center;
`;

export const TodoText = styled.Text`
textDecorationLine: ${props => props.todo.isCompleted ? "line-through" : "none"}
`;