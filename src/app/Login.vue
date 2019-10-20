<template>
  <div id="mc-login-page">
    <div class="container" :class="{ 'right-panel-active': rightPanelActive }">
      <div class="form-container sign-up-container">
        <div class="form-box">
          <h1>Create Account</h1>
          <div class="social-container">
            <a href="#" class="social">
              <svg-icon icon-class="google-plus" size="38"></svg-icon>
            </a>
            <a href="#" class="social">
              <svg-icon icon-class="facebook" size="38"></svg-icon>
            </a>
            <a href="#" class="social">
              <svg-icon icon-class="twitter" size="38"></svg-icon>
            </a>
          </div>
          <span>or use your email for registration</span>
          <input
            v-model="username"
            type="text"
            name="username"
            placeholder="Name..."
          />
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="Email..."
          />
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password..."
          />
          <button @click="register()">Sign Up</button>
        </div>
      </div>

      <div class="form-container sign-in-container">
        <div class="form-box">
          <h1>Sign In</h1>
          <div class="social-container">
            <a href="#" class="social">
              <svg-icon icon-class="google-plus" size="38"></svg-icon>
            </a>
            <a href="#" class="social">
              <svg-icon icon-class="facebook" size="38"></svg-icon>
            </a>
            <a href="#" class="social">
              <svg-icon icon-class="twitter" size="38"></svg-icon>
            </a>
          </div>
          <span>or use your account</span>
          <input
            v-model="email"
            type="email"
            name="email"
            placeholder="Email..."
          />
          <input
            v-model="password"
            type="password"
            name="password"
            placeholder="Password..."
          />
          <a href="#">Forgot your password</a>
          <button @click="login()">Sign In</button>
        </div>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button
              class="ghost"
              id="signIn"
              @click="displayForm('sign-in')"
            >Sign In</button>
          </div>
          <div class="overlay-panel overlay-right">
            <h1>Macnote</h1>
            <p>Enter your personal details and start journey with us</p>
            <button
              class="ghost"
              id="signUp"
              @click="displayForm('sign-up')"
            >Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Firebase from '@/models/Firebase.js';

export default {
  data() {
    return {
      rightPanelActive: false,
      email: '',
      username: '',
      password: '',
      firebase: null
    }
  },

  created() {
    console.log('******* Macnote Login Page ********')
    this.firebase = new Firebase();
    window.myfirebase = this.firebase;
    console.log('Firebase: ', this.firebase)
  },

  methods: {

    async login() {
      if (!this.email && !this.password) {
        console.log('email or password empty')
        return;
      }
      try {
        const rs = await this.$firebase.login(this.email, this.password);
        
        // if (rs) 
        this.$router.push({name: 'app'});
      } catch(err) {
        console.error(err);
      }
      
    },

    register() {
      console.log('register');
      this.firebase.createUser(this.email, this.password);
    },
    
    displayForm(arg) {
      if (arg==='sign-in') {
        this.rightPanelActive = false;
      } else {
        this.rightPanelActive = true;
      }
    }
  }
}
</script>

<style lang="scss">
#mc-login-page {
  width: 100%;
  height: 100%;

  .container {
    h1 {
      font-weight: bold;
      margin: 0;
    }

    h2 {
      text-align: center;
    }

    p {
      font-size: 14px;
      font-weight: 100;
      line-height: 20px;
      letter-spacing: 0.5px;
      margin: 20px 0 30px;
    }

    span {
      font-size: 12px;
    }

    a {
      color: #333;
      font-size: 14px;
      text-decoration: none;
      margin: 15px 0;
    }

    button {
      border-radius: 5px;
      border: none;
      background-color: lighten($base-color, 15%);
      color: #FFFFFF;
      font-size: 12px;
      font-weight: bold;
      padding: 12px 45px;
      letter-spacing: 1px;
      text-transform: uppercase;
      transition: transform 0.4s ease-in;
      cursor: pointer;

      &:hover {
        transform: scale(0.95);
        background-color: lighten($base-color, 17%);
      }

      &:active {
        transform: scale(0.95);
        background-color: lighten($base-color, 20%);
      }

      &:focus {
        outline: none;
      }
    }

    button {
      .ghost {
        background-color: transparent;
        border-color: #FFFFFF;
      }
    }
    
    .form-container {
      position: absolute;
      top: 0;
      height: 100%;
      transition: all 0.6s ease-in-out;

      .form-box {
        background-color: #FFFFFF;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        padding: 0 50px;
        height: 100%;
        text-align: center;
      }

      input {
        background-color: #eee;
        border: none;
        padding: 12px 15px;
        margin: 8px 0;
        width: 60%;
        outline: none;
        border-radius: 5px;
      }
    }

    // .container {
    //   background-color: #fff;
    //   border-radius: 10px;
    //     box-shadow: 0 14px 28px rgba(0,0,0,0.25), 
    //       0 10px 10px rgba(0,0,0,0.22);
    //   position: relative;
    //   overflow: hidden;
    //   width: 768px;
    //   max-width: 100%;
    //   min-height: 480px;
    // }

    .sign-in-container {
      left: 0;
      width: 50%;
      z-index: 2;
    }

    .sign-up-container {
      left: 0;
      width: 50%;
      opacity: 0;
      z-index: 1;
    }

    @keyframes show {
      0%, 49.99% {
        opacity: 0;
        z-index: 1;
      }
      
      50%, 100% {
        opacity: 1;
        z-index: 5;
      }
    }

    .overlay-container {
      position: absolute;
      top: 0;
      left: 50%;
      width: 50%;
      height: 100%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;
      z-index: 100;
    }

    .overlay {
      background: lighten( $base-color, 15% );
      background: -webkit-linear-gradient(to right, $base-color, lighten( $base-color, 15% ));
      background: linear-gradient(to right, $base-color, lighten( $base-color, 15% ));
      background-repeat: no-repeat;
      background-size: cover;
      background-position: 0 0;
      color: #FFFFFF;
      position: relative;
      left: -100%;
      height: 100%;
      width: 200%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }

    .overlay-panel {
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 0 40px;
      text-align: center;
      top: 0;
      height: 100%;
      width: 50%;
      transform: translateX(0);
      transition: transform 0.6s ease-in-out;
    }

    .overlay-left {
      transform: translateX(-20%);
    }

    .overlay-right {
      right: 0;
      transform: translateX(0);
    }

    .social-container {
      margin: 20px 0;
    }

    .social-container a {
      // border: 1px solid #DDDDDD;
      // border-radius: 50%;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      margin: 0 5px;
      height: 40px;
      width: 40px;
    }
  }

  .right-panel-active .sign-in-container {
    transform: translateX(100%);
  }

  .right-panel-active .overlay-container {
    transform: translateX(-100%);
  }

  .right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
  }

  .right-panel-active .overlay {
    transform: translateX(50%);
  }

  .right-panel-active .overlay-left {
    transform: translateX(0);
  }

  .right-panel-active .overlay-right {
    transform: translateX(20%);
  }
}
</style>