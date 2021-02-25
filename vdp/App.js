import Main from './components/Main.js';
import { NavigationContainer } from '@react-navigation/native';

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
export default function App() {
  return (
    <NavigationContainer>
   <Main></Main>
      </NavigationContainer>
  );
}