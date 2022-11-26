import * as React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useWalletConnect} from '@walletconnect/react-native-dapp';
import CustomButton from '../../../Components/CustomButton';

import {ContractAbi, ContractAbiMatic} from './abi';
import {contractAddress, contractAddressMatic} from './contractAddress';

const shortenAddress = address => {
  return `${address.slice(0, 6)}...${address.slice(
    address.length - 4,
    address.length,
  )}`;
};

function Button({onPress, label}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
}

export default function Walletconnect() {
  const connector = useWalletConnect();
  //console.log("returnconn",connector);
  const connectWallet = React.useCallback(() => {
    try {
      console.log('wallet');
      console.log('return', connector.connect());
      return connector.connect();
    } catch (err) {
      console.log(err);
    }
  }, [connector]);

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  // const depositassets = async () => {
  //   if (typeof connector.connected !== 'undefined') {
  //     const web3 = new Web3(
  //       'https://polygon-mumbai.g.alchemy.com/v2/tNMnFd0YDejjHxonOBaX4gmnDORXp7ka',
  //     );
  //     const contract = new web3.eth.Contract(
  //       ContractAbiMatic,
  //       contractAddressMatic,
  //     );
  //     console.log('dd', await window.contract.methods.transfer(123).send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'}));
  //     contract.methods
  //       .transfer(123)
  //       .send({from: '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe'})
  //       .then(function (receipt) {
  //         console.log('done', receipt);
  //       });
  //   }
  // };

  return (
    <>
      {!connector.connected ? (
        <Button onPress={connectWallet} label="Connect a wallet" />
      ) : (
        <>
          <Text>{shortenAddress(connector.accounts[0])}</Text>
          <Button onPress={killSession} label="Log out" />
        </>
      )}
      {/* {connector.connected ? (
        <CustomButton onPress={depositassets} label="deposit" />
      ) : (
        <Text>Not conneted</Text>
      )} */}
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#5A45FF',
    color: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
