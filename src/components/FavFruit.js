import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';

import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Form,
} from 'react-bootstrap';
class FavFruit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allData: [],
      showModel: false,
      name: '',
      image: '',
      price: '',
      id: '',
    };
  }
  componentDidMount = () => {
    axios
      .get(
        `${process.env.REACT_APP_BACKEND}/get-fav/${this.props.auth0.user.email}`
      )
      .then((res) => {
        this.setState({
          allData: res.data.fruits,
        });
      });
  };

  deleteData = (index) => {
    axios
      .delete(
        `${process.env.REACT_APP_BACKEND}/delete/${index}/${this.props.auth0.user.email}`
      )
      .then((res) => {
        if (res.status === 200) {
          alert('Deleted');
          this.componentDidMount();
          this.forceUpdate();
        }
      });
  };

  openModel = (fruit, index) => {
    this.setState({
      showModel: true,
      name: fruit.name,
      image: fruit.image,
      price: fruit.price,
      id: index,
    });
  };

  closeModel = () => {
    this.setState({
      showModel: false,
    });
  };

  updateData = (id) => {
    let updateData = {
      name: this.state.name,
      image: this.state.image,
      price: this.state.price,
    };
    axios.put(`${process.env.REACT_APP_BACKEND}/update/${id}/${this.props.auth0.user.email}`,updateData).then((res) => {
      if (res.status === 200) {
        alert('Updated');
        this.componentDidMount();
        this.forceUpdate();
        this.closeModel()
      }
    })
  };
  render() {
    return (
      <>
        <Container>
          <Row>
            {this.state.allData && (
              <>
                {this.state.allData.map((fruit, index) => (
                  <Col key={index}>
                    <Card style={{ width: '18rem' }}>
                      <Card.Img
                        variant='top'
                        src={fruit.image}
                        alt={fruit.name}
                      />
                      <Card.Body>
                        <Card.Text>{fruit.name}</Card.Text>

                        <Card.Text>
                          <p>Price : {fruit.price} </p>
                        </Card.Text>
                      </Card.Body>

                      <Card.Footer>
                        {' '}
                        <Button
                          variant='primary'
                          onClick={() => this.deleteData(index)}
                        >
                          Delete
                        </Button>
                        <Button
                          variant='primary'
                          onClick={() => this.openModel(fruit, index)}
                        >
                          Update
                        </Button>
                      </Card.Footer>
                    </Card>

                    <Modal show={this.state.showModel} onHide={this.closeModel}>
                      <Modal.Header closeButton>
                        <Modal.Title>Update Fruits</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <>
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                            type='text'
                            onChange={(e) => {
                              this.setState({
                                name: e.target.value,
                              });
                            }}
                            defaultValue={this.state.name}
                          />
                        </>
                        <>
                          <Form.Label>Image</Form.Label>
                          <Form.Control
                            type='text'
                            onChange={(e) => {
                              this.setState({
                                image: e.target.value,
                              });
                            }}
                            defaultValue={this.state.image}
                          />
                        </>
                        <>
                          <Form.Label>Price</Form.Label>
                          <Form.Control
                            type='text'
                            onChange={(e) => {
                              this.setState({
                                price: e.target.value,
                              });
                            }}
                            defaultValue={this.state.price}
                          />
                        </>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant='secondary' onClick={this.closeModel}>
                          Close
                        </Button>
                        <Button
                          variant='primary'
                          onClick={() => this.updateData(this.state.id)}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Col>
                ))}
              </>
            )}
          </Row>
        </Container>
      </>
    );
  }
}

export default withAuth0(FavFruit);
