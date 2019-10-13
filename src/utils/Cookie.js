import cookies from "js-cookie";

class Cookie {
  constructor() {
    this.ck = cookies;
  }

  get() {}

  set() {}
}

const cookie = new Cookie();

export default cookie;
