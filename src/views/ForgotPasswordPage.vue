<template>
  <div>
    <section class="forgot-page-sec">
      <div class="container">
        <div class="forgot-wrapper">
          <div class="forgot-top-head">
            <p>Welcome to</p>
            <img src="/images/logo.png" alt="logo">
          </div>
          
          <h2 class="forgot-title">Forgot Password?</h2>
          <p class="forgot-subtitle">Enter your email address and we'll send you a link to reset your password.</p>
          
          <form class="forgot-form" @submit.prevent="forgotPassword">
            <div class="form-group">
              <label>Email Address <span>*</span></label>
              <input type="email" v-model="email" required placeholder="Enter your email" />
              <span class="error-message" v-if="errors.email">{{ errors.email[0] }}</span>
            </div>

            <div class="form-message" v-if="message">
              <div :class="messageType === 'success' ? 'success-message' : 'error-message'">
                {{ message }}
              </div>
            </div>

            <button type="submit" class="submit-btn" :disabled="isLoading">
              <span v-if="!isLoading">Send Reset Link</span>
              <span v-else>Sending...</span>
              <div class="cardbottom-shadow">
                <img src="/images/cardshadow.png" alt="">
              </div>
            </button>

            <div class="forgot-footer">
              <h5>Remember your password? <router-link to="/">Login</router-link></h5>
            </div>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ForgotPasswordPage',
  data() {
    return {
      email: '',
      errors: {},
      message: '',
      messageType: '',
      isLoading: false
    }
  },
  methods: {
    async forgotPassword() {
      this.errors = {};
      this.message = '';
      this.isLoading = true;

      const baseUrl = 'http://127.0.0.1:8000/api';
      
      try {
        const response = await axios.post(`${baseUrl}/forgot`, {
          email: this.email
        });

        this.message = response.data.message || 'Check your email for reset instructions!';
        this.messageType = 'success';
        this.email = '';

        // Redirect to login after 3 seconds
        setTimeout(() => {
          this.$router.push('/');
        }, 3000);

      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors || {};
          this.message = 'Please fix the errors above.';
          this.messageType = 'error';
        } else {
          this.message = error.response?.data?.message || 'Failed to send reset link. Please try again.';
          this.messageType = 'error';
        }
      } finally {
        this.isLoading = false;
      }
    }
  }
}
</script>

<style scoped>
.forgot-page-sec {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.forgot-wrapper {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.forgot-top-head {
  text-align: center;
  margin-bottom: 30px;
}

.forgot-top-head p {
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
}

.forgot-top-head img {
  max-width: 150px;
  height: auto;
}

.forgot-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.forgot-subtitle {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}

.forgot-form {
  width: 100%;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.form-group label span {
  color: #e53935;
}

.form-group input {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.form-group input:focus {
  outline: none;
  border-color: #1A90FF;
}

.error-message {
  color: #e53935;
  font-size: 12px;
  margin-top: 5px;
  display: block;
}

.form-message {
  margin-bottom: 20px;
}

.success-message {
  background: #4caf50;
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
}

.error-message {
  background: #ffebee;
  color: #e53935;
  padding: 12px;
  border-radius: 8px;
  font-size: 14px;
}

.submit-btn {
  width: 100%;
  padding: 15px;
  background: #1A90FF;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  margin-top: 10px;
  transition: background 0.3s;
}

.submit-btn:hover:not(:disabled) {
  background: #0276BA;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.cardbottom-shadow {
  position: absolute;
  bottom: -22px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 300px;
}

.cardbottom-shadow img {
  width: 100%;
  opacity: 0.7;
}

.forgot-footer {
  text-align: center;
  margin-top: 30px;
}

.forgot-footer h5 {
  font-size: 14px;
  color: #666;
}

.forgot-footer a {
  color: #1A90FF;
  text-decoration: none;
  font-weight: 600;
}

.forgot-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .forgot-wrapper {
    padding: 30px 20px;
  }
}
</style>


