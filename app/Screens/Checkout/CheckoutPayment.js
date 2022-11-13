import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Pressable,
  Clipboard,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../Components/Container';
import QRCode from 'react-native-qrcode-svg';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {appColors} from '../../utils/appColors';
import axios from 'axios';
import CustomButton from '../../Components/CustomButton';
import Web3 from 'web3';
import WalletConnectProvider from "@walletconnect/web3-provider";
export default function CheckoutPayment({navigation, route}) {

  useEffect(()=>{
    const func=()=>{
      const web3 = new Web3('https://polygon-mumbai.g.alchemy.com/v2/tNMnFd0YDejjHxonOBaX4gmnDORXp7ka');
      try{
      const newWallet = web3.eth.accounts.wallet.create(1);
      console.log(newWallet);
    }
      catch(err){
        console.log("err",err);
      }
      //const newAccount = newWallet[0];
      //console.log(newAccount);
    }
    func();
  },[])
  const orderPressed = () => {
    axios
      .post('/user', {
        firstName: 'Fred',
        lastName: 'Flintstone',
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <Container
      isScrollable
      bodyStyle={{
        flex: 1,
        paddingVertical: scale(40),
      }}>
      <Pressable onPress={() => navigation.goBack()}>
        <Feather name="chevron-left" size={scale(25)} color={appColors.black} />
      </Pressable>
      <View style={{paddingVertical: scale(40), alignItems: 'center'}}>
        <QRCode size={250} value="adrefgxvgsv" />

        <View
          style={{
            marginVertical: scale(40),
            borderWidth: scale(1),
            borderColor: 'rgba(158, 150, 150, .7)',
            borderRadius: scale(7),
            padding: scale(10),
          }}>
          <View style={{flexDirection: 'row'}}>
            <Text
              selectable
              style={{
                fontSize: scale(15),
                paddingRight: scale(10),
                color: 'black',
              }}>
              ajksajoiud98ddfkdjc7
            </Text>
            <TouchableOpacity
              onPress={() => Clipboard.setString('mail@mail.com')}>
              <FontAwesome name="copy" size={scale(25)} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{paddingBottom: 50}}>
          <CustomButton onPress={orderPressed} label="PLACE ORDER" />
          <CustomButton label="RELEASE PAYMENT" />
        </View>
      </View>
    </Container>
  );
}
