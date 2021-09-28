import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

import {Container,Row,Col,Card,Button} from 'react-bootstrap'
class Home extends React.Component {
constructor(props){
  super(props);
  this.state={
    allData:[],
  }
}

componentDidMount=()=>{
axios.get(`${process.env.REACT_APP_BACKEND}/fruit`).then((res)=>{
  this.setState({
    allData:res.data.fruits
  })
})

}

addToFav=(index)=>{
let addData={
  name:this.state.allData[index].name,
  image:this.state.allData[index].image,
  price:this.state.allData[index].price,

}
  axios.post(`${process.env.REACT_APP_BACKEND}/add-fav/${this.props.auth0.user.email}`,addData).then((res)=>{
    if (res.status===200) {
      alert('Done')
    }
  })
}
  render() {
    return (
      <>
      <Container><Row>
        {this.state.allData && <>
        {this.state.allData.map((fruit,index)=>(
<Col key={index} >
<Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={fruit.image} alt={fruit.name} />
  <Card.Body>
    
    <Card.Text>
     {fruit.name}
    </Card.Text>

    <Card.Text>
    <p>Price : {fruit.price} </p> 
    </Card.Text>
    
  </Card.Body>

  

  <Button variant="primary" onClick={()=>this.addToFav(index)} >Add To Favarites</Button>

  
</Card>

</Col>


        ))}
        
        </>}
        </Row></Container></>
    )
  }
}

export default withAuth0(Home);
