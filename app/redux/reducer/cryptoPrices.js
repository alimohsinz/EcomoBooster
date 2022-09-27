import {PRICES} from '../cryptoPricesAction';

const initialState = {
  prices: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case 'PRICES':
      return {
        ...state,
        prices: action.payload,
      };
    default:
      return state; //must be like this so it can  presist the reducers
  }
}
