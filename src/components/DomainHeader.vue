<template>
  <div class="header">
    <h1>{{ fqdn }}</h1>
    <label class="verbose-toggle">
      <input 
        type="checkbox" 
        :value="isVerbose" 
        @input="$emit('update:isVerbose', ($event.target as HTMLInputElement).checked)" 
        @change="$emit('toggle-verbose')" 
      />
      <span>Verbose view</span>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  fqdn: string;
  isVerbose: boolean;
}>();
defineEmits<{
  (e: 'toggle-verbose'): void;
  (e: 'update:isVerbose', value: boolean): void;
}>();
</script>

<style scoped lang="css">
.header {
  margin-bottom: 20px;
}

h1 {
  font-size: 2rem;
  color: #333;
}

.verbose-toggle {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
}

.verbose-toggle input {
  width: 20px;
  height: 20px;
}
</style>