<template>
  <transition name="modal" appear>
    <div class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">&times;</button>
        <div class="logintop-head">
          <img src="/images/logo.png" alt="">
          <h2>Welcome!</h2>
          <p>Sign in to your account</p>
        </div>
        <form class="loginform-synapse" @submit.prevent="login">
          <div class="form-group">
            <label>Your Email Address<span>*</span></label>
            <input type="email" v-model="email" required />
          </div>
          <div class="form-group">
            <label>Password<span>*</span></label>
            <input type="password" v-model="password" required />
          </div>

          <div class="login-remember">
            <h6>Remember me</h6>
            <label class="switch">
              <input type="checkbox" v-model="rememberMe" />
              <span class="slider round"></span>
            </label>
          </div>
          <button type="submit" class="submit-btn">Sign in</button>
          <div class="login-other-method">
            <p>Or, Login with</p>
            <ul class="social-login-icons">
              <li class="google"><i class="fab fa-google-plus-g"></i></li>
              <li class="facelock"><img src="/images/facial-recognition.png" alt="img"></li>
              <li class="instagram"><i class="fa-brands fa-instagram"></i></li>
              <li class="facebook"><i class="fab fa-facebook-f"></i></li>
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
      rememberMe: false
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




    async login() {
      // const baseUrl = 'http://127.0.0.1:8000/api'
      const baseUrl = 'https://staging.imsynapse.com/api'


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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px 30px 0px 30px;
  border-radius: 8px;
  position: relative;
  width: 90%;
  max-width: 350px;
  will-change: transform;
  transform: translateY(0);
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
  border: 1px solid #ddd;
  border-radius: 4px;
}

.submit-btn {
  background-color: #838383;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 100%;
  font-family: 'Poppins';
  border: 1px solid #838383;
  transition: all .6s ease;
}

.submit-btn:hover {
  background: transparent;
  color: #838383;
}

/* Custom remember switch */
.login-remember {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0px 0px 50px 0px;
}

.login-remember h6 {
  margin: 0;
  font-size: 12px;
  color: gray;
  font-weight: 500;
}

/* Toggle switch */
.switch {
  position: relative;
  display: inline-block;
  width: 32px;
  height: 18px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 34px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.slider::before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 2px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked+.slider {
  background-color: #20B14B;
}

input:checked+.slider::before {
  transform: translateX(12px);
}
</style>