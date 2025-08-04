<template>
  <div>
    <section class="header-sec">
      <div class="container">
        <div class="headerlogo">
          <img src="/images/logo.png" alt="Logo">
        </div>
        <div class="headermock">
          <div class="mockhead-hamburger">
            <!-- Hamburger Icon -->
            <div class="header-icon-wrapper">
              <div class="hamburger-icon" @click.stop="toggleMainDropdown">
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
                </svg><span>Menu</span>
              </div>
            </div>
            <!-- Main Dropdown -->
            <ul class="main-dropdown" v-show="isMainDropdownOpen" ref="dropdown">

              <li><router-link to="/mocksection"><svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11.38 16.2904H4.38C2.94 16.2904 1.75999 15.1904 1.75999 13.8504V9.15039C1.75999 8.87039 2 8.65039 2.3 8.65039C2.6 8.65039 2.84 8.87039 2.84 9.15039V13.8504C2.84 14.6504 3.53 15.2904 4.38 15.2904H11.38C12.23 15.2904 12.93 14.6404 12.93 13.8504V9.15039C12.93 8.87039 13.17 8.65039 13.47 8.65039C13.77 8.65039 14.01 8.87039 14.01 9.15039V13.8504C14.01 15.2004 12.84 16.2904 11.39 16.2904H11.38Z" fill="#231F20"/>
                <path d="M0.649993 9.17101C0.509993 9.17101 0.380003 9.12102 0.270003 9.01102C0.0600031 8.80102 0.0600031 8.46101 0.270003 8.25101L7.50999 1.01102C7.71999 0.801016 8.06 0.801016 8.27 1.01102L15.48 8.22101C15.69 8.43101 15.69 8.77102 15.48 8.98102C15.27 9.19102 14.93 9.19102 14.72 8.98102L7.89 2.15102L1.03 9.01102C0.929998 9.11102 0.789993 9.17101 0.649993 9.17101Z" fill="#231F20"/>
                </svg>

                
                Mock Home</router-link></li>
              <li><router-link to=""><svg width="17" height="14" viewBox="0 0 17 14" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.4598 0.0898438H2.70982C1.66982 0.0898438 0.819824 0.939851 0.819824 1.97985V11.8898C0.819824 12.9298 1.66982 13.7798 2.70982 13.7798H14.4598C15.4998 13.7798 16.3498 12.9298 16.3498 11.8898V1.97985C16.3498 0.939851 15.4998 0.0898438 14.4598 0.0898438ZM15.1798 12.8998L10.2898 8.92985V8.63985H11.4398L15.6798 12.0798C15.6298 12.4198 15.4398 12.7098 15.1798 12.8998ZM1.48982 12.0798L5.72981 8.63985H6.87982V8.92985L1.98982 12.8998C1.71982 12.7098 1.53982 12.4198 1.48982 12.0798ZM1.98982 0.979851L6.87982 4.94984V5.23985H5.72981L1.48982 1.79985C1.53982 1.45985 1.72982 1.16985 1.98982 0.979851ZM2.72981 0.739845H6.87982V4.09985L2.72981 0.739845ZM4.68982 5.23985H1.46982V2.62984L4.68982 5.23985ZM1.46982 8.63985H4.68982L1.46982 11.2498V8.63985ZM6.87982 9.76984V13.1298H2.72981L6.87982 9.76984ZM7.72981 13.1298V8.20985C7.72981 7.97985 7.53981 7.78985 7.30981 7.78985H1.46982V6.07985H7.30981C7.53981 6.07985 7.72981 5.88985 7.72981 5.65985V0.739845H9.43982V5.65985C9.43982 5.88985 9.62982 6.07985 9.85982 6.07985H15.6998V7.78985H9.85982C9.62982 7.78985 9.43982 7.97985 9.43982 8.20985V13.1298H7.72981ZM15.6798 1.78985L11.4398 5.22985H10.2898V4.93985L15.1798 0.969849C15.4498 1.15985 15.6298 1.44985 15.6798 1.78985ZM15.6998 2.60985V5.21985H12.4798L15.6998 2.60985ZM10.2898 4.08984V0.729851H14.4398L10.2898 4.08984ZM10.2898 9.75985L14.4398 13.1199H10.2898V9.75985ZM12.4798 8.62984H15.6998V11.2398L12.4798 8.62984Z"
                      fill="#231F20" />
                  </svg>
                  About MLA</router-link></li>
              <li><router-link to=""><svg width="19" height="20" viewBox="0 0 19 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M15.2702 9.10016C15.2702 10.6702 14.6102 12.1802 13.4702 13.2502C12.9402 13.7502 12.6302 14.4502 12.6302 15.1702V17.4902C12.6302 18.3402 11.9402 19.0302 11.1002 19.0302H8.08015C7.23015 19.0302 6.55016 18.3402 6.55016 17.4902V15.1702C6.55016 14.4502 6.24016 13.7502 5.71016 13.2502C4.56016 12.1802 3.91016 10.6702 3.91016 9.10016C3.91016 5.96016 6.46016 3.41016 9.60016 3.41016C12.7402 3.41016 15.2901 5.96016 15.2901 9.10016H15.2702ZM7.35016 15.9402V17.6201C7.35016 17.9401 7.61015 18.1902 7.92015 18.1902H11.2301C11.5501 18.1902 11.8002 17.9301 11.8002 17.6201V15.9402H7.35016ZM11.8202 14.9602C11.8702 14.0902 12.2702 13.2602 12.9102 12.6602C13.9102 11.7302 14.4602 10.4602 14.4602 9.10016C14.4602 6.41016 12.2702 4.21016 9.57016 4.21016C6.87016 4.21016 4.68015 6.40016 4.68015 9.10016C4.68015 10.4602 5.23015 11.7302 6.23015 12.6602C6.87015 13.2602 7.27016 14.1002 7.32016 14.9602V15.1102H11.8102V14.9602H11.8202Z"
                      fill="#231F20" />
                    <path
                      d="M9.58018 0.00976562C9.36018 0.00976562 9.18018 0.189767 9.18018 0.409767V1.53976C9.18018 1.75976 9.36018 1.93977 9.58018 1.93977C9.80018 1.93977 9.98018 1.75976 9.98018 1.53976V0.409767C9.98018 0.189767 9.80018 0.00976562 9.58018 0.00976562Z"
                      fill="#231F20" />
                    <path
                      d="M3.44005 2.54883C3.34005 2.54883 3.23005 2.58882 3.16005 2.66882C3.09005 2.74882 3.04004 2.84882 3.04004 2.94882C3.04004 3.04882 3.08005 3.15883 3.16005 3.22883L3.96005 4.02882C4.12005 4.18882 4.37004 4.18882 4.53004 4.02882C4.61004 3.94882 4.65004 3.84883 4.65004 3.74883C4.65004 3.64883 4.61004 3.53883 4.53004 3.46883L3.73004 2.66882C3.65004 2.58882 3.55004 2.54883 3.45004 2.54883H3.44005Z"
                      fill="#231F20" />
                    <path
                      d="M0.899994 8.69922C0.679994 8.69922 0.5 8.87923 0.5 9.09923C0.5 9.31923 0.679994 9.49922 0.899994 9.49922H2.03C2.25 9.49922 2.42999 9.31923 2.42999 9.09923C2.42999 8.87923 2.25 8.69922 2.03 8.69922H0.899994Z"
                      fill="#231F20" />
                    <path
                      d="M17.1402 8.69922C16.9202 8.69922 16.7402 8.87923 16.7402 9.09923C16.7402 9.31923 16.9202 9.49922 17.1402 9.49922H18.2702C18.4902 9.49922 18.6702 9.31923 18.6702 9.09923C18.6702 8.87923 18.4902 8.69922 18.2702 8.69922H17.1402Z"
                      fill="#231F20" />
                    <path
                      d="M15.44 2.66883L14.64 3.46883C14.56 3.54883 14.52 3.64883 14.52 3.74883C14.52 3.84883 14.56 3.95883 14.64 4.02883C14.79 4.17883 15.06 4.17883 15.21 4.02883L16.01 3.22883C16.09 3.14883 16.13 3.04883 16.13 2.94883C16.13 2.84883 16.09 2.73883 16.01 2.66883C15.85 2.50883 15.6 2.50883 15.44 2.66883Z"
                      fill="#231F20" />
                    <path
                      d="M7.15977 9.33046C7.05977 9.33046 6.94978 9.37046 6.87978 9.45046C6.79978 9.53046 6.75977 9.63046 6.75977 9.73046C6.75977 9.83046 6.79978 9.94046 6.87978 10.0105L7.93977 11.0705C8.09977 11.2305 8.34977 11.2305 8.50977 11.0705L11.9098 7.67046C12.0698 7.51046 12.0698 7.26047 11.9098 7.10047C11.7498 6.94047 11.4998 6.94047 11.3398 7.10047L8.22977 10.2105L7.44977 9.43046C7.36977 9.35046 7.26977 9.31046 7.16977 9.31046L7.15977 9.33046Z"
                      fill="#231F20" />
                  </svg>FAQ</router-link></li>
              <li><router-link to=""><svg width="15" height="19" viewBox="0 0 15 19" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M8.57967 9.7404C9.50198 9.7404 10.2497 8.99272 10.2497 8.0704C10.2497 7.14809 9.50198 6.40039 8.57967 6.40039C7.65735 6.40039 6.90967 7.14809 6.90967 8.0704C6.90967 8.99272 7.65735 9.7404 8.57967 9.7404Z"
                      fill="#231F20" />
                    <path
                      d="M4.96005 6.90054C5.88237 6.90054 6.63005 6.15286 6.63005 5.23055C6.63005 4.30823 5.88237 3.56055 4.96005 3.56055C4.03774 3.56055 3.29004 4.30823 3.29004 5.23055C3.29004 6.15286 4.03774 6.90054 4.96005 6.90054Z"
                      fill="#231F20" />
                    <path
                      d="M9.90974 3.8107C10.8321 3.8107 11.5797 3.06302 11.5797 2.1407C11.5797 1.21839 10.8321 0.470703 9.90974 0.470703C8.98743 0.470703 8.23975 1.21839 8.23975 2.1407C8.23975 3.06302 8.98743 3.8107 9.90974 3.8107Z"
                      fill="#231F20" />
                    <path
                      d="M14.3598 8.78117C14.3598 8.67117 14.3598 8.56117 14.3598 8.45117H11.8198C11.8198 8.56117 11.8398 8.67117 11.8398 8.78117C11.8398 11.1212 9.92981 13.0312 7.58981 13.0312C5.24981 13.0312 3.33981 11.1212 3.33981 8.78117C3.33981 8.67117 3.33982 8.56117 3.35982 8.45117H0.819824C0.819824 8.56117 0.819824 8.67117 0.819824 8.78117C0.819824 12.0812 3.18982 14.8312 6.31982 15.4312V18.8712H8.87982V15.4312C12.0098 14.8312 14.3798 12.0812 14.3798 8.78117H14.3598Z"
                      fill="#231F20" />
                  </svg>
                  About us</router-link></li>
              <li class="has-nested" @click.stop="toggleNestedDropdown">
                <router-link to="">
                  <svg width="17" height="20" viewBox="0 0 17 20" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M14.2297 19.0799H2.92969C1.81969 19.0799 0.929688 18.1799 0.929688 17.0799V16.1999C0.929688 14.0399 1.8397 11.9699 3.4397 10.5199C4.1097 9.91987 5.0997 9.82987 5.8597 10.3199C6.6497 10.8299 7.58969 11.0999 8.58969 11.0999C9.58969 11.0999 10.5297 10.8299 11.3197 10.3199C12.0797 9.82987 13.0697 9.91987 13.7397 10.5199C15.3397 11.9699 16.2497 14.0399 16.2497 16.1999V17.0799C16.2497 18.1899 15.3497 19.0799 14.2397 19.0799H14.2297ZM4.7697 10.6799C4.4497 10.6799 4.12969 10.7999 3.89969 11.0199C2.44969 12.3399 1.61969 14.2199 1.61969 16.1899V17.0699C1.61969 17.7999 2.20969 18.3799 2.92969 18.3799H14.2297C14.9597 18.3799 15.5397 17.7899 15.5397 17.0699V16.1899C15.5397 14.2199 14.7097 12.3499 13.2597 11.0199C12.8197 10.6299 12.1797 10.5699 11.6797 10.8899C10.7797 11.4699 9.6997 11.7799 8.5697 11.7799C7.4397 11.7799 6.3697 11.4699 5.4597 10.8899C5.2597 10.7599 5.00969 10.6799 4.75969 10.6799H4.7697Z"
                      fill="#231F20" stroke="#231F20" stroke-width="0.46" stroke-miterlimit="10" />
                    <path
                      d="M8.57964 9.83015C6.11964 9.83015 4.12963 7.83015 4.11963 5.37015C4.11963 2.91015 6.11964 0.910156 8.57964 0.910156C11.0396 0.910156 13.0296 2.91015 13.0396 5.37015C13.0396 7.83015 11.0396 9.83015 8.57964 9.83015ZM8.57964 1.61015C6.49964 1.61015 4.80963 3.30016 4.80963 5.38016C4.80963 7.46016 6.49964 9.15015 8.57964 9.15015C10.6596 9.15015 12.3496 7.46016 12.3496 5.38016C12.3496 3.30016 10.6596 1.61015 8.57964 1.61015Z"
                      fill="#231F20" stroke="#231F20" stroke-width="0.46" stroke-miterlimit="10" />
                  </svg>
                  User ▸</router-link>
                <!-- Nested Dropdown -->
                <ul class="nested-dropdown" v-show="isNestedDropdownOpen">
                  <li><router-link to="">{{ user.fullname }}</router-link></li>
                 
                </ul>
              </li>
              <li @click="logout"><router-link to=""><svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M7.57986 15.9902C3.41986 15.9902 0.109863 12.6902 0.109863 8.52019C0.109863 5.95019 1.32986 3.62018 3.53986 2.28018C3.90986 2.04018 4.26987 2.16019 4.51987 2.52019C4.76987 2.88019 4.63986 3.25018 4.27986 3.50018C2.56986 4.60018 1.58986 6.44019 1.58986 8.52019C1.58986 11.8202 4.27986 14.5202 7.58986 14.5202C10.8999 14.5202 13.5899 11.8302 13.5899 8.52019C13.5899 6.44019 12.6099 4.60018 10.8999 3.50018C10.5299 3.26018 10.4099 2.77019 10.6599 2.52019C10.8999 2.15019 11.3899 2.03018 11.6399 2.28018C13.7199 3.63018 15.0699 5.95019 15.0699 8.52019C15.0699 12.6802 11.7699 15.9902 7.59987 15.9902H7.57986Z"
                      fill="#231F20" />
                    <path
                      d="M7.58009 8.04092C7.21009 8.04092 6.8501 7.67093 6.8501 7.31093V1.19093C6.8501 0.820933 7.22009 0.460938 7.58009 0.460938C7.94009 0.460938 8.31009 0.830933 8.31009 1.19093V7.31093C8.31009 7.68093 7.94009 8.04092 7.58009 8.04092Z"
                      fill="#231F20" />
                  </svg>
                  Logout
                </router-link>
              </li>
            </ul>
          </div>
          <div class="mocktxt">
            <img src="/images/brain.png" alt="Brain"> Mocks
          </div>

        </div>
      </div>
    </section>
    <transition name="fade">
      <PauseMockModal v-if="showPauseModal" @close="showPauseModal = false" @resume="showPauseModal = false"
        @exit="handleExitMock" />
      </transition>
  </div>
</template>


<script>




import PauseMockModal from './PauseMockModal.vue';
import { mapGetters } from "vuex";

export default {
  components: {
    PauseMockModal
  },

 
  data() {
    return {
      isMainDropdownOpen: false,
      isNestedDropdownOpen: false,
      showPauseModal: false,
      scrollPosition: 0,
      
    }
  },

  computed: {
    ...mapGetters(["user"]), // your getter is named "user"
  },
  methods: {

    logout() {
      localStorage.removeItem("token");
      this.$store.dispatch("user", null);
      this.$router.push("/");
    },
    toggleMainDropdown() {
      this.isMainDropdownOpen = !this.isMainDropdownOpen;
      if (this.isMainDropdownOpen) {
        document.addEventListener('click', this.handleOutsideClick);
      }
    },
    toggleNestedDropdown() {
      this.isNestedDropdownOpen = !this.isNestedDropdownOpen;
    },
    // handleOutsideClick(event) {
    //   if (!this.$refs.dropdown.contains(event.target)) {
    //     this.isMainDropdownOpen = false;
    //     document.removeEventListener('click', this.handleOutsideClick);
    //   }
    // },

    handleOutsideClick(event) {
      const dropdown = this.$refs.dropdown;
      if (dropdown && !dropdown.contains(event.target)) {
        this.isMainDropdownOpen = false;
        document.removeEventListener('click', this.handleOutsideClick);
      }
    },

    handleExitMock() {
      this.showPauseModal = false;
      this.$router.push('/mocksection');
    },
    lockBodyScroll() {
      this.scrollPosition = window.pageYOffset;
      document.body.classList.add('body-scroll-lock');
      document.body.style.top = `-${this.scrollPosition}px`;
    },

    unlockBodyScroll() {
      document.body.classList.remove('body-scroll-lock');
      window.scrollTo(0, this.scrollPosition);
      document.body.style.top = '';
    },
  },
  watch: {
    showPauseModal(newVal) {
      if (newVal) {
        this.lockBodyScroll();
      } else {
        this.unlockBodyScroll();
      }
    }
  },
  beforeUnmount() {
    if (this.showPauseModal) {
      this.unlockBodyScroll();
    }
  }
}

</script>



<style scoped>

.fade-enter-active {
  animation: pure-fade-in 0.3s !important;
}

.fade-leave-active {
  animation: pure-fade-out 0.3s !important;
}


.header-icon-wrapper {
  display: flex;
  align-items: center;
  padding: 5px 0px 0px 0px;
}

.hamburger-icon {
  height: 100%;
  position: relative;
}

.hamburger-icon svg {
  width: 24px;
  height: 24px;
  color: #fff;
  cursor: pointer;
}

.hamburger-icon span {
  position: absolute;
  width: auto;
  top: -24px;
  font-size: 11px;
  background-color: #9DED6C;
  padding: 3px 6px;
  border-radius: 6px;
  color: #000000;
  left: 10px;
  visibility: hidden;
  opacity: 0;
}


.hamburger-icon span::before {
  position: absolute;
  content: "";
  background: #9DED6C;
  width: 10px;
  height: 10px;
  bottom: -9px;
  clip-path: polygon(0 0, 0% 100%, 100% 0);
}

.hamburger-icon:hover span {
  visibility: visible;
  opacity: 1;
}

.mockhead-hamburger {
  position: relative;
  display: inline-block;
}

.main-dropdown {
  display: none;
  position: absolute;
  top: 100%;
  left: 0;
  background: white;
  min-width: 200px;
  box-shadow: 0 0px 9px 1px #00000080;
  padding: 10px 0;
  z-index: 1000;
  border-radius: 20px;
  border: 0.31px solid #8698A2;
}

/* Hover Effects */
.mockhead-hamburger:hover .main-dropdown {
  display: block;
}

.has-nested {
  position: relative;
}

.nested-dropdown {
  display: none;
  position: absolute;
  left: 100%;
  top: 0;
  background: #f8f8f8;
  min-width: 160px;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
}

.has-nested:hover .nested-dropdown {
  display: block;
}

/* Link Styling */
.main-dropdown li {
  padding: 8px 15px;
  position: relative;
  font-family: Helvetica;
}

.main-dropdown li a {
  color: #000;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 500;
  font-family: Helvetica;
}

.main-dropdown li a:hover {
  color: #ed1c24;
}

.nested-dropdown li {
  padding: 8px 15px;
  white-space: nowrap;
  color: #000;
  list-style: none;
  cursor: pointer;
}



/* 
.slide-modal-enter-active {
  animation: slide-in 0.3s ease-out;
}

.slide-modal-leave-active {
  animation: slide-out 0.3s ease-in;
} */

/* @keyframes slide-in {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes slide-out {
  from {
    transform: translateY(0);
    opacity: 1;
  }

  to {
    transform: translateY(-100%);
    opacity: 0;
  }
} */
</style>