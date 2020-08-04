import React from "react";
import {Row, Col} from "react-bootstrap";
import { Link } from 'react-router-dom';


import StudentTable from "../../modules/students/StudentTable.js";
// import StudentService from "../../modules/students/StudentService.js";
// import WalletService from "../../modules/wallets/WalletService.js";


export default function StudentListPage(){
  return (   
    <Row>
      <Col as="h3" md={12} className="mt-5 mb-4">Danh Sách Sinh Viên</Col>
      <Col md={12} className="mb-4">
        <Link to={`/students/create`} className="btn btn-info btn-sm">Tạo Tài Khoản Ví</Link>
      </Col>
      <Col md={12} className="mb-4">
          {/* margin - padding - border */}
        <StudentTable/>
      </Col>
    </Row>
  );
};
 

