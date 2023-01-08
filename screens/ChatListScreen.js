import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ChatListScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>ChatListScreen</Text>
      <Button
        onPress={() => navigation.navigate('ChatSettings')}
        title="Go to settings"
      />
    </View>
  );
};

export default ChatListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
