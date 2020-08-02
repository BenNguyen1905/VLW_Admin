import React, { Component } from 'react';
import {Form, Col, Button} from 'react-bootstrap';

import studentSvc from './student-service';

export default class StudentDetailForm extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            student: {},
        };
    }

    componentDidMount() {
        this._loadData();
    }

    async _loadData() {
        const { id } = this.props;
        if (!id) {
            return;
        }
        const student = await studentSvc.getById(id);
        this.setState({
            student,
        })
    }
    
    render(){
        const { student: st } = this.state;
        return(
            <Form>
                        <Form.Row>
                            <Form.Group as={Col} controlId="maSv">
                            <Form.Label>Mã Sinh Viên</Form.Label>
                            <Form.Control type="text" value={st.maSv} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="tenSv">
                            <Form.Label>Tên Sinh Viên</Form.Label>
                            <Form.Control type="text" value={st.tenSv} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="viId">
                            <Form.Label>Mã Tài Khoản Ví</Form.Label>
                            <Form.Control type="text" value={st.viId} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="lop">
                            <Form.Label>Lớp</Form.Label>
                            <Form.Control type="text" value={st.lop} />
                            </Form.Group>
                        </Form.Row>

                        <Form.Group controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={st.email} />
                        </Form.Group>

                        <Form.Group controlId="cmnd">
                            <Form.Label>CMND</Form.Label>
                            <Form.Control type="text" value={st.cmnd} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group as={Col} controlId="sodu">
                            <Form.Label>Số Dư</Form.Label>
                            <Form.Control type="text" value={st.sodu} />
                            </Form.Group>

                            <Form.Group as={Col} controlId="khoa">
                            <Form.Label>Khoa</Form.Label>
                            <Form.Control as="select" defaultValue="Choose...">
                                <option>CNTT</option>
                                <option>Thời trang</option>
                                <option>Du lịch</option>
                            </Form.Control>
                            </Form.Group>
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                        &nbsp; &nbsp;
                        <Button variant="danger" type="submit">
                            Hủy
                        </Button>
                    </Form>
        );

    };
}