import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import colors from '../constants/colors';

const SubmitButton = ({ disabled, color, title, onPress, style }) => {
  const enabledBgColor = color || colors.primary;
  const disabledBgColor = colors.lightGray;
  const bgColor = disabled ? disabledBgColor : enabledBgColor;

  return (
    <TouchableOpacity
      onPress={disabled ? () => {} : onPress}
      style={{
        ...styles.button,
        ...style,
        ...{ backgroundColor: bgColor },
      }}
    >
      <Text
        style={{
          color: disabled ? colors.gray : 'white',
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default SubmitButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
