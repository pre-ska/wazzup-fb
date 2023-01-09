import React, { useCallback, useEffect, useReducer, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { ActivityIndicator, Alert } from 'react-native';
import { useDispatch } from 'react-redux';

import Input from './Input';
import SubmitButton from '../components/SubmitButton';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { signIn } from '../utils/actions/authActions';
import colors from '../constants/colors';

const isTestMode = true;

const initialState = {
  inputValues: {
    email: isTestMode ? 'aaa@aaa.com' : '',
    password: isTestMode ? 'aaaaaa' : '',
  },
  inputValidities: {
    email: isTestMode,
    password: isTestMode,
  },
  formIsValid: isTestMode,
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
      setError(null);
      await dispatch(action);
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
        initialValue={formState.inputValues.email}
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
        initialValue={formState.inputValues.password}
      />

      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.primary}
          style={{ marginTop: 15 }}
        />
      ) : (
        <SubmitButton
          title="Sign in"
          onPress={authHandler}
          style={{ marginTop: 20 }}
          disabled={!formState.formIsValid}
        />
      )}
    </>
  );
};

export default SignInForm;
