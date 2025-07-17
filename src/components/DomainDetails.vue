<template>
  <div>
    <h2>Domain Details</h2>
    <table>
      <tr>
        <td>FQDN</td>
        <td>{{ data.fqdn }}</td>
      </tr>
      <tr>
        <td>Sponsoring Registrar</td>
        <td>{{ data.sponsoring_registrar }}</td>
      </tr>
      <tr>
        <td>Expires At</td>
        <td>{{ data.expires_at }}</td>
      </tr>
      <tr>
        <td>Active State Flags</td>
        <td>
          {{ data.state_flags?.flags
            .filter(flag => flag.active)
            .map(flag => flag.name)
            .join(', ') }}
        </td>
      </tr>
      <tr>
        <td>AuthInfo</td>
        <td>
          <span v-if="showPassword">{{ data.authInfo }}</span>
          <span v-else>********</span>
          <button @click="$emit('toggle-password')">
            {{ showPassword ? 'Hide' : 'Show' }}
          </button>
        </td>
      </tr>
      <tr v-if="isVerbose">
        <td>NSSET</td>
        <td>
          {{ data.nsset?.dns.map(dns => `${dns.name} (${dns.ip_address})`).join(', ') }}
        </td>
      </tr>
      <tr v-if="isVerbose">
        <td>Keyset</td>
        <td>{{ data.keyset?.dns_keys.join(', ') }}</td>
      </tr>
      <tr v-if="isVerbose">
        <td>Owner</td>
        <td>
          {{ data.owner?.name }}
          <span v-if="data.owner?.publish.organization">({{ data.owner.organization }})</span>
        </td>
      </tr>
      <tr v-if="isVerbose">
        <td>Administrative Contacts</td>
        <td>
          <div v-for="contact in data.administrative_contacts" :key="contact.handle">
            {{ contact.name }}
            <span v-if="contact.publish.name && contact.publish.organization">
              ({{ contact.organization }})
            </span>
          </div>
        </td>
      </tr>
      <tr v-if="isVerbose">
        <td>Events</td>
        <td>
          Registered: {{ data.events?.registered?.timestamp }}<br />
          Transferred: {{ data.events?.transferred?.timestamp || 'N/A' }}<br />
          Updated: {{ data.events?.updated?.timestamp || 'N/A' }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
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

defineProps<{
  data: DomainData;
  isVerbose: boolean;
  showPassword: boolean;
}>();
defineEmits<{
  (e: 'toggle-password'): void;
  (e: 'update:showPassword', value: boolean): void;
}>();
</script>

<style scoped lang="css">
h2 {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

td {
  padding: 8px;
  border: 1px solid #ccc;
}

td:first-child {
  font-weight: bold;
  width: 30%;
}

button {
  margin-left: 10px;
  padding: 5px 10px;
  background: #1e90ff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

button:hover {
  background: #4682b4;
}
</style>