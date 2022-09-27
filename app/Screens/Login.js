import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../Components/Container';
import CustomInput from '../Components/CustomInput';
import CustomButton from '../Components/CustomButton';
import Label from '../Components/Label';
import {appColors, shadow} from '../utils/appColors';

import {AlertHelper} from '../utils/AlertHelper';
import {CommonActions} from '@react-navigation/native';

// import ReduxWrapper from '../utils/ReduxWrapper';

function Login({getProductsList$, loginUser$, navigation}) {
  const [credentials, setCredentials] = useState({});
  const [isloading, setisloading] = useState(false);

  const onLogin = async () => {
    //auth().signOut()
    const {email, password} = credentials;

    try {
      if (email && password) {
        setisloading(true);
        const {user, additionalUserInfo} =
          await auth().signInWithEmailAndPassword(
            email?.toLowerCase(),
            password?.toLowerCase(),
          );
        console.log(user);
        if (user?.uid) {
          if (additionalUserInfo?.isNewUser) {
            const {providerId, profile} = additionalUserInfo;
            //create new user and login
            await writeData('users', {
              email: user?.email,
              name: user?.displayName,
              uid: user?.uid,
              photoURL: user?.photoURL,
              providerId,
              profile,
            });
          }
          loginUser$({
            email: user?.email,
            name: user?.displayName ? user?.displayName : 'User',
            uid: user?.uid,
          });
          getProductsList$();
          AlertHelper.show('success', 'Welcome to EcomoBooster');
          navigation.navigate('Home');
        }
      } else {
        setisloading(false);
        AlertHelper.show('error', 'Email and password is required!!');
      }
    } catch (error) {
      AlertHelper.show('error', 'Something went woring');
    }
  };

  const onChangeText = (name, text) => {
    setCredentials({...credentials, [name]: text});
  };

  return (
    <Container isScrollable>
      <View
        style={{
          marginTop: scale(50),
          backgroundColor: appColors.white,
          ...shadow,
          padding: scale(15),
          borderRadius: scale(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Label
            text="Welcome,"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Label
              text="Sign Up"
              style={{
                fontSize: scale(14),
                fontWeight: '500',
                color: appColors.primary,
              }}
            />
          </Pressable>
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="Sign in to Continue"
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
            }}
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={text => onChangeText('email', text)}
            keyboardType="email-address"
            label="Email"
            placeholder="ali@.com"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={text => onChangeText('password', text)}
            secureTextEntry
            label="Password"
            placeholder="Password"
            // value="*******"
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate('Verification')}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingVertical: scale(10),
          }}>
          <Label
            text="Forgot password"
            style={{
              fontSize: scale(14),
              fontWeight: '500',
            }}
          />
        </Pressable>
        <CustomButton
          isLoading={isloading}
          onPress={onLogin}
          label="Log in"
          labelStyle={{fontWeight: '500'}}
        />
        <CustomButton
          isLoading={isloading}
          onPress={onLogin}
          label="Sign Up"
          labelStyle={{fontWeight: '500'}}
        />
      </View>
    </Container>
  );
}

export default Login;
