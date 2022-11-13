import * as React from 'react';
import {Text, View, LogBox} from 'react-native';
import TabNavigation from './app/Components/TabNavigation';
import {Provider} from 'react-redux';
import Store from './app/redux/store';

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={Store}>
      <TabNavigation />
    </Provider>
  );
}