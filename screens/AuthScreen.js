import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native';

import PageContainer from '../components/PageContainer';
import SignInForm from '../components/SignInForm';
import SignUpForm from '../components/SignUpForm';
import colors from '../constants/colors';
import logo from '../assets/images/logo.png';
import { ScrollView } from 'react-native-gesture-handler';

const AuthScreen = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <PageContainer>
        <ScrollView>
          <KeyboardAvoidingView
            style={styles.keyboardAvoidingView}
            behavior={Platform.OS === 'ios' ? height : undefined}
            keyboardVerticalOffset={100}
          >
            <View style={styles.imageContainer}>
              <Image source={logo} style={styles.image} />
            </View>

            {isSignUp ? <SignUpForm /> : <SignInForm />}

            <TouchableOpacity
              onPress={() => setIsSignUp((prev) => !prev)}
              style={styles.linkContainer}
            >
              <Text style={styles.link}>{`Switch to ${
                isSignUp ? 'sign in' : 'sign up'
              }`}</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </ScrollView>
      </PageContainer>
    </SafeAreaView>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({
  linkContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  link: {
    color: colors.blue,
    fontFamily: 'medium',
    letterSpacing: 0.3,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '50%',
    resizeMode: 'contain',
  },
  keyboardAvoidingView: {
    flex: 1,
    justifyContent: 'center',
  },
});
