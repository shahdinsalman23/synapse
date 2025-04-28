<template>
  <header class="header-main">
    <div class="container-fluid">
      <div class="row">
        <div class="header-left">
          <!-- <div class="header-left-logo">
            <img src="/images/logo.png" alt="Logo" />
          </div> -->
        </div>
        
        <!-- Desktop Navigation -->
        <div class="header-right desktop-nav">
          <nav class="nav-items">
            <ul>
              <li v-for="(item, index) in navItems" :key="item.text">
                <router-link :to="item.path">{{ item.text }}</router-link>
                <span class="pipeline" v-if="index !== navItems.length - 1"></span>
              </li>
            </ul>
          </nav>
        </div>

        <!-- Mobile Hamburger -->
        <div class="mobile-nav">
          <button 
            class="hamburger" 
            @click="toggleSidebar"
            aria-label="Toggle navigation"
          >
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <div 
      class="sidebar"
      :class="{ 'sidebar-open': isSidebarOpen }"
    >
      <div class="sidebar-header">
        <img src="/images/logo.png" alt="Logo" class="sidebar-logo" />
        <button class="close-btn" @click="toggleSidebar">&times;</button>
      </div>
      <nav class="sidebar-nav">
        <ul>
          <li 
            v-for="item in navItems" 
            :key="item.text"
            @click="toggleSidebar"
          >
            <router-link :to="item.path">{{ item.text }}</router-link>
          </li>
        </ul>
      </nav>
    </div>

    <!-- Overlay -->
    <div 
      class="overlay"
      :class="{ 'overlay-active': isSidebarOpen }"
      @click="toggleSidebar"
    ></div>
  </header>
</template>

<script>
export default {
  name: "HeaderComponent",
  data() {
    return {
      isSidebarOpen: false,
      navItems: [
        { text: 'About MLA', path: '/' },
        { text: 'Why choose us', path: '/' },
        { text: 'FAQ', path: '/' },
        { text: 'Free trial', path: '/' },
        { text: 'About us', path: '/' }
      ]
    }
  },
  methods: {
    toggleSidebar() {
      this.isSidebarOpen = !this.isSidebarOpen;
    }
  }
};
</script>

<style scoped>


.header-main {
  position: relative;
}

/* Desktop Navigation */
.desktop-nav .nav-items ul {
  display: flex;
  align-items: center;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.desktop-nav .nav-items li {
  position: relative;
  display: flex;
  align-items: center;
}

.pipeline {
  width: 1px;
  height: 17px;
  background: #F1F2F2;
  margin-left: 1rem;
}

/* Mobile Navigation */
.mobile-nav {
  display: none;
}

.hamburger {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
}

.hamburger .bar {
  width: 25px;
  height: 3px;
  background: #fff;
  margin: 4px 0;
  transition: 0.3s;
}

/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  left: -100%;
  width: 280px;
  height: 100vh;
  background: #fff;
  z-index: 1000;
  transition: 0.3s;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
}

.sidebar-open {
  left: 0;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;
  margin: 0px 0px 40px 0px;
}

.sidebar-logo {
  height: 40px;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  padding: 0 0.5rem;
}

.sidebar-nav ul {
  list-style: none;
  margin: 0;
}

.sidebar-nav li {
  margin: 0.5rem 0;
  padding: 15px 0px;
  transition: all .6s ease;
}

.sidebar-nav a {
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
  transition: all .5s ease;
}

.sidebar-nav ul li:hover {
   background: #8698a2; 
}

.sidebar-nav ul li:hover a{
   color: #fff; 
}

/* Overlay */
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.5);
  z-index: 999;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}

.overlay-active {
  opacity: 1;
  visibility: visible;
}

/* Responsive Styles */
@media (max-width: 786px) {
  .desktop-nav {
    display: none;
  }

  .mobile-nav {
    display: block;
    margin-left: auto;
  }
}
</style>