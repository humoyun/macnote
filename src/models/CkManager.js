import * as cookie from "js-cookie";

class CkManager {
  constructor() {
    this.cookie = cookie;
    this.USER = "macnote_user";
    this.TOKEN = "macnote_token";
    this.domain = window.location.hostname;
  }

  set(key, val) {
    // this.checkCookieSize(val);

    this.cookie.set(key, val, {
      domain: this.domain,
      expires: 365
    });
  }

  get(key) {
    return this.cookie.get(key);
  }

  getToken() {
    console.log(cookie);
    return this.get(this.TOKEN);
  }

  clear() {
    this.remove(this.USER);
    this.remove(this.TOKEN);
  }

  remove(key) {
    this.cookie.remove(key, {
      domain: this.domain
    });
  }
}

const ck = new CkManager();
window.myCookie = ck;
export default ck;
