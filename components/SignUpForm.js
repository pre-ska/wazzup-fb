import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from '../components/SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signUp } from '../utils/actions/authActions';
import { Alert } from 'react-native';

const initialState = {
  inputValues: {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  },
  inputValidities: {
    firstName: false,
    lastName: false,
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignUpForm = () => {
  const [error, setError] = useState();
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState]
  );

  useEffect(() => {
    if (error) {
      Alert.alert('An error occurred', error, [{ text: 'Okey' }]);
    }
  }, [error]);

  const authHandler = async () => {
    try {
      await signUp(
        formState.inputValues.firstName,
        formState.inputValues.lastName,
        formState.inputValues.email,
        formState.inputValues.password
      );

      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <>
      <Input
        id="firstName"
        label="First name"
        icon="user-o"
        IconPack={FontAwesome}
        errorText={formState.inputValidities.firstName}
        onInputChange={inputChangeHandler}
        autoCapitalize="none"
      />
      <Input
        id="lastName"
        label="Last name"
        icon="user-o"
        IconPack={FontAwesome}
        errorText={formState.inputValidities.lastName}
        onInputChange={inputChangeHandler}
        autoCapitalize="none"
      />
      <Input
        id="email"
        label="Email"
        icon="mail"
        IconPack={Feather}
        errorText={formState.inputValidities.email}
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
        errorText={formState.inputValidities.password}
        onInputChange={inputChangeHandler}
      />

      <SubmitButton
        title="Sign up"
        onPress={authHandler}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignUpForm;
