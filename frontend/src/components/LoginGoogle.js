import jwt_decode from "jwt-decode";
import { userRegisterAction } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction } from '../actions/userActions'
import { GoogleLogin } from '@react-oauth/google';


function LoginGoogle() {
    const dispatch = useDispatch()
    const responseGoogle = (response) => {
      console.log("google console");
      console.log(response);
  }
    return (
        <div >
          
 
          <GoogleLogin
  onSuccess={credentialResponse => {
    console.log(credentialResponse);
  }}
  onError={() => {
    console.log('Login Failed');
  }}
/>;
        </div>
    );
}

export default LoginGoogle;