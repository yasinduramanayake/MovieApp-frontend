export default {
  check: function check() {
    if (sessionStorage.token) {
      return true;
    } else {
      return false;
    }
  }
};
