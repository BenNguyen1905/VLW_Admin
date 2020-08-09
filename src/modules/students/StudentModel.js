import * as Yup from 'yup';


export default class StudentModel {

    //#region Validation rules

    static keyRule = Yup.string().required();

    static maSvRule = Yup.string()
        .length(7, 'Phai nhap du 7 ky tu')
        .required('Vui long nhap Ma Sinh vien');

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
        .required('Required');

    static passwordRule = Yup.string()
        .min(8, 'Mật khẩu tối thiểu 8 ký tự')
        .max(100, 'Mật khẩu tối đa 100 ký tự')
        .required('Vui lòng nhập mật khẩu');


    static falcutyRule = Yup.string()
        .oneOf(['it', 'fashion'], 'Hãy chọn 1 khoa từ danh sách')
        .required('Hãy chọn 1 khoa từ danh sách');

    static createModelRule = Yup.object().shape({
        maSv: StudentModel.maSvRule,
        tenSv: StudentModel.tenSvRule,
        email: StudentModel.emailRule,
        lop: StudentModel.lopRule,
        cmnd: StudentModel.cmndRule,
        soDu: StudentModel.soduRule,
        khoa: StudentModel.falcutyRule,
        password: StudentModel.passwordRule,
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Mật khẩu không khớp')
    });

    static editModelRule = Yup.object().shape({
        key: StudentModel.keyRule,
        maSv: StudentModel.maSvRule,
        tenSv: StudentModel.tenSvRule,
        email: StudentModel.emailRule,
        lop: StudentModel.lopRule,
        cmnd: StudentModel.cmndRule,
        sodu: StudentModel.soduRule,
        khoa: StudentModel.falcutyRule,
    });

    //#endregion Validation rules


    // static create(rawData) {
    //     return {
    //         key: '',
    //         password: rawData.password,
    //         passwordConfirm: rawData.passwordConfirm,
    //         maSv: rawData.maSv,
    //         tenSv: rawData.tenSv,
    //         email: rawData.email,
    //         lop: rawData.lop,
    //         cmnd: rawData.cmnd,
    //         khoa: rawData.khoa,
    //         wallet: {
    //             sodu: rawData.sodu,
    //         },
    //     };
    // }

}