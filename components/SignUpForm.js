import React from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from '../components/SubmitButton';
import { validateInput } from '../utils/actions/formActions';

const SignUpForm = () => {
  const inputChangeHandler = (inputId, inputValue) => {
    validateInput(inputId, inputValue);
  };

  return (
    <>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        IconPack={FontAwesome}
        errorText="this is an error"
        onInputChange={inputChangeHandler}
        autoCapitalize="none"
      />
      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        IconPack={FontAwesome}
        errorText="this is an error"
        onInputChange={inputChangeHandler}
        autoCapitalize="none"
      />
      <Input
        id="email"
        label="Email"
        icon="mail"
        IconPack={Feather}
        errorText="this is an error"
        onInputChange={inputChangeHandler}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        autoCapitalize="none"
        secureTextEntry
        IconPack={Feather}
        errorText="this is an error"
        onInputChange={inputChangeHandler}
      />

      <SubmitButton
        title="Sign up"
        onPress={() => console.log('button pressed')}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUpForm;
