import * as Yup from 'yup';


export default class LoginModel {
    static passwordRule = Yup.string()
        .min(3, 'Too Short!')
        .max(11, 'Too Long!')
        .required('Vui long nhap Mat Khau');

    static modelRule = Yup.object().shape({
        maSv: LoginModel.passwordRule,
        // tenSv: StudentModel.tenSvRule,
        // email: StudentModel.emailRule,
        // lop: StudentModel.lopRule,
        // cmnd: StudentModel.cmndRule,
        // sodu: StudentModel.soduRule,
        // khoa: StudentModel.falcutyRule,
    });
}