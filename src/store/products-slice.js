import { createSlice } from "@reduxjs/toolkit";
import { cartSliceActions } from "./cart-slice";

const initialProductState = { items: [], itemsQty: 0 , isCartContentChanged: false};

const productSlice = createSlice({
  name: "product",
  initialState: initialProductState,
  reducers: {
    addItem(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.itemsQty++;
      state.isCartContentChanged = true
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          title: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      }
    },
    deleteItem(state, action) {
      state.itemsQty--;
      state.isCartContentChanged = true
      const deletingItemId = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === deletingItemId
      );
      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== deletingItemId);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
      }
    },
    updateCart(state, action) {
      state.items = action.payload.items;
      state.itemsQty = action.payload.itemsQty;
    },
  },
});

export const sendCartData = (cartData) => {
  return async (dispatchAction) => {
    dispatchAction(
      cartSliceActions.showStatusMessage({
        status: "pending",
        title: "sending data",
        message: "Cart Data is sending to DB...",
      })
    );

    const sendDataHttpRequest = async () => {
      const response = await fetch(
        "https://react-course-project-ffeb9-default-rtdb.europe-west1.firebasedatabase.app/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({items: cartData.items, itemsQty: cartData.itemsQty} ),
        }
      );
      if (!response.ok) {
        throw new Error("oshibkaaaaaaaa");
      }
    };
    try {
      await sendDataHttpRequest();
      dispatchAction(
        cartSliceActions.showStatusMessage({
          status: "success",
          title: "Data is sended",
          message: "Cart Data is Sended to DB",
        })
      );
    } catch (erroe) {
      dispatchAction(
        cartSliceActions.showStatusMessage({
          status: "error",
          title: "error with data sending",
          message: "Cart Data is not Sended to DB",
        })
      );
    }
  };
};

export const getCartData = () =>{
    return async (dispatchAction)=>{
        const getDataHttpRequest = async () =>{
            const response = await fetch('https://react-course-project-ffeb9-default-rtdb.europe-west1.firebasedatabase.app/cart.json')
            if(!response.ok){
                throw new Error('nemogu izvlech dannie')
            }

            const responseData = await response.json()

            return responseData
        }

        try{
            const cartData = await getDataHttpRequest()
            dispatchAction(productSlice.actions.updateCart({
                items: cartData.items || [],
                itemsQty: cartData.itemsQty ,
            }))

        } catch(error) {
            dispatchAction(
                cartSliceActions.showStatusMessage({
                  status: "error",
                  title: "error with data sending",
                  message: "Cart Data is not Sended to DB",
                })
              )
        }
    }
}

export const productSliceActions = productSlice.actions;
export default productSlice;
