import AuthStore from "./index";

let store = new AuthStore();

describe("Auth store test", () => {
  test("should test login function to return true for correct login and false for wrong details", async () => {
    var isValid = await store.login("yash", "1234");
    expect(isValid).toBeTruthy();
    isValid = await store.login("4354", "1234");
    expect(isValid).toBeFalsy();
  });
});
