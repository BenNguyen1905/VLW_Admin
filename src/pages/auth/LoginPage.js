import React, { Component } from  'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

export default class LoginPage extends Component{
    render(){
        return(
            <Row>
                <Col as="h3" md={12} className="mt-5 mb-4">Đăng Nhập</Col>
                <Col>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Địa Chỉ Email</Form.Label>
                            <Form.Control type="email"  />
                            <Form.Text className="text-muted">
                            
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Mật Khẩu</Form.Label>
                            <Form.Control type="password"  />
                        </Form.Group>
                        {/* <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group> */}
                        <Button variant="primary" type="submit">
                            Đăng Nhập 
                        </Button>
                    </Form>
                </Col>
            </Row>
        );
        
    }
}