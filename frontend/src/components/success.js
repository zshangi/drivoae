import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import axios from 'axios';
function Succes({ match }) {
    const paymentId = match.params.id
    const theme = createTheme();
    
    return (
        <ThemeProvider theme={theme}>
        <Container component="main" style={{width:'350px'}}>
          <Box
            sx={{
              marginTop: 10,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
<Alert severity="info">
    <span className='fontflexible'>Your payment was Successful,<br/>your order number is : {paymentId} </span>

</Alert>
            </Box>
            </Container>
            </ThemeProvider>
    )
}

export default Succes