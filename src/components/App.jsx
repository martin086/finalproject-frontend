import './App.css';
import 'react-toastify/dist/ReactToastify.css'
//Router Dom
import {BrowserRouter, Routes, Route} from 'react-router-dom'
//Context
import { DarkModeProvider } from '../context/DarkModeContext';
import { CartProvider } from '../context/CartContext';
import { UserProvider } from '../context/UserContext';
//Toastify
import { ToastContainer } from 'react-toastify';
//Components
import Login from './Login/Login';
import Register from './Register/Register';
import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import NotFound from './NotFound/NotFound';
import ItemListContainer from './ItemListContainer/ItemListContainer';
import ItemDetailContainer from './ItemDetailContainer/ItemDetailContainer';
import Cart from './Cart/Cart';
import Contacto from './Contacto/Contacto';
import Checkout from './Checkout/Checkout';
import Home from './Home/Home';
import ForgotPassword from './ForgotPassword/ForgotPassword';

const App = () => {

  return (
    <>
      <BrowserRouter>
        <DarkModeProvider>
          <UserProvider>
            <CartProvider>
              <Navbar/>
              <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/forgotpassword' element={<ForgotPassword/>}/>
                <Route path='/category/:category' element={<ItemListContainer/>}/>
                <Route path='/products/*' element={<ItemListContainer/>}/>  
                <Route path='/product/:id' element={<ItemDetailContainer/>}/>  
                <Route path='/cart' element={<Cart/>}/>
                <Route path='/checkout' element={<Checkout/>}/>
                <Route path='/contacto' element={<Contacto/>}/>
                <Route path='*' element={<NotFound/>}/>
              </Routes>
              <Footer/>
              <ToastContainer/>
            </CartProvider>
          </UserProvider>
        </DarkModeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
