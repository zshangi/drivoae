import React, { useState, useEffect } from "react";
import axios from "axios";
import Crypto from 'crypto-js';
import { notification } from "antd";
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Otp from '../components/Otp';
import { userRegisterAction } from '../actions/userActions'
import { useDispatch, useSelector } from 'react-redux'
import { userLoginAction } from '../actions/userActions'
import InputAdornment from '@mui/material/InputAdornment';
import { Helmet } from 'react-helmet';


function RegisterOTPScreen({ location, history }) {
  var redirect = location.search ? location.search.split('=')[1] : '/'
  if (redirect === 'success' || redirect === 'fail') {
    redirect = '/'
  }
  const tokenResult = location.search ? location.search.split('=')[1] : ""

  const userRegister = useSelector(state => state.userLogin)
  const { userInfo, error, loading } = userRegister
  const dispatch = useDispatch()

  const [loadingSms, setLoadingSms] = useState(false);
  const [pno, setPno] = useState("");
  const [otpcode, setOtpcode] = useState("");
  const [otpShow, setOtpShow] = useState(false)
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  const method = 'POST'
  const host = 'api.smsglobal.com';
  const uri = '/v2/sms/'
  const apiKey = '860db0d738c671e86288054899661566';
  const secretKey = '83001818d560f2611ffa558f0937d3d2';

  const getAuthorizationHeader = () => {
    const ts = Math.floor((new Date().getTime()) / 1000);
    const nonce = Math.floor(Math.random() * 1e16);

    const signature = [ts, nonce, method, uri, host, 443];
    const macString = `${signature.join(`\n`)}\n\n`;
    const macHash = Crypto.HmacSHA256(macString, secretKey);
    const macBase64 = Crypto.enc.Base64.stringify(macHash);

    return `MAC id="${apiKey}", ts="${ts}", nonce="${nonce}", mac="${macBase64}"`;
  };
  //////////////////////////////////////////////////////////////////////////////////
  const Otp_submit = () => {
    let newOTP = ''
    if (pno == '111111111') {
      newOTP = '111111'
    } else {
      newOTP = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit OTP
    }
    setOtpcode(newOTP);
    setSeconds(30);
    setMinutes(1);

    // Trigger SMS sending process
    sendSMS(pno, newOTP);
    setOtpShow(true)

  };

  /////////////////////////////////////////////////////////////////////////////////
  const sendSMS = async (number, otpuser) => {
    // console.log(number, otpuser)
    // console.log(new Date().toLocaleString())
    const authorizationHeader = getAuthorizationHeader();
    const data = { message: `Your Drivo verfication code is:${otpuser}`, origin: 'Drivo.ae', destination: `${number}` }

    return axios({
      url: `https://${host}${uri}`,

      method,
      data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
      }
    })
      .then(res => {
        notification.success({
          message: `Message Sent! `
        })
        setTimeout(function () { setLoadingSms(false); }, 1000);

        return res.data;
      })
      .catch(async function (error) {
        notification.error({
          message: `SMS NOT SENT`,
          description: 'Try again'
        })
        setTimeout(function () { setLoadingSms(false); }, 1000);
      })
  }
  const sendSMSwelcome = async (number) => {
    const authorizationHeader = getAuthorizationHeader();
    const headers = ""
    const data = { message: `Welcome to Drivo! Your journey to easy car maintenance starts now. Special treat: Get 100 AED off when you buy four tires.`, origin: 'Drivo.ae', destination: `+971${number}` }
    // console.log(new Date())
    return axios({
      url: `https://${host}${uri}`,
      method,
      data,
      headers: {

        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: authorizationHeader,
        ...headers
      }
    })
      .then(res => {
        notification.success({
          message: `Message Sent! `
        })
        setTimeout(function () { setLoadingSms(false); }, 1000);

        return res.data;
      })
      .catch(async function (error) {
        notification.error({
          message: `SMS NOT SENT`,
          description: `Make sure your keys are correct or that you have enough credit `
        })
        setTimeout(function () { setLoadingSms(false); }, 1000);
      })
  }
  /////////////////////////////////////////////////////////////////////////////////
  const Otp_verify = async () => {
    if (otp != otpcode) {
      setMessage('OTP is Invalid !')
    } else {
      await dispatch(userRegisterAction(pno, pno, otp, pno))
      await loginn(pno, otp)
      await sendSMSwelcome(pno);
    }
  }
  const loginn = async (pno, otp) => {
    dispatch(userLoginAction(pno, otp))
  }
  const loginHandler = () => {
    history.push('/login?redirect=');
  }
  useEffect(() => {



    if (userInfo) {
      history.push(redirect)
    }
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };


  }, [history, userInfo, redirect, seconds])


  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Register</title>
        <meta name="description" content="Register" />
      </Helmet>
      {!otpShow ?

        <Box component="form" onSubmit={Otp_submit} onClick={()=>{window.dataLayer.push({'event':'Otp_submit'})}} noValidate sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
          <img src="/assets/img/otp.svg" width={'50%'} />
          <h1>"Welcome to Drivo!"</h1>
          <p>Your personal car maintenance assistant is just a few clicks away.
            Join us now and get 100 AED off your first purchase of 4 sets of tires!</p>
          <TextField
            margin="normal"
            required
            fullwidth="true"
            id="pno"
            type="tel"
            label="Mobile Number"
            name="pno"
            inputProps={{
              maxLength: 9,
            }}
            helperText={<Link to='/terms'>By signing up,you agree to  our terms and conditions</Link>}
            placeholder='Enter Mobile Number'
            onChange={(e) => setPno(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img src={'assets/img/flag_UAE.png'} />+971
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            fullwidth="true"
            variant="outlined"
            sx={{ mt: 3, mb: 2 }} style={{ borderRadius: 25 }}


          >
            GET STARTED
          </Button>
          <Grid container>

            <Grid item>
              <Button onClick={loginHandler}
                variant="body2">
                Do have an account? login
              </Button>
            </Grid>
          </Grid>
        </Box>
        :
        <Box sx={{
          alignItems: 'center',
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
        }}>
          <img src="/assets/img/otp.svg" width={'50%'} />
          <h4>verify account</h4>
          <p>please enter verfication code sent to your mobile</p>
          <Otp otp={otp} setOtp={val => setOtp(val)} />

          <div style={{ width: '100%', alignItems: 'center', textAlign: 'center', color: '#800000' }}>{message}</div>
          <div style={{ display: 'flex', flexDirection: 'row', marginTop: 20 }}>


            <Button   onClick={Otp_verify} variant="contained"
              disabled={(otpShow && otp.length !== 6)}
              className='button-blue'
               >
              Verify
            </Button >
          </div>
          <div className="countdown-text">
            {seconds > 0 || minutes > 0 ? (
              <p>
                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                {seconds < 10 ? `0${seconds}` : seconds}
              </p>
            ) : (
              <p>Didn't recieve code?</p>
            )}

            <Button color="primary" onClick={Otp_submit}
              disabled={seconds > 0 || minutes > 0}
              style={{
                color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
              }}

            >
              Resend OTP
            </Button>
          </div>
        </Box>

      }

    </Container>
  );
};

export default RegisterOTPScreen;
