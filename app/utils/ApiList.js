import React from 'react';
import {Alert} from 'react-native';
import axios from "react-native-axios";
import { useDispatch } from 'react-redux';
import {PRICES} from "../../app/redux/cryptoPricesAction"



const BASE_URL="https://fakestoreapi.com/"
export const PRODUCTS_BY_CATEGORY=`${BASE_URL}products/category` //jewelery
export const PRODUCTS_LIST=`${BASE_URL}products?limit=10` //jewelery

// fetch(PRODUCTS_LIST,{headers:{ 'x-api-key' : '5bb3e794-265c-441b-a3b6-ad52b1f6636c' }})
const BASE_URL2= 'https://api.livecoinwatch.com/coins/list';
export const cryptoPrice = `${BASE_URL2}` ; 
export const apikey= '5bb3e794-265c-441b-a3b6-ad52b1f6636c';

const data={
	"currency": "USD",
	"sort": "rank",
	"order": "ascending",
	"offset": 0,
	"limit": 5,
	"meta": true
}


export const cal=()=>{
    axios.post('https://api.livecoinwatch.com/coins/list',data,{
        headers: { 
        'content-Type': 'application/json',
        'x-api-key': '5bb3e794-265c-441b-a3b6-ad52b1f6636c'
    }})
    .then((data)=>{
        Alert.alert("success")
        return data;
    }).catch(()=>{
        Alert.alert("error")
    })
}
