class AuthStore {
  username = "yash";
  password = "1234";
  login = (username, password) => {
    if (username === this.username && password === this.password) {
      return new Promise(resolve =>
        setTimeout(() => {
          resolve(true);
        }, 2000)
      );
    }
    return new Promise(reject =>
      setTimeout(() => {
        reject(false);
      }, 2000)
    );
  };
}

export default AuthStore;
