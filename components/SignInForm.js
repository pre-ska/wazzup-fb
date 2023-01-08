import React from 'react';
import { Feather } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from '../components/SubmitButton';
import { validateInput } from '../utils/actions/formActions';

const SignInForm = () => {
  const inputChangeHandler = (inputId, inputValue) => {
    validateInput(inputId, inputValue);
  };

  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="mail"
        IconPack={Feather}
        errorText="this is an error"
        autoCapitalize="none"
        keyboardType="email-address"
        onInputChange={inputChangeHandler}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        IconPack={Feather}
        errorText="this is an error"
        autoCapitalize="none"
        secureTextEntry
        onInputChange={inputChangeHandler}
      />

      <SubmitButton
        title="Sign in"
        onPress={() => console.log('button pressed')}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignInForm;
