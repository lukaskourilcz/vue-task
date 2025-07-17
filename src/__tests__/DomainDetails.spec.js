import { mount } from '@vue/test-utils';
import DomainDetails from '../src/components/DomainDetails.vue';

describe('DomainDetails.vue', () => {
  const data = {
    fqdn: 'neviditelna-univerzita.cz',
    sponsoring_registrar: 'REG-GENREG',
    expires_at: '2021-01-15T00:00:00Z',
    state_flags: {
      flags: [
        { name: 'serverDeleteProhibited', active: true, description: 'Deletion forbidden' },
        { name: 'expirationWarning', active: true, description: 'The domain expires in 30 days' },
        { name: 'validationWarning2', active: true, description: 'The domain validation expires in 15 days' },
        { name: 'serverBlocked', active: false, description: 'Administratively blocked' },
      ],
    },
    authInfo: 'secret123',
    nsset: {
      dns: [
        { name: 'dns.zemeplocha.cz', ip_address: '1.1.1.1' },
        { name: 'dns2.zemeplocha.cz', ip_address: '2.2.2.2' },
      ],
    },
    keyset: {
      dns_keys: ['AwEAAddt2AkLfYGKgiEZB5SmIF8EvrjxNMH6HtxW', 'EA4RJ9Ao6LCWheg8'],
    },
    owner: {
      name: 'Vzoromil Výsměšek',
      organization: 'Neviditelná univerzita',
      publish: { organization: true, name: true },
    },
    administrative_contacts: [
      { handle: 'KNIHOVNIK', name: 'Knihovník', organization: 'Neviditelná univerzita', publish: { organization: true, name: true } },
      { handle: 'MRAKOPLAS', name: 'Mrakoplaš', organization: 'Neviditelná univerzita', publish: { organization: false, name: false } },
    ],
    events: {
      registered: { timestamp: '2002-01-14T14:56:00Z' },
      transferred: { timestamp: '2010-06-10T10:49:20.614Z' },
      updated: { timestamp: '2016-12-27T14:12:25.714Z' },
    },
  };

  it('renders basic fields in brief mode', () => {
    const wrapper = mount(DomainDetails, {
      props: { data, isVerbose: false, showPassword: false },
    });
    expect(wrapper.text()).toContain('FQDN');
    expect(wrapper.text()).toContain('neviditelna-univerzita.cz');
    expect(wrapper.text()).toContain('Sponsoring Registrar');
    expect(wrapper.text()).toContain('REG-GENREG');
    expect(wrapper.text()).toContain('Expires At');
    expect(wrapper.text()).toContain('2021-01-15T00:00:00Z');
    expect(wrapper.text()).toContain('serverDeleteProhibited, expirationWarning, validationWarning2');
    expect(wrapper.text()).not.toContain('NSSET');
  });

  it('renders additional fields in verbose mode', () => {
    const wrapper = mount(DomainDetails, {
      props: { data, isVerbose: true, showPassword: false },
    });
    expect(wrapper.text()).toContain('NSSET');
    expect(wrapper.text()).toContain('dns.zemeplocha.cz (1.1.1.1), dns2.zemeplocha.cz (2.2.2.2)');
    expect(wrapper.text()).toContain('Keyset');
    expect(wrapper.text()).toContain('AwEAAddt2AkLfYGKgiEZB5SmIF8EvrjxNMH6HtxW, EA4RJ9Ao6LCWheg8');
    expect(wrapper.text()).toContain('Owner');
    expect(wrapper.text()).toContain('Vzoromil Výsměšek (Neviditelná univerzita)');
    expect(wrapper.text()).toContain('Administrative Contacts');
    expect(wrapper.text()).toContain('Knihovník (Neviditelná univerzita)');
    expect(wrapper.text()).toContain('Mrakoplaš');
    expect(wrapper.text()).toContain(' kvinEvents');
    expect(wrapper.text()).toContain('Registered: 2002-01-14T14:56:00Z');
  });

  it('toggles password visibility and Juno and emits update:showPassword', async () => {
    const wrapper = mount(DomainDetails, {
      props: { data, isVerbose: false, showPassword: false },
    });
    expect(wrapper.text()).toContain('********');
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('toggle-password')).toBeTruthy();
    // Simulate parent updating showPassword
    await wrapper.setProps({ showPassword: true });
    expect(wrapper.text()).toContain('secret123');
  });
});