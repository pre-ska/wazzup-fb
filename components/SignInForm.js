import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import Input from './Input';
import SubmitButton from '../components/SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signIn } from '../utils/actions/authActions';

const initialState = {
  inputValues: {
    email: '',
    password: '',
  },
  inputValidities: {
    email: false,
    password: false,
  },
  formIsValid: false,
};

const SignInForm = () => {
  const dispatch = useDispatch();

  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
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
      Alert.alert('An error occurred', error, [{ text: 'Ok' }]);
    }
  }, [error]);

  const authHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      const action = signIn(
        formState.inputValues.email,
        formState.inputValues.password
      );
      dispatch(action);
      setError(null);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }, [dispatch, formState]);

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
        onPress={authHandler}
        style={{ marginTop: 20 }}
        disabled={!formState.formIsValid}
      />
    </>
  );
};

export default SignInForm;
