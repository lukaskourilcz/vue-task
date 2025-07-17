<template>
  <div class="app-container">
    <!-- Header with domain and toggle -->
    <DomainHeader 
      :fqdn="domainData.fqdn" 
      :isVerbose="isVerbose" 
      @update:isVerbose="isVerbose = $event"
      @toggle-verbose="toggleVerbose" 
    />
    
    <!-- Main content: two columns -->
    <div class="main-content">
      <!-- Left column: Domain details -->
      <div class="details-column">
        <DomainDetails 
          :data="domainData" 
          :isVerbose="isVerbose" 
          :showPassword="showPassword" 
          @update:showPassword="showPassword = $event"
          @toggle-password="togglePassword" 
        />
      </div>
      
      <!-- Right column: User info -->
      <div class="user-column">
        <UserMenu :user="userData" :isMenuOpen="isMenuOpen" @toggle-menu="toggleMenu" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import DomainHeader from './components/DomainHeader.vue';
import DomainDetails from './components/DomainDetails.vue';
import UserMenu from './components/UserMenu.vue';

// Define interfaces for JSON structure
interface DomainData {
  fqdn: string;
  sponsoring_registrar: string;
  expires_at: string;
  state_flags: { flags: Array<{ name: string; active: boolean; description: string }> };
  authInfo: string;
  nsset: { dns: Array<{ name: string; ip_address: string }> };
  keyset: { dns_keys: string[] };
  owner: { name: string; organization: string; publish: { organization: boolean; name: boolean } };
  administrative_contacts: Array<{ handle: string; name: string; organization: string; publish: { organization: boolean; name: boolean } }>;
  events: { registered?: { timestamp: string }; transferred?: { timestamp: string }; updated?: { timestamp: string } };
}

interface UserData {
  name: string;
  email: string;
}

// Reactive state
const domainData = ref<DomainData>({} as DomainData);
const isVerbose = ref<boolean>(false);
const showPassword = ref<boolean>(false);
const isMenuOpen = ref<boolean>(false);
const userData = ref<UserData>({ name: '', email: '' });

// Fetch JSON data
onMounted(async () => {
  try {
    const response = await axios.get('/domain-detail.json');
    domainData.value = { ...response.data, authInfo: 'secret123' }; // Add placeholder authInfo
    userData.value = {
      name: response.data.owner.name,
      email: 'vzoromil@neviditelna-univerzita.cz', // Assumed email
    };
  } catch (error) {
    console.error('Failed to load domain data:', error);
  }
});

// Toggle verbose mode
const toggleVerbose = (): void => {
  isVerbose.value = !isVerbose.value;
};

// Toggle password visibility
const togglePassword = (): void => {
  showPassword.value = !showPassword.value;
};

// Toggle user menu
const toggleMenu = (): void => {
  isMenuOpen.value = !isMenuOpen.value;
};
</script>

<style scoped lang="css">
.app-container {
  min-height: 100vh;
  background-color: #f4f4f4;
  padding: 20px;
}

.main-content {
  display: flex;
  gap: 20px;
}

.details-column, .user-column {
  background: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.details-column {
  flex: 2;
}

.user-column {
  flex: 1;
}

/* Stack columns on small screens */
@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }
}
</style>