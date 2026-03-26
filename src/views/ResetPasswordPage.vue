<template>
  <div>
    <section class="reset-page-sec">
      <div class="container">
        <div class="reset-wrapper">
          <div class="reset-top-head">
            <p>Welcome to</p>
            <img src="/images/logo.png" alt="logo">
          </div>
          
          <h2 class="reset-title">Reset Password</h2>
          <p class="reset-subtitle">Enter your new password below.</p>
          
          <form class="reset-form" @submit.prevent="resetPassword">
            <div class="form-group password-wrapper">
              <label>New Password <span>*</span></label>
              <div class="password-input">
                <input :type="showPassword ? 'text' : 'password'" v-model="form.password" required placeholder="Enter new password" />
                <span class="toggle-icon" @click="togglePassword">
                  <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </span>
              </div>
              <span class="error-message" v-if="errors.password">{{ errors.password[0] }}</span>
            </div>

            <div class="form-group password-wrapper">
              <label>Confirm Password <span>*</span></label>
              <div class="password-input">
                <input :type="showConfirmPassword ? 'text' : 'password'" v-model="form.password_confirmation" required placeholder="Confirm new password" />
                <span class="toggle-icon" @click="toggleConfirmPassword">
                  <i :class="showConfirmPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </span>
              </div>
              <span class="error-message" v-if="errors.password_confirmation">{{ errors.password_confirmation[0] }}</span>
              <span class="error-message" v-if="passwordMismatch">Passwords do not match</span>
            </div>

            <div class="form-message" v-if="message">
              <div :class="messageType === 'success' ? 'success-message' : 'error-message'">
                {{ message }}
              </div>
            </div>

            <button type="submit" class="submit-btn" :disabled="isLoading || passwordMismatch">
              <span v-if="!isLoading">Reset Password</span>
              <span v-else>Resetting...</span>
              <div class="cardbottom-shadow">
                <img src="/images/cardshadow.png" alt="">
              </div>
            </button>

            <div class="reset-footer">
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
  name: 'ResetPasswordPage',
  data() {
    return {
      form: {
        password: '',
        password_confirmation: '',
        token: ''
      },
      showPassword: false,
      showConfirmPassword: false,
      errors: {},
      message: '',
      messageType: '',
      isLoading: false
    }
  },
  computed: {
    passwordMismatch() {
      return this.form.password && this.form.password_confirmation && 
             this.form.password !== this.form.password_confirmation;
    }
  },
  created() {
    // Get token from URL query parameter
    this.form.token = this.$route.query.token || '';
    if (!this.form.token) {
      this.message = 'Invalid or missing reset token.';
      this.messageType = 'error';
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfirmPassword = !this.showConfirmPassword;
    },
    async resetPassword() {
      if (this.passwordMismatch) {
        return;
      }

      this.errors = {};
      this.message = '';
      this.isLoading = true;

      const baseUrl = 'http://127.0.0.1:8000/api';
      
      try {
        const response = await axios.post(`${baseUrl}/reset`, {
          token: this.form.token,
          password: this.form.password
        });

        this.message = response.data.message || 'Password reset successful! Redirecting to login...';
        this.messageType = 'success';

        // Redirect to login after 2 seconds
        setTimeout(() => {
          this.$router.push('/');
        }, 2000);

      } catch (error) {
        if (error.response && error.response.status === 422) {
          this.errors = error.response.data.errors || {};
          this.message = 'Please fix the errors above.';
          this.messageType = 'error';
        } else {
          this.message = error.response?.data?.message || 'Failed to reset password. Please try again.';
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
.reset-page-sec {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.reset-wrapper {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.reset-top-head {
  text-align: center;
  margin-bottom: 30px;
}

.reset-top-head p {
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
}

.reset-top-head img {
  max-width: 150px;
  height: auto;
}

.reset-title {
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 10px;
}

.reset-subtitle {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 30px;
}

.reset-form {
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

.password-wrapper {
  position: relative;
}

.password-input {
  position: relative;
}

.password-input input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.password-input input:focus {
  outline: none;
  border-color: #1A90FF;
}

.toggle-icon {
  position: absolute;
  top: 50%;
  right: 15px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #666;
  font-size: 14px;
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

.reset-footer {
  text-align: center;
  margin-top: 30px;
}

.reset-footer h5 {
  font-size: 14px;
  color: #666;
}

.reset-footer a {
  color: #1A90FF;
  text-decoration: none;
  font-weight: 600;
}

.reset-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .reset-wrapper {
    padding: 30px 20px;
  }
}
</style>



