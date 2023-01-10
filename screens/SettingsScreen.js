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
import {
  updateSignedInUserData,
  userLogout,
} from '../utils/actions/authActions';
import { updateSignedInUserDataAction } from '../store/authSlice';
import ProfileImage from '../components/ProfileImage';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const firstName = userData.firstName || '';
  const lastName = userData.lastName || '';
  const email = userData.email || '';
  const about = userData.about || '';

  const initialState = {
    inputValues: {
      firstName,
      lastName,
      email,
      about,
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

  const saveHandler = useCallback(async () => {
    const updatedValues = formState.inputValues;

    try {
      setIsLoading(true);
      await updateSignedInUserData(userData.userId, updatedValues);

      dispatch(updateSignedInUserDataAction({ newData: updatedValues }));
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [formState, dispatch]);

  const hasChanges = () => {
    const currentValues = formState.inputValues;

    return (
      currentValues.firstName != firstName ||
      currentValues.lastName != lastName ||
      currentValues.email != email ||
      currentValues.about != about
    );
  };

  return (
    <PageContainer>
      <PageTitle text="Settings" />

      <ScrollView contentContainerStyle={styles.formContainer}>
        <ProfileImage
          size={80}
          userId={userData.userId}
          uri={userData.profilePicture}
        />

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

        <View style={{ marginTop: 20 }}>
          {showSuccessMessage && <Text>Saved</Text>}
          {isLoading ? (
            <ActivityIndicator
              size={'small'}
              color={colors.primary}
              style={{ marginTop: 15 }}
            />
          ) : (
            hasChanges() && (
              <SubmitButton
                title="Save"
                onPress={saveHandler}
                style={{ marginTop: 20 }}
                disabled={!formState.formIsValid}
              />
            )
          )}
        </View>

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
  formContainer: {
    alignItems: 'center',
  },
});
