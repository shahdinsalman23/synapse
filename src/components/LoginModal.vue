<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <!-- <button class="close-btn" @click="closeModal">&times;</button> -->
        <div class="logintop-head">
          <p>Welcome to</p>
          <img src="/images/logo.png" alt="">
        </div>
        <form class="loginform-synapse" @submit.prevent="login">
          <div class="form-group email-box">
            <label>Your Email Address<span>*</span></label>
            <input type="email" v-model="email" required />
          </div>
          <!-- <div class="form-group">
            <label>Password<span>*</span></label>
            <input type="password" v-model="password" required />
          </div> -->

           <div class="form-group password-wrapper">
            <label>Password <span>*</span></label>
            <div class="password-input">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="password"
                required
              />
              <span class="toggle-icon" @click="togglePassword">
                <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
              </span>
            </div>
          </div>

          <div class="login-remember">
            <input type="checkbox" name="" id="">
            <h6>Remember me</h6>
          </div>
          <button type="submit" class="submit-btn">
            Sign in
            <div class="cardbottom-shadow">
              <img src="/images/cardshadow.png" alt="">
            </div>
          </button>
          <div class="login-other-method">
            <p>Or, Login with</p>
            <ul class="social-login-icons">
              <li class="google"><img src="/images/fingereprint.png" alt="img"></li>
              <li class="facelock"><img src="/images/facelock.png" alt="img"></li>
              <li class="instagram"><img src="/images/google.png" alt="img"></li>
              <li class="facebook"><img src="/images/facebook.png" alt="img"></li>
            </ul>
          </div>
          <h5>Don't have an account ? <router-link to="/">Sign up</router-link></h5>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>

import axios from 'axios';

export default {
  name: 'LoginModal',
  data() {
    return {
      email: '',
      password: '',
      rememberMe: false,
      showPassword: false
    }
  },
  mounted() {
    document.body.style.overflow = 'hidden';
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  },

  created(){

    const savedCredentials = JSON.parse(localStorage.getItem("rememberMeCredentials"));
    if (savedCredentials) {
      this.email = savedCredentials.email;
      this.password = savedCredentials.password;
      this.rememberMe = true;
    }

  },
  methods: {

    togglePassword() {
      this.showPassword = !this.showPassword
    },




    async login() {
      // const baseUrl = 'http://127.0.0.1:8000/api'
      // const baseUrl = 'https://staging.imsynapse.com/api'
      const baseUrl = 'https://admin.imsynapse.com/api'

      // const baseUrl = 'https://synapse.appssols.com/api'



      console.log('remember', this.rememberMe);

    
      if (this.rememberMe) {
       
        const credentials = {
          email: this.email,
          password: this.password,
        };
        localStorage.setItem("rememberMeCredentials", JSON.stringify(credentials));
      } else {
       
        localStorage.removeItem("rememberMeCredentials");
      }

      try {
        const response = await axios.post(`${baseUrl}/login`, {
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("token", response.data.token);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
       

        this.$store.dispatch("user", response.data.user);
        console.log('yes', response.data);



        
        if (response.data.user.type == 'user') {



       this.$router.push('/userlogin')

        



        }
        else {


          // this.$router.push("/admin");
          this.$router.push("/admin").then(() => {
            window.location.reload();
          });
        }


      } catch (error) {
     
        this.shows = true
        this.loader = false
      }
    },
    closeModal() {
      document.body.style.overflow = '';
      this.$emit('close');
    },
    
  }
}
</script>

<style scoped>

span.toggle-icon {
  font-size: 14px;
  opacity: .7;
 
}

.password-wrapper {
  position: relative;
}
.password-input {
  position: relative;
}
.password-input input {
  width: 100%;
  padding-right: 30px; /* space for the icon */
}
.toggle-icon {
  position: absolute;
  top: 50%;
  right: 25px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;
}
/* TRANSITION ANIMATION */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.4s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-leave-active .modal-content {
  transition: transform 0.4s ease;
}

.modal-enter-from .modal-content {
  transform: translateY(-40px);
}

.modal-leave-to .modal-content {
  transform: translateY(-40px);
}

/* Rest of your existing CSS remains unchanged */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffffc7;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(5px);
}

.modal-content {
  background: white;
  padding: 50px 50px 0px 50px;
  border-radius: 50px;
  position: relative;
  width:100%;
  height: 680px;
  max-width: 380px;
  will-change: transform;
  transform: translateY(0);
  box-shadow: 0 0 23.34px #000000BF;
}


.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #9ded6c75;
  border-radius: 40px;
}

.submit-btn {
  background-color: #9DED6C;
    color: #231F20;
    padding: 5px 0px;
    border: none;
    border-radius: 35px;
    cursor: pointer;
    width: 111.84px;
    border: 1px solid #00a14b75;
    transition: all .6s ease;
    font-weight: bold;
    font-size: 14px;
    height: 29.60px;
    position: relative;
    margin: 0px 0px 24px 0px;
}

.submit-btn:hover {
  background: #20B14B;
  color: #fff;
}

/* Custom remember switch */
.login-remember {
  display: flex;
    align-items: center;
    gap: 5px;
    margin: 0px 0px 44px 0px;
    justify-content: center;
}

.login-remember h6 {
  margin: 0;
  font-size: 12px;
  color: #6D6E71;
  font-weight: normal;
  line-height: 8px;
}

.submit-btn .cardbottom-shadow img {
    left: 50%;
    transform: translate(-50%);
    width: 200px;
}

.email-box {
    padding: 0px 0px 31px 0px;
    margin: 0px !important;
}

</style>