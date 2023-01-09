import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useReducer, useState } from 'react';
import PageTitle from '../components/PageTitle';
import PageContainer from '../components/PageContainer';
import Input from '../components/Input';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { validateInput } from '../utils/actions/formActions';
import { reducer } from '../utils/reducers/formReducer';
import { useDispatch, useSelector } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import colors from '../constants/colors';
import SubmitButton from '../components/SubmitButton';
import { updateSignInUserData, userLogout } from '../utils/actions/authActions';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);

  const initialState = {
    inputValues: {
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      about: userData.about || '',
    },
    inputValidities: {
      firstName: undefined,
      lastName: undefined,
      email: undefined,
      about: undefined,
    },
    formIsValid: undefined,
  };

  const [formState, dispatchFormState] = useReducer(reducer, initialState);

  const inputChangeHandler = useCallback(
    async (inputId, inputValue) => {
      const result = validateInput(inputId, inputValue);

      dispatchFormState({
        inputId,
        validationResult: result,
        inputValue,
      });
    },
    [dispatchFormState]
  );

  const saveHandler = async () => {
    const updatedValues = formState.inputValues;

    try {
      setIsLoading(true);
      await updateSignInUserData(userData.userId, updatedValues);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer>
      <PageTitle text="Settings" />
      <ScrollView>
        <Input
          id="firstName"
          label="First name"
          icon="user-o"
          IconPack={FontAwesome}
          errorText={formState.inputValidities.firstName}
          onInputChange={inputChangeHandler}
          autoCapitalize="none"
          initialValue={userData.firstName}
        />
        <Input
          id="lastName"
          label="Last name"
          icon="user-o"
          IconPack={FontAwesome}
          errorText={formState.inputValidities.lastName}
          onInputChange={inputChangeHandler}
          autoCapitalize="none"
          initialValue={userData.lastName}
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
          initialValue={userData.email}
        />
        <Input
          id="about"
          label="About"
          icon="user-o"
          IconPack={FontAwesome}
          errorText={formState.inputValidities.about}
          onInputChange={inputChangeHandler}
          autoCapitalize="none"
          initialValue={userData.about}
        />

        {isLoading ? (
          <ActivityIndicator
            size={'small'}
            color={colors.primary}
            style={{ marginTop: 15 }}
          />
        ) : (
          <SubmitButton
            title="Save"
            onPress={saveHandler}
            style={{ marginTop: 20 }}
            disabled={!formState.formIsValid}
          />
        )}

        <SubmitButton
          title="Logout"
          onPress={() => dispatch(userLogout())}
          style={{ marginTop: 20 }}
          color={colors.red}
        />
      </ScrollView>
    </PageContainer>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
