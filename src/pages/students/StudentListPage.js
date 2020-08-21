import React, { useState } from "react";
import { Row, Col, } from "react-bootstrap";
import { Link } from 'react-router-dom';


import StudentTable from "../../modules/students/StudentTable.js";


export default function StudentListPage() {
  const [includeDisabled, setIncludeDisabled] = useState(false);
  const [searchKeywords, setSearchKeywords] = useState("");


  const onCheckboxChanged = (evt) => {
    setIncludeDisabled(evt.target.checked);
  };



  return (
   
      <Row>
      <Col as="h3" md={12} className="mt-5 mb-4">Danh Sách Sinh Viên</Col>
      <Col md={6} className="mb-4">
          <Link to={`/students/create`} className="btn btn-info btn-sm">Tạo Tài Khoản Ví</Link>
          {' '}|{' '}
          <input placeholder="Tìm kiếm" size="20" type="text" value={searchKeywords} onChange={(evt) => setSearchKeywords(evt.target.value)}/>
          {' '}|{' '}
          <input
            onClick={onCheckboxChanged}
            value={includeDisabled}
            type="checkbox"
            id="cbIncludeDisabled"
          />
          {' '}  {' '}
          <label
            htmlFor="cbIncludeDisabled"
            onClick={onCheckboxChanged}
          >
            Hiển thị tài khoản vô hiệu
          </label>
      </Col>
      <Col md={12} className="mb-4">
          <StudentTable includeDisabled={includeDisabled} searchKeywords={searchKeywords}/>
      </Col>
      </Row>
   
  );
};
 

