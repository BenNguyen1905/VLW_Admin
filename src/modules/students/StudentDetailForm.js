import React, { Component } from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import { Field, Formik, ErrorMessage } from 'formik';

import StudentModel from './StudentModel';
import studentSvc from './StudentService';


const initialValues = {
    maSv: '',
    tenSv: '',
    lop: '',
    email: '',
    cmnd: '',
    sodu: '',
    khoa: '',
}

export default class StudentDetailForm extends Component{
    
    constructor(props) {
        super(props);
        this.state = {
            student: undefined,
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
        // console.log({ student });
        this.setState({
            student,
        })
    }
    
    render(){
        const { student = initialValues } = this.state;
        const { onFormSubmit } = this.props;
        return(
            <Formik
                initialValues={student}
                enableReinitialize
                validationSchema={StudentModel.modelRule}
                onSubmit={(values, actions) => {
                    onFormSubmit(values);
                    actions.setSubmitting(false);
                    // alert(JSON.stringify(values, null, 2));
                }}
            >
                {({handleSubmit}) => (
                    <Form onSubmit={handleSubmit} noValidate>
                        <Form.Row>
                            <Field name="maSv">
                                {({
                                    field, // { name, value, onChange, onBlur }
                                    form, //: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                    //meta,
                                }) => (
                                    <Form.Group as={Col} controlId="maSv">
                                        <Form.Label>Mã Sinh Viên</Form.Label>
                                        <Form.Control type="text" {...field} />
                                        <ErrorMessage
                                            name="maSv"
                                            className="text-danger"
                                            component="div"
                                        />
                                        {/* {JSON.stringify(form)} */}
                                        {/* {JSON.stringify(meta)} */}
                                    </Form.Group>
                                )}
                            </Field>
                            <Field name="tenSv">
                                {({ field }) => (
                                    <Form.Group as={Col} controlId="tenSv">
                                        <Form.Label>Tên Sinh Viên</Form.Label>
                                        <Form.Control type="text"  {...field} />
                                        <ErrorMessage
                                            name="tenSv"
                                            className="text-danger"
                                            component="div"
                                        />
                                    </Form.Group>
                                )}
                            </Field>
                            {/* <Field name="viId">
                                {({ field }) => (
                                        <Form.Group as={Col} controlId="viId">
                                        <Form.Label>Mã Tài Khoản Ví</Form.Label>
                                        <Form.Control type="text" {...field} />
                                </Form.Group>
                            )}
                            </Field> */}
                            <Field name="lop">
                                {({ field }) => (
                                    <Form.Group as={Col} controlId="lop">
                                        <Form.Label>Lớp</Form.Label>
                                        <Form.Control type="text" {...field} />
                                        <ErrorMessage
                                                name="lop"
                                                className="text-danger"
                                                component="div"
                                            />
                                    </Form.Group>   
                                )}
                            </Field>
                        </Form.Row>
                        <Form.Row>
                            <Field name="email">
                                {({ field }) => (
                                <Form.Group as={Col} controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control type="email" {...field} />
                                    <ErrorMessage
                                                name="email"
                                                className="text-danger"
                                                component="div"
                                            />
                                </Form.Group>
                                )}
                            </Field>
                            <Field name="cmnd">
                                {({ field }) => (
                                    <Form.Group as={Col} controlId="cmnd">
                                        <Form.Label>CMND</Form.Label>
                                        <Form.Control type="text" {...field}/>
                                        <ErrorMessage
                                                name="cmnd"
                                                className="text-danger"
                                                component="div"
                                            />
                                    </Form.Group>
                                )}
                            </Field>
                            <Field name="khoa">
                                {({ field }) => (
                                    <Form.Group as={Col} controlId="khoa">
                                        <Form.Label>Khoa</Form.Label>
                                        <Form.Control as="select"{...field}>
                                            <option>-- Chọn khoa --</option>
                                            <option value="it">CNTT</option>
                                            <option value="fashion">Thời trang</option>
                                        </Form.Control>
                                        <ErrorMessage
                                                name="khoa"
                                                className="text-danger"
                                                component="div"
                                            />
                                    </Form.Group>
                                )}
                            </Field>
                        </Form.Row>
                        
                        <Form.Row>
                        <Field name="sodu">
                            {({ field }) => (
                                <Form.Group as={Col} controlId="sodu">
                                    <Form.Label>Số Dư</Form.Label>
                                    <Form.Control type="text"{...field} />
                                    <ErrorMessage
                                            name="sodu"
                                            className="text-danger"
                                            component="div"
                                        />
                                </Form.Group>
                            )}
                        </Field>
                       
                        </Form.Row>
                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                        &nbsp; &nbsp;
                        <Button variant="danger" type="reset">
                            Hủy
                        </Button>
                    </Form>
                )}
            </Formik>
        );

    };
}