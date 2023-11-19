import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Container, Card, Image, Form } from 'react-bootstrap'
import { fetchPosts } from '../actions/postActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import ReviewCard from '../components/ReviewCard'
import Grid from '@mui/material/Grid'; // Grid version 1
import { Helmet } from 'react-helmet';



function PostsScreen() {
  const dispatch = useDispatch()
  const listPosts = useSelector(state => state.listPost)
  const {error, loading, posts } = listPosts



  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])
  


  return (
<Container>
<Helmet>
        <meta charSet="utf-8" />
        <title>Drivo Blog</title>
        <meta name="description" content="latest information" />
      </Helmet>
      <h1>Blog<span className='textnormalbold'>(check our latest content)</span></h1>
      <Row>

        <Col Col sm={12} md={12} lg={12} xl={12} sx={{ mt: 3, padding: 2, bgcolor: '#DDDDDD', textAlign: 'center' }}>

          {loading ? <Loader />
            : error ? <Message variant='danger' text={error} />
              :  
              <div className="cards-container">

                 {Array.isArray(posts)
                  ? posts.map(post => (
                  <Card xs={12} sm={12} md={4} lg={4} xl={4} key={post._id}>
                    <ReviewCard
                      post={post}
                      key={post._id}
                    />
                  </Card >
                ))
              :null}
              
</div>
          }    

        

        </Col>


      </Row>
</Container>
  )
}

export default PostsScreen
