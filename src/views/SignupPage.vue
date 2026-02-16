<template>
  <div>
    <section class="signup-page-sec">
      <div class="container">
        <div class="signup-wrapper">
          <div class="signup-top-head">
            <p>Welcome to</p>
            <img src="/images/logo.png" alt="logo">
          </div>
          
          <form class="signup-form" @submit.prevent="signup">
            <div class="form-group">
              <label>Username <span>*</span></label>
              <input type="text" v-model="form.username" required />
              <span class="error-message" v-if="errors.username">{{ errors.username[0] }}</span>
            </div>

            <div class="form-group">
              <label>Full Name <span>*</span></label>
              <input type="text" v-model="form.fullname" required />
              <span class="error-message" v-if="errors.fullname">{{ errors.fullname[0] }}</span>
            </div>

            <div class="form-group">
              <label>Email Address <span>*</span></label>
              <input type="email" v-model="form.email" required />
              <span class="error-message" v-if="errors.email">{{ errors.email[0] }}</span>
            </div>

            <div class="form-group password-wrapper">
              <label>Password <span>*</span></label>
              <div class="password-input">
                <input :type="showPassword ? 'text' : 'password'" v-model="form.password" required />
                <span class="toggle-icon" @click="togglePassword">
                  <i :class="showPassword ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
                </span>
              </div>
              <span class="error-message" v-if="errors.password">{{ errors.password[0] }}</span>
            </div>

            <div class="form-group">
              <label>Profile Picture <span>*</span></label>
              <div class="file-upload-wrapper">
                <input type="file" ref="fileInput" @change="handleFileChange" accept="image/*" required />
                <div class="file-upload-display" v-if="profilePreview">
                  <img :src="profilePreview" alt="Profile preview" />
                  <button type="button" @click="removeFile" class="remove-file-btn">×</button>
                </div>
                <div class="file-upload-placeholder" v-else>
                  <i class="fa fa-cloud-upload"></i>
                  <p>Click to upload profile picture</p>
                </div>
              </div>
              <span class="error-message" v-if="errors.profile">{{ errors.profile[0] }}</span>
            </div>

            <div class="form-message" v-if="message">
              <div :class="messageType === 'success' ? 'success-message' : 'error-message'">
                {{ message }}
              </div>
            </div>

            <button type="submit" class="submit-btn" :disabled="isLoading">
              <span v-if="!isLoading">Sign up</span>
              <span v-else>Signing up...</span>
              <div class="cardbottom-shadow">
                <img src="/images/cardshadow.png" alt="">
              </div>
            </button>

            <div class="signup-footer">
              <h5>Already have an account? <router-link to="/">Login</router-link></h5>
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
  name: 'SignupPage',
  data() {
    return {
      form: {
        username: '',
        fullname: '',
        email: '',
        password: '',
        profile: null
      },
      showPassword: false,
      profilePreview: null,
      errors: {},
      message: '',
      messageType: '',
      isLoading: false
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.form.profile = file;
        // Create preview
        const reader = new FileReader();
        reader.onload = (e) => {
          this.profilePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    removeFile() {
      this.form.profile = null;
      this.profilePreview = null;
      if (this.$refs.fileInput) {
        this.$refs.fileInput.value = '';
      }
    },
    async signup() {
      this.errors = {};
      this.message = '';
      this.isLoading = true;

      const baseUrl = 'http://127.0.0.1:8000/api';
      
      try {
        const formData = new FormData();
        formData.append('username', this.form.username);
        formData.append('fullname', this.form.fullname);
        formData.append('email', this.form.email);
        formData.append('password', this.form.password);
        formData.append('profile', this.form.profile);

        const response = await axios.post(`${baseUrl}/register`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log(response.data);

        this.message = 'Registration successful! Redirecting to login...';
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
          this.message = error.response?.data?.message || 'Registration failed. Please try again.';
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
.signup-page-sec {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.signup-wrapper {
  background: white;
  border-radius: 20px;
  padding: 40px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

.signup-top-head {
  text-align: center;
  margin-bottom: 30px;
}

.signup-top-head p {
  font-size: 18px;
  color: #666;
  margin-bottom: 10px;
}

.signup-top-head img {
  max-width: 150px;
  height: auto;
}

.signup-form {
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

.form-group input[type="text"],
.form-group input[type="email"],
.form-group input[type="password"] {
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

.password-wrapper {
  position: relative;
}

.password-input {
  position: relative;
}

.password-input input {
  padding-right: 40px;
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

.file-upload-wrapper {
  position: relative;
}

.file-upload-wrapper input[type="file"] {
  position: absolute;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 2;
}

.file-upload-display {
  position: relative;
  width: 150px;
  height: 150px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 0 auto;
}

.file-upload-display img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.remove-file-btn {
  position: absolute;
  top: 5px;
  right: 5px;
  background: #e53935;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.file-upload-placeholder {
  width: 150px;
  height: 150px;
  border: 2px dashed #ddd;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  cursor: pointer;
  transition: border-color 0.3s;
}

.file-upload-placeholder:hover {
  border-color: #1A90FF;
}

.file-upload-placeholder i {
  font-size: 40px;
  color: #999;
  margin-bottom: 10px;
}

.file-upload-placeholder p {
  font-size: 12px;
  color: #999;
  margin: 0;
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

.signup-footer {
  text-align: center;
  margin-top: 30px;
}

.signup-footer h5 {
  font-size: 14px;
  color: #666;
}

.signup-footer a {
  color: #1A90FF;
  text-decoration: none;
  font-weight: 600;
}

.signup-footer a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .signup-wrapper {
    padding: 30px 20px;
  }
}
</style>


