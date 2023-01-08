import { StyleSheet } from 'react-native';
import React from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from '../components/SubmitButton';

const SignUpForm = () => {
  return (
    <>
      <Input
        label="First name"
        icon="user-o"
        IconPack={FontAwesome}
        errorText="this is an error"
      />
      <Input
        label="Last name"
        icon="user-o"
        IconPack={FontAwesome}
        errorText="this is an error"
      />
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
        title="Sign up"
        onPress={() => console.log('button pressed')}
        style={{ marginTop: 20 }}
      />
    </>
  );
};

export default SignUpForm;
