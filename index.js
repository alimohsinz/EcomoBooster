/**
 * @format
 */

import axios from 'axios';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

axios.defaults.baseURL = 'https://drab-cyan-fossa-kilt.cyclic.app';

AppRegistry.registerComponent(appName, () => App);
