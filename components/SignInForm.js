import { StyleSheet } from 'react-native';
import React from 'react';
import { Feather } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from '../components/SubmitButton';

const SignInForm = () => {
  return (
    <>
      <Input
        label="Email"
        icon="mail"
        IconPack={Feather}
        errorText="this is an error"
      />
      <Input
        label="Password"
        icon="lock"
        IconPack={Feather}
        errorText="this is an error"
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
