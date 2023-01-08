import React, { useCallback, useReducer } from 'react';
import { Feather } from '@expo/vector-icons';

import Input from './Input';
import SubmitButton from '../components/SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';

const initialState = {
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignInForm = () => {
  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);
      dispatchFormState({
        inputId,
        validationResult: result,
      });
    },
    [dispatchFormState]
  );

  return (
    <>
      <Input
        id="email"
        label="Email"
        icon="mail"
        IconPack={Feather}
        errorText={formState.inputValidities.email}
        autoCapitalize="none"
        keyboardType="email-address"
        onInputChange={inputChangeHandler}
      />
      <Input
        id="password"
        label="Password"
        icon="lock"
        IconPack={Feather}
        errorText={formState.inputValidities.password}
        autoCapitalize="none"
        secureTextEntry
        onInputChange={inputChangeHandler}
      />

      <SubmitButton
        title="Sign in"
        onPress={() => console.log('button pressed')}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignInForm;
