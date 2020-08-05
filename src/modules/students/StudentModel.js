import * as Yup from 'yup';


export default class StudentModel {
    static maSvRule = Yup.string()
        .length(7, 'Phai nhap du 7 ky tu')
        .required('Vui long nhap Ma Sinh Vien');

    static tenSvRule = Yup.string()
        .max(50, 'Toi da 50 ky tu')
        .required('Vui long nhap Ho va Ten');
    
    static lopRule = Yup.string()
        .max(10, 'Toi da 10 ky tu')
        .required('Vui long nhap Lop');

    static cmndRule = Yup.string()
        .max(12, 'Toi da 12 ky tu')
        .required('Vui long nhap CMND');

    static soduRule = Yup.string()
        .max(10, 'Toi da 10 ky tu')
        .required('Vui long nhap So Du');

    static emailRule = Yup.string()
		.email()
		.max(100, 'Too Long!')
		.required('Vui long nhap Email');

    static passwordRule = Yup.string()
        .min(8, 'Too Short!')
        .max(100, 'Too Long!')
        .required('Required');

    static falcutyRule = Yup.string()
        .oneOf(['it', 'fashion'], 'Not a valid branch name')
        .required('Vui long chon Khoa');

    static modelRule = Yup.object().shape({
        maSv: StudentModel.maSvRule,
        tenSv: StudentModel.tenSvRule,
        email: StudentModel.emailRule,
        lop: StudentModel.lopRule,
        cmnd: StudentModel.cmndRule,
        sodu: StudentModel.soduRule,
        khoa: StudentModel.falcutyRule,
    });
}