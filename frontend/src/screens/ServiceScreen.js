import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Form } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { saveServiceMethod } from '../actions/cartActions'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import { BiArrowBack } from "react-icons/bi";
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'
import Back from '../components/Back'
import { Helmet } from 'react-helmet';
import Card from '@mui/material/Card';

/////////////////////////////////////////////////////////////////
const BpIcon = styled('span')(({ theme }) => ({
  borderRadius: '50%',
  width: 16,
  height: 16,
  marginTop: 5,
  boxShadow:
    theme.palette.mode === 'dark'
      ? '0 0 0 1px rgb(16 22 26 / 40%)'
      : 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
  backgroundColor: theme.palette.mode === 'dark' ? '#394b59' : '#f5f8fa',
  backgroundImage:
    theme.palette.mode === 'dark'
      ? 'linear-gradient(180deg,hsla(0,0%,100%,.05),hsla(0,0%,100%,0))'
      : 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
  '.Mui-focusVisible &': {
    outline: '2px auto rgba(19,124,189,.6)',
    outlineOffset: 2,
  },
  'input:hover ~ &': {
    backgroundColor: theme.palette.mode === 'dark' ? '#30404d' : '#ebf1f5',
  },
  'input:disabled ~ &': {
    boxShadow: 'none',
    background:
      theme.palette.mode === 'dark' ? 'rgba(57,75,89,.5)' : 'rgba(206,217,224,.5)',
  },
}));

const BpCheckedIcon = styled(BpIcon)({
  backgroundColor: '#137cbd',
  backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
  '&:before': {
    display: 'block',
    width: 16,
    height: 16,
    backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
    content: '""',
  },
  'input:hover ~ &': {
    backgroundColor: '#106ba3',
  },
});

// Inspired by blueprintjs
function BpRadio(props) {
  return (
    <Radio
      disableRipple
      color="default"
      checkedIcon={<BpCheckedIcon />}
      icon={<BpIcon />}
      {...props}
    />
  );
}
//////////////////////////////////////////////////////////////////

function ServiceScreen({ history }) {
  const dispatch = useDispatch()
  const [service, setServiceMethod] = useState('')
  const [serviceid, setServiceid] = useState('')


  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(saveServiceMethod(serviceid))
    history.push(`/servicecenter/${serviceid}`)
  }
  const [value, setValue] = React.useState('1');

  const handleRadioChange = (event) => {
    setValue(event.target.value);

  };

  return (
    <Container>
      <Button onClick={() => history.goBack()}><BiArrowBack size={25} /></Button>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo's Services</title>
        <meta name="description" content="See Our perfect services" />
      </Helmet>
      <h1>Drivo's Services</h1>

      <Form onSubmit={submitHandler}  >
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-error-radios"
            name="quiz"
            value={value}
            onChange={handleRadioChange}
          >
            <Row>
              <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
                <Card style={{ borderRadius: 15, padding: 3 }} sx={{ boxShadow: 3 }}>

                  <FormControlLabel onChange={(e) => { setServiceMethod("Local Service Center"); setServiceid(1) }} value="Local Service Center"
                    control={<BpRadio />} label={<><span className='textnormal'>Have it installed at a nearby partner center.</span> <span className='littleblue'> Free</span></>} />
                  <img src={'assets/img/servicecenter.jpg'} width={'100%'} />
                </Card>
                <hr />
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
                <Card style={{ borderRadius: 15, padding: 3 }} sx={{ boxShadow: 3 }}>

                  <FormControlLabel onChange={(e) => { setServiceMethod("Van Service"); setServiceid(2) }} value="Install At Your Place"
                    control={<BpRadio />} label={<><span className='textnormal'>Let our van come to you for installation.</span><span className='littleblue'> AED 150</span></>} />
                  <img src={'assets/img/mobileservice.jpg'} width={'90%'} />
                </Card>
                <hr />
              </Col>
              <Col xs={12} sm={6} md={6} lg={4} xl={4} xxl={3}>
                <Card style={{ borderRadius: 15, padding: 3, alignItems: 'center', textAlign: 'center' }} sx={{ boxShadow: 3 }} >

                  <FormControlLabel onChange={(e) => { setServiceMethod("Ship To An Address"); setServiceid(3) }} value=" We'll send it, you handle the installation."
                    control={<BpRadio />} label={<><span className='textnormal'>We'll send it, you handle the installation.</span>
                     <span className='littleblue'> Free</span></>} />
                  <img src={'assets/img/shipservice.jpg'} width={'100%'} />
                </Card>
                <hr />

              </Col>
            </Row>
          </RadioGroup>

        </FormControl>
        <Box sx={{
          position: 'absolute',
          bottom: 80,
          right: 0,
          left: 0,
          textAlign: 'center'
        }}>
          <Button type="submit" variant="contained" style={{ borderRadius: 25, backgroundColor: '#1CB0CD',color:'#fff' }} disabled={!serviceid}>Next</Button></Box>

      </Form>
    </Container>
  )
}

export default ServiceScreen
