import React, { Component } from 'react';
import { Row, Col, } from 'react-bootstrap';

import StudentDetailForm from '../../modules/students/StudentDetailForm';

export default class StudentEditPage extends Component{
    render() {
      const {
        match: {
          params
        }
      } = this.props;
      return(
          <Row>
          <Col as="h3" md={12} className="mt-5 mb-4">Cập Nhật Tài Khoản</Col>
          <Col md={12} className="mb-4">
            <StudentDetailForm id={params.id}/>
          </Col>
        </Row>
      );
    }
}