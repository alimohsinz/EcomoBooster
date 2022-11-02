import {createSlice} from '@reduxjs/toolkit';

const initialState = {selectedCoin: 'USDT', cryptoRate: 1};

const selectedCoinSlice = createSlice({
  name: 'selectedCoinSlice',
  initialState,
  reducers: {
    changeCoin(state, action) {
      state.selectedCoin = action.payload;
    },
    getRate(state, action) {
      state.cryptoRate = action.payload;
    },
  },
});

export const {changeCoin, getRate} = selectedCoinSlice.actions;

export default selectedCoinSlice.reducer;
