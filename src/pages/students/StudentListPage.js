import React from "react";
import {Row, Col} from "react-bootstrap";


import StudentTable from "../../modules/students/StudentTable.js";


export default function StudentListPage(){
  return (   
    <Row>
      <Col as="h3" md={12} className="mt-5 mb-4">Danh Sách Sinh Viên</Col>
      <Col md={12} className="mb-4">
          {/* margin - padding - border */}
        <StudentTable/>
      </Col>
    </Row>
  );
}
