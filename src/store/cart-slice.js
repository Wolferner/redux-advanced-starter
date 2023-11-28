import { createSlice } from "@reduxjs/toolkit"

const initialCartState = { isShownCart: false, statusMessage: null}

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        showOrHideCart(state){
            state.isShownCart = !state.isShownCart
        },
        showStatusMessage(state,action){
            state.statusMessage = {
                status: action.payload.status,
                title: action.payload.title,
                message: action.payload.message
            }
        }
    }
})

export const cartSliceActions = cartSlice.actions
export default cartSlice