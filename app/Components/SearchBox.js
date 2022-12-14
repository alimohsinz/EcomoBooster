import React, {useEffect, useRef, useState} from 'react';
import {View, Pressable, TextInput, Button, Text} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector, useDispatch} from 'react-redux';
import {changeCoin} from '../redux/slices/selectedCoinSlice';
import axios from 'axios';

export default function SearchBox({autoFocus, onFoucs, rightIcon, navigation}) {
  const dispatch = useDispatch();
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const [coinsArray, setCoinsArray] = useState([]);
  const [display, setDisplay] = useState('none');
  const [displayEther, setDisplayEther] = useState('none');
  const [displayMatic, setDisplayMatic] = useState('none');

  useEffect(() => {
    axios
      .get('https://drab-cyan-fossa-kilt.cyclic.app/prices/getprices')
      .then(res => setCoinsArray(res.data[0].coin_name));
  }, []);

  const pressCrypto = () => {
    if (display === 'none') setDisplay('flex');
    else setDisplay('none');
    coinsArray.map(item => {
      if (item === 'Ethereum') setDisplayEther('flex');
      if (item === 'Polygon') setDisplayMatic('flex');
    });
  };

  const etherPress = () => {
    dispatch(changeCoin('Ethereum'));
    setDisplay('none');
  };

  const maticPress = () => {
    dispatch(changeCoin('Polygon'));
    setDisplay('none');
  };

  const USDTPress = () => {
    dispatch(changeCoin('Tether'));
    setDisplay('none');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: scale(20),
          borderRadius: scale(20),
          alignItems: 'center',
          backgroundColor: appColors.lightGray,
          flexDirection: 'row',
          height: scale(40),
        }}>
        <Feather name="search" size={scale(20)} color={appColors.black} />
        <TextInput
          autoFocus={autoFocus}
          onFocus={onFoucs && onFoucs}
          style={{flex: 1, paddingLeft: scale(10)}}
        />
      </View>

      <Pressable
        onPress={() => navigation.navigate('Cart')}
        style={{
          borderRadius: scale(20),
          width: scale(40),
          height: scale(40),
          backgroundColor: appColors.primary,
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: scale(10),
          marginRight: scale(10),
        }}>
        <Feather
          name={rightIcon ? rightIcon : 'shopping-cart'}
          size={scale(18)}
          color={appColors.white}
        />
      </Pressable>
      <View
        style={{
          flexDirection: 'column',
        }}>
        <Pressable
          onPress={pressCrypto}
          style={{
            borderRadius: scale(20),
            width: scale(55),
            height: scale(40),
            backgroundColor: appColors.primary,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: scale(0),
          }}>
          <Text
            style={{
              color: 'white',
            }}>
            {selectCoin}
          </Text>
        </Pressable>
        <View
          style={{
            backgroundColor: '#04AA6D' /* Green background */,
            flexDirection: 'column',
            display: display,
          }}>
          <View
            style={{
              display: displayEther,
            }}>
            <Button
              onPress={etherPress}
              title="Ether"
              color={appColors.primary}
            />
          </View>
          <View
            style={{
              display: displayMatic,
            }}>
            <Button
              onPress={maticPress}
              title="Matic"
              color={appColors.primary}
            />
          </View>
          <Button onPress={USDTPress} title="USDT" color={appColors.primary} />
        </View>
      </View>
    </View>
  );
}
