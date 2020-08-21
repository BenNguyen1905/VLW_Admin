import React, { Component } from 'react';
import {Form, Col, Button} from 'react-bootstrap';
import { Field, Formik, ErrorMessage } from 'formik';
import { NavLink } from 'react-router-dom';

import accountSvc from '../auth/AccountService';
import StudentModel from './StudentModel';
import studentSvc from './StudentService';


const initialStudent = {
    maSv: '',
    tenSv: '',
    lop: '',
    cmnd: '',
    soDu: '',
    khoa: '',
}

const initialAccount = {
    email: '',
}

export default class StudentDetailForm extends Component{
    
    get isEdit() {
        return Boolean(this.props.maSv);
    }

    constructor(props) {
        super(props);
        this.state = {
            student: undefined,
            account: undefined,
        };
    }

    componentDidMount() {
        this._loadData();
    }

    async _loadData() {
        const { maSv } = this.props;
        if (!maSv) {
            return;
        }
        const student = await studentSvc.getByMaSv(maSv);
        const account = await accountSvc.getById(student.accountId);
        // console.log({ student });
        this.setState({
            student,
            account,
        })
    }

    _submitForm = (formValues) => {
        const {
            onFormSubmit,
        } = this.props;
        const {
            student,
        } = this.state;
        if (this.isEdit) {
            onFormSubmit({
                ...formValues,
                wallet: student.wallet,
            });
        }
        else {
            onFormSubmit(formValues);
        }
    }
    
    render() {
        const {
            student = initialStudent,
            account = initialAccount,
        } = this.state;
        const formValues = {
            ...student,
            ...account,
            soDu: student.wallet?.soDu || 0,
        };

        return(
            <Formik
                initialValues={formValues}
                enableReinitialize
                validationSchema={this.isEdit
                    ? StudentModel.editModelRule
                    : StudentModel.createModelRule
                }
                onSubmit={(values, actions) => {
                    this._submitForm(values);
                    actions.setSubmitting(false);
                }}
            >
                {({handleSubmit, errors}) => (
                    <Form onSubmit={handleSubmit} noValidate>
                        {/* <div>{JSON.stringify(errors)}</div> */}
                        <fieldset>
                            <legend>Thông tin cá nhân</legend>
                            <Form.Row>
                                <Field name="maSv">
                                    {({
                                        field, // { name, value, onChange, onBlur }
                                        form, //: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                        //meta,
                                    }) => (
                                        <Form.Group as={Col} controlId="maSv">
                                            <Form.Label>Mã Sinh Viên</Form.Label>
                                            <Form.Control type="text" {...field} 
                                                disabled={this.isEdit}
                                            />
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
                            </Form.Row>
                            <Form.Row>
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
                        </fieldset>
                        <fieldset>
                            <legend>Tài khoản ví</legend>
                            <Form.Row>
                                <Field name="email">
                                    {({ field }) => (
                                    <Form.Group as={Col} controlId="email">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            {...field}
                                            disabled={this.isEdit}
                                            type="email"
                                        />
                                        <ErrorMessage
                                            name="email"
                                            className="text-danger"
                                            component="div"
                                        />
                                    </Form.Group>
                                    )}
                                </Field>
                                {!this.isEdit &&
                                <>
                                    <Field name="password">
                                        {({ field }) => (
                                        <Form.Group as={Col} controlId="password">
                                            <Form.Label>Mật khẩu</Form.Label>
                                            <Form.Control
                                                {...field}
                                                disabled={this.isEdit}
                                                type="password"
                                            />
                                            <ErrorMessage
                                                name="password"
                                                className="text-danger"
                                                component="div"
                                            />
                                        </Form.Group>
                                        )}
                                    </Field>
                                    <Field name="passwordConfirmation">
                                        {({ field }) => (
                                        <Form.Group as={Col} controlId="passwordConfirmation">
                                            <Form.Label>Nhập lại mật khẩu</Form.Label>
                                            <Form.Control type="password" {...field} />
                                            <ErrorMessage
                                                name="passwordConfirmation"
                                                className="text-danger"
                                                component="div"
                                            />
                                        </Form.Group>
                                        )}
                                    </Field>
                                </>
                                }
                            </Form.Row>
                            
                            <Form.Row>
                                <Field name="soDu">
                                    {({ field }) => (
                                        <Form.Group as={Col} controlId="soDu">
                                            <Form.Label>Số Dư</Form.Label>
                                            <Form.Control
                                                {...field}
                                                type="number"
                                                // disabled={this.isEdit}
                                            />
                                            <ErrorMessage
                                                name="soDu"
                                                className="text-danger"
                                                component="div"
                                            />
                                        </Form.Group>
                                    )}
                                </Field>
                            </Form.Row>
                        </fieldset>
                        
                        {/* {this.isEdit && (
                            <>
                            <Button>Nạp tiền</Button>
                            &nbsp; &nbsp;
                            <Button>Đổi mật khẩu</Button>
                            &nbsp; &nbsp; | &nbsp; &nbsp;
                            </>
                        )} */}
                        <Button variant="primary" type="submit">
                            Lưu
                        </Button>
                        &nbsp; &nbsp;
                        <Button variant="danger">
                            <NavLink to="/students">
                                Hủy
                            </NavLink> 
                        </Button>
                    </Form>
                )}
            </Formik>
        );

    }
};