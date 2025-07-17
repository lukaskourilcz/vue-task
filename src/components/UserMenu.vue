<template>
  <div class="user-menu">
    <button class="username" @click="$emit('toggle-menu')">
      {{ user.name }}
    </button>
    <div v-if="isMenuOpen" class="dropdown">
      <p>{{ user.email }}</p>
      <button class="logout-btn">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface UserData {
  name: string;
  email: string;
}

defineProps<{
  user: UserData;
  isMenuOpen: boolean;
}>();
defineEmits<{
  (e: 'toggle-menu'): void;
}>();
</script>

<style scoped lang="css">
.user-menu {
  position: relative;
  text-align: right;
}

.username {
  background: none;
  border: none;
  color: #1e90ff;
  cursor: pointer;
  font-size: 1rem;
  padding: 5px;
}

.username:hover {
  text-decoration: underline;
}

.dropdown {
  position: absolute;
  right: 0;
  top: 100%;
  width: 200px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  z-index: 10;
}

.dropdown p {
  margin: 0 0 10px;
  color: #333;
}

.logout-btn {
  width: 100%;
  padding: 5px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.logout-btn:hover {
  background: #cc0000;
}
</style>