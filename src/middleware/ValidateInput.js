export default (inputValue, inputName) => {
  switch (inputName) {
    case "username":
      if (
        /^[a-zA-Z0-9\.]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(inputValue) ||
        /^[a-zA-z]{5,20}$/.test(inputValue)
      ) {
        return true;
      }
      return false;
    case "password":
      if (/^[a-zA-Z0-9]{6,20}$/.test(inputValue)) {
        return true;
      }
      return false;
    default:
      return false;
  }
};
