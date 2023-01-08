import 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ChatListScreen from './screens/ChatListScreen';
import ChatSettingsScreen from './screens/ChatSettingsScreen';
import SettingsScreen from './screens/SettingsScreen';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerTitle: '' }}>
      <Tab.Screen
        name="Chat List"
        component={ChatListScreen}
        options={{
          tabBarLabel: 'Chats',
          // tabBarIcon: ({ color, size }) => {}
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          // tabBarIcon: ({ color, size }) => {}
        }}
      />
    </Tab.Navigator>
  );
};

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    const prepare = async () => {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({
          black: require('./assets/fonts//Roboto-Black.ttf'),
          blackItalic: require('./assets/fonts/Roboto-BlackItalic.ttf'),
          bold: require('./assets/fonts/Roboto-Bold.ttf'),
          boldItalic: require('./assets/fonts/Roboto-BoldItalic.ttf'),
          italic: require('./assets/fonts/Roboto-Italic.ttf'),
          light: require('./assets/fonts/Roboto-Light.ttf'),
          lightItalic: require('./assets/fonts/Roboto-LightItalic.ttf'),
          medium: require('./assets/fonts/Roboto-Medium.ttf'),
          mediumItalic: require('./assets/fonts/Roboto-MediumItalic.ttf'),
          regular: require('./assets/fonts/Roboto-Regular.ttf'),
          thin: require('./assets/fonts/Roboto-Thin.ttf'),
          thinItalic: require('./assets/fonts/Roboto-ThinItalic.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    };

    prepare();
  }, []);

  const onLayout = useCallback(async () => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) return null;

  return (
    <SafeAreaProvider style={styles.container} onLayout={onLayout}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={TabNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ChatSettings"
            component={ChatSettingsScreen}
            options={{
              headerTitle: 'Settings',
              headerBackTitle: 'aaaaa',
              headerBackTitleVisible: true,
            }}
          />
        </Stack.Navigator>
        {/* <StatusBar style="auto" /> */}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  label: {
    color: 'black',
    fontSize: 18,
    fontFamily: 'regular',
  },
});
