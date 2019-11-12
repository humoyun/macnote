import cookies from "js-cookie";

class Cookie {
  constructor() {
    this.ck = cookies;
    this.domain = window.location.hostname;
    this.MC_TOKEN = "";
  }

  get(key) {
    return this.ck.get(key);
  }

  set(key, value) {
    this.ck.set(key, value, {
      domain: this.domain,
      expires: 365
    });
  }

  remove() {
    this.ck.remove(key, {
      domain: this.domain
    });
  }

  checkCookieSize(val) {
    let stringfied = val;
    if (typeof val !== "string") {
      stringfied = JSON.stringify(val);
    }
    if (stringfied.length > 4000) {
      console.error("Cookie size is almost reached at 4KB.");
      return false;
    }
    return true;
  }
}

const cookie = new Cookie();

export default cookie;
