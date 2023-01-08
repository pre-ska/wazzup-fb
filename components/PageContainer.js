import { StyleSheet, View } from 'react-native';
import React from 'react';

const PageContainer = ({ children, style }) => (
  <View style={{ ...styles.container, ...style }}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: 'white',
  },
});

export default PageContainer;
