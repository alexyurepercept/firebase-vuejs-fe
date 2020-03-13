import { shallowMount } from '@vue/test-utils';
import LoginComponent from '@/components/Login.vue';
import Vue from 'vue';

describe('LoginComponent', () => {
  it('should be able to login', async () => {
    let submitMock = jest.fn();
    const wrapper = shallowMount(LoginComponent, {
      methods: {
        submit: submitMock,
      },
      attachToDocument: true,
    });

    let emailInput = wrapper.find('input#email');
    let passwordInput = wrapper.find('input#password');
    expect(wrapper.vm.form.email).toEqual('');
    expect(wrapper.vm.form.password).toEqual('');
    emailInput.setValue('test@test.com');
    passwordInput.setValue('password');

    expect(wrapper.vm.form.email).toEqual('test@test.com');
    expect(wrapper.vm.form.password).toEqual('password');
    wrapper.find('button').trigger('click');
    expect(submitMock).toHaveBeenCalledTimes(1);
  });
});
