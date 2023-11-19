import { Row, Col } from 'react-bootstrap'
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function BannerSearch({history}) {
  
  const seachvehicle = (e) => {
    e.preventDefault()
    const id=1
    history.push(`/vehicle/${id}`)
}
  return (
 
      <Row  className="p-5 my-3 rounded" > 
        <Col  sm={12} md={4} lg={4} xl={4}> 
        <Tabs
      defaultActiveKey="addcar"
      id="justify-tab-example"
      className="mb-3"
      justify
    >
      <Tab eventKey="addcar" title="Add your Car">
      <Box component="form" noValidate onSubmit={seachvehicle} sx={{ mt: 3,padding:2,marginTop:2, bgcolor:'#f8f8f8' ,textAlign:'center'}}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="Make"
                    name="make"
                    required
                    fullwidth="true"
                    id="make"
                    label="Make"
                    autoFocus
                  />
                </Grid>
               
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullwidth="true"
                    id="model"
                    label="Model"
                    name="model"
                    autoComplete="Model"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullwidth="true"
                    id="year"
                    label="Year"
                    name="year"
                    autoComplete="Year"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullwidth="true"
                    id="trim"
                    label="Trim"
                    name="trim"
                    autoComplete="Trim"
                  />
                </Grid>

              </Grid>
              <Button
                                                  

                type="submit"
                fullwidth="true"
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Find
              </Button>

            </Box>
      </Tab>
      <Tab eventKey="searchbysize" title="Search By size">
       
      </Tab>


    </Tabs>
            
            </Col>
        <Col  sm={12} md={8} lg={8} xl={8} style={{
           
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}
>
          <img  className='card-img-top' src={'assets/img/main_1.png'}></img>
          </Col>
        </Row>


  )
}

export default BannerSearch
