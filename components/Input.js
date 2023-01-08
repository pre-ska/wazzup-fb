import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';
import { FontAwesome } from '@expo/vector-icons';

import colors from '../constants/colors';

const Input = ({ label, icon, size = 15, IconPack, errorText }) => (
  <View style={styles.container}>
    <Text style={styles.label}>{label}</Text>

    <View style={styles.inputContainer}>
      {icon && <IconPack name={icon} size={size} style={styles.icon} />}
      <TextInput style={styles.input} />
    </View>

    {errorText && (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{errorText}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    marginVertical: 8,
    fontFamily: 'bold',
    letterSpacing: 0.3,
    color: colors.textColor,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 2,
    backgroundColor: colors.nearlyWhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
    color: colors.gray,
  },
  input: {
    color: colors.textColor,
    flex: 1,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    paddingTop: 0,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    fontFamily: 'regular',
    letterSpacing: 0.3,
  },
});

export default Input;
