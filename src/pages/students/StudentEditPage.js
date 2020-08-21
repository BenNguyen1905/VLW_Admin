import React, { Component } from 'react';
import { Row, Col, } from 'react-bootstrap';

import StudentDetailForm from '../../modules/students/StudentDetailForm';
import studentSvc from '../../modules/students/StudentService';

export default class StudentEditPage extends Component{

  _updateStudent = async (formValues) => {
    await studentSvc.update(formValues);
  }

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
          <StudentDetailForm maSv={params.maSv} onFormSubmit={this._updateStudent}/>
        </Col>
      </Row>
    );
  }
}