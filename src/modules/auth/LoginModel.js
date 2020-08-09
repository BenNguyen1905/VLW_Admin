import * as Yup from 'yup';


export default class LoginModel {
    static emailRule = Yup.string()
        .email('Email không hợp lệ')
        .required('Vui lòng nhập email');

    static passwordRule = Yup.string()
        .required('Vui lòng nhập mật khẩu');

    static modelRule = Yup.object().shape({
        email: LoginModel.emailRule,
        password: LoginModel.passwordRule,
    });
}