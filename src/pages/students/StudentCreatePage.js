import React, { Component } from 'react';
import { Row, Col, } from 'react-bootstrap';

import StudentDetailForm from '../../modules/students/StudentDetailForm';
import studentSvc from '../../modules/students/StudentService';

export default class StudentEditPage extends Component {

    _addStudent = async (formValues) => {
        const newStudent = await studentSvc.create(formValues);
        // debugger;
        newStudent && this.props.history.push(`/students/${newStudent.maSv}`);
    }

    render() {
      return(
        <Row>
          <Col as="h3" md={12} className="mt-5 mb-4">Tạo Tài Khoản</Col>
          <Col md={12} className="mb-4">
            <StudentDetailForm onFormSubmit={this._addStudent} />
          </Col>
        </Row>
      );
    }
}