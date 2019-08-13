import { render, fireEvent } from "react-native-testing-library";
import React from "react";
import Login from "./index";

describe("Login", () => {
  test("should call function on login click", () => {
    const spyFun = jest.fn();
    const { getByText } = render(<Login login={spyFun} />);
    fireEvent.press(getByText("Login"));
    expect(spyFun).toHaveBeenCalled();
  });
});
