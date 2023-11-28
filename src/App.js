import { useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { cartSliceActions } from './store/cart-slice'
import StatusBarMessage from './components/UI/StatusBarMessage'
import { getCartData, sendCartData } from './store/products-slice';

let isInitialRunning = true

function App() {

  const isShownCart = useSelector((state)=> state.cart.isShownCart)

  const product = useSelector((state) => state.product)
  const statusMessage = useSelector((state) => state.cart.statusMessage)

  const dispatchAction = useDispatch()

  useEffect(()=>{
    dispatchAction(getCartData())
  },[])

  useEffect(()=>{
    // const sendCartData = async()=>{
    //   dispatchAction(cartSliceActions.showStatusMessage({
    //     status: 'pending',
    //     title: 'sending data',
    //     message: 'Cart Data is sending to DB...'
    //   }))

    //   const response = await fetch('https://react-course-project-ffeb9-default-rtdb.europe-west1.firebasedatabase.app/cart.json',{
    //   method: 'PUT',
    //   body: JSON.stringify(product)
    // })
    // if(!response.ok){
    //   throw new Error('oshibkaaaaaaaa')
    // }

    // dispatchAction(cartSliceActions.showStatusMessage({
    //   status: 'success',
    //   title: 'Data is sended',
    //   message: 'Cart Data is Sended to DB'
    // }))
  // }

  if(isInitialRunning){
    isInitialRunning= false
    return
  }
  if(product.isCartContentChanged){
    dispatchAction(sendCartData(product))
  }
  
  //   sendCartData().catch((e)=>{
  //     dispatchAction(
  //       cartSliceActions.showStatusMessage({
  //         status: 'error',
  //         title: 'error with data sending',
  //         message: 'Cart Data is not Sended to DB'
  //     }))})

  },[product])

  return (
    <>
    {statusMessage && 
      <StatusBarMessage
        status={statusMessage.status}
        title={statusMessage.title}
        message={statusMessage.message}/>}
    <Layout>
      {isShownCart && <Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
