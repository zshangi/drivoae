import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { blueGrey, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid'; // Grid version 1
import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Container } from 'react-bootstrap';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { makeStyles } from '@material-ui/core/styles';
import { Row, Col } from 'react-bootstrap'

const useStyles = makeStyles({
  drawerPaper: {
    borderRadius: '20px 20px 0 0',
  },
});
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard({ post }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const classes = useStyles();
  const [opendetails, setOpendetails] = React.useState(false);

  const toggleDrawerDetails = (newOpen) => () => {
    setOpendetails(newOpen);
  };

  const handledetails = () => {

    setOpendetails(true)
  }
  return (


  <>
          <Card sx={{height:'100%'}} onClick={() => handledetails()} >

              <CardMedia
                component="img"
                height="194"
                image={post.image}
                alt={post.title}
              />
              <CardContent height="350">
                <h3  >{post.title}</h3>
              
              <span className='textnormal'>{post.body.substring(0, 150)}...</span> 
            
              </CardContent>


          </Card>



        <SwipeableDrawer
        anchor="bottom"
        open={opendetails}
        onClose={toggleDrawerDetails(false)}
        onOpen={toggleDrawerDetails(true)}
        classes={{ paper: classes.drawerPaper }}

        >
        
          <Container style={{
            height: "80vh", alignItems: 'left',
            textAlign: 'left', borderRadius: 3,
          }} >

               <Row className='p-2 border-bottom'>


              <Col className="my-4" xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                <h1 style={{
                    letterSpacing:0,
                    fontWeight:1300}}>{post.title}</h1>
              </Col>
                   <Col xs={12} sm={12} md={12} lg={12} xl={12} style={{ textAlign: 'center' }}>
                       <img className="img-post" src={post.image}/>
                   </Col>
            </Row>
            <Row  className='p-2 border-bottom'>
            <Col xs={12} sm={12} md={12} lg={12} xl={12} >
            <span className='justifypost' >{post.body}</span>
            <hr/>
            </Col>
            </Row>
          
         
        </Container>





        </SwipeableDrawer>


  </>

 
  );
}