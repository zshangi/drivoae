import React ,{ useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Header from './components/Header'
import Footer from './components/Footer'
import users from './components/users'
import HomeScreen from './screens/HomeScreen';
import GarageScreen from './screens/GarageScreen';
import LocationScreen from './screens/LocationScreen';
import { HashRouter, Route } from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import ProductsScreen from './screens/ProductsScreen';
import ProductVehicleScreen from './screens/ProductVehicleScreen';
import PostsScreen from './screens/PostsScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ListOrdersScreen from './screens/ListOrdersScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import ServiceScreen from './screens/ServiceScreen';
import ServiceCenterScreen from './screens/ServiceCenterScreen';
import TermsScreen from './screens/TermsScreen';
import HelpScreen from './screens/HelpScreen';
import OrderScreen from './screens/OrderScreen';
import PayResultScreen from './screens/PayResultScreen';
import PrivateRoute from './utils/PrivateRoute';
import AddCar from './components/AddCar';
import RegisterOTPScreen from './screens/RegisterOTPScreen';
import DealScreen from './screens/DealScreen'
import ProductComparison from './components/ProductComparison';
import CheckoutForm from './components/CheckoutForm'
import VehicleTyreScreen from './screens/VehicleTyreScreen'
import success from './components/success'
import DashboardScreen from './suppliers/Dashboard'
import OrderServiceScreen from './suppliers/Orders'
import AboutusScreen from './screens/AboutusScreen'
import FaqScreen from './screens/FaqScreen'
import RefundReturnScreen from './screens/RefundReturnScreen'
import { Helmet } from 'react-helmet';
import WarantyScreen from './screens/WarantyScreen'
import TamaraSuccessScreen from './screens/TamaraSuccessScreen'
import TamaraFailScreen from './screens/TamaraFailScreen'
import TamaraCancelScreen from './screens/TamaraCancelScreen'
import TamaraWebhook from './screens/TamaraWebhook'
import OrderDetailsScreen from './screens/OrderDetailsScreen'
function App() {


  return (

   <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo.ae</title>
        <meta name="description" content="Drive with confidence" />
      </Helmet>
    <HashRouter >


  
       <Header/>
       <main>
           <Route path='/' component={HomeScreen} exact />
           <Route path='/addcar' component={AddCar}  />
           <Route path='/login' component={LoginScreen} />
           <Route path='/registerotpscreen' component={RegisterOTPScreen} />
           <Route path='/register' component={RegisterScreen} />
           <PrivateRoute path='/profile' component={ProfileScreen} />
           <PrivateRoute path='/garage' component={GarageScreen} />
           <PrivateRoute path='/location' component={LocationScreen} />
           <PrivateRoute path='/users' component={users} />
           <PrivateRoute path='/my' component={ListOrdersScreen} />
           <PrivateRoute path='/deal' component={DealScreen} />
           <Route path='/terms' component={TermsScreen} />
           <Route path='/faq' component={FaqScreen} />
           <Route path='/about' component={AboutusScreen} />
           <Route path='/returnrefund' component={RefundReturnScreen} />
           <Route path='/waranty' component={WarantyScreen} />
           <Route path='/tamarasuccess' component={TamaraSuccessScreen} />
           <Route path='/tamarafail' component={TamaraFailScreen} />
           <Route path='/tamaracancel' component={TamaraCancelScreen} />
           <Route path='/tamarawebhook' component={TamaraWebhook} />
           <Route path='/tamarawebhook' component={TamaraWebhook} />


           <Route path='/help' component={HelpScreen} />
   
           <Route path='/shipping' component={ShippingScreen} />
           <Route path='/payment/:id' component={PaymentScreen} />
           <Route path='/Orderdetails/:id' component={OrderDetailsScreen} />

           
           <Route path='/service' component={ServiceScreen} />
           <Route path='/servicecenter/:id' component={ServiceCenterScreen} />
           <Route path='/vehicletyre/:id' component={VehicleTyreScreen} />
   
           <Route path='/order' component={OrderScreen} />
           <Route path='/CheckoutForm' component={CheckoutForm} />
           <Route path='/product/:id' component={ProductScreen} />
           <Route path='/products' component={ProductsScreen} />
           <Route path='/productvehicle/:id/:name' component={ProductVehicleScreen} />
           <Route path='/ProductComparison' component={ProductComparison} />
           <Route path='/posts' component={PostsScreen} />
           <Route path='/cart/:id?' component={CartScreen} />
           <Route path='/success/:id?' component={success} />
    
           <PrivateRoute path='/payresult/:trackId/:oid/:transId' component={PayResultScreen} />

           <PrivateRoute path='/supplier' component={DashboardScreen}  />
           <PrivateRoute path='/orderservicecenter' component={OrderServiceScreen}  />
   
       </main>
       <Footer/>
    </HashRouter>
</>
  
  );
}

export default App;
