import { ADD_TO_LIST, REMOVE_FROM_LIST } from "../types";

const initialState = {
  cartItems: [],
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_TO_LIST:
      const item = action.payload;

      // const existItem = state.cartItems.find((x) => x.book === item.book);
      // if (existItem) {
      //   return {
      //     ...state,
      //     cartItems: state.cartItems.map((x) =>
      //       x.book === existItem.book ? item : x
      //     ),
      //   };
      // } else {
      return {
        ...state,
        cartItems: [...state.cartItems, item],
      };
    // }
    case REMOVE_FROM_LIST:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.book !== action.payload),
      };

    default:
      return state;
  }
}
