import React, {useEffect} from 'react';
import {View, Text, Pressable, Image, LogBox} from 'react-native';
import {scale} from 'react-native-size-matters';
import {appColors} from '../utils/appColors';
import Label from './Label';
import {useSelector, useDispatch} from 'react-redux';
import {getCryptoPrice} from '../redux/slices/CryptoPriceapi';

export default function ProductCard({navigation, item}) {
  const {product_name, description, price, product_img} = item;
  const cryptoprices = useSelector(state => state.crypto.cryptoPrices);
  const selectCoin = useSelector(state => state.coin.selectedCoin);
  const cryptoRate = useSelector(state => state.coin.cryptoRate);
  const dispatch = useDispatch();

  return (
    <Pressable
      onPress={() => navigation.navigate('ProductDetails', {item})}
      style={{}}>
      <View
        style={{
          height: scale(200),
          width: scale(160),
          //backgroundColor:appColors.lightGray
        }}>
        <Image
          resizeMode="contain"
          style={{height: scale(200), width: scale(180)}}
          source={{uri: product_img}}
        />
      </View>
      <View style={{paddingVertical: scale(3)}}>
        <Label
          text={product_name?.substring(0, 20)}
          style={{fontSize: scale(18), fontWeight: '500'}}
        />
      </View>

      <View style={{paddingVertical: scale(2)}}>
        <Label
          text={description?.substring(0, 24)}
          style={{fontSize: scale(13), color: appColors.darkGray}}
        />
      </View>

      <View style={{paddingVertical: scale(5)}}>
        <Label
          text={(price / cryptoRate).toFixed(5)}
          style={{
            fontSize: scale(18),
            color: appColors.primary,
            fontWeight: '500',
          }}
        />
      </View>
    </Pressable>
  );
}
