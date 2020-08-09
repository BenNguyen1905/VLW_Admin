import firebase from '../../data-store/firebase';
import accountSvc from '../auth/AccountService';


class StudentService {

    async getList() {
        let snapshot = await firebase.students().get();
        if (snapshot.empty) return [];

        const students = snapshot.docs.map(d => d.data());
        // students = [{ maSv: '', accountId: 'abc' }, { maSv: '', accountId: 'xyz' }];

        const accountIds = students.map(st => st.accountId);
        // accountIds = ['abc', 'xyz'];
        
        snapshot = await firebase.accounts().where('uid', 'in', accountIds).get();
        const accounts = snapshot.docs.map(d => d.data());
        // accounts = [{ email: '', uid: 'abc' }, { email: '', uid: 'xyz' }];

        students.forEach(st => {
            const acc = accounts.find(a => a.uid === st.accountId);
            st.account = acc;
        });
        
        return students;
    }

    async getByMaSv(maSv) {
        const snapshot = await firebase.student(maSv).get();
        return snapshot.empty ? null: snapshot.data();
    }

    async create(formValues) {
        const {
            email,
            password,
            passwordConfirmation, // remove from "student"
            role,
            soDu,
            ...newStudent
        } = formValues;
        debugger;
        const newAccount = await accountSvc.create({
            email,
            password,
            displayName: newStudent.tenSv,
            role,
        });

        newStudent.accountId = newAccount.uid;
        newStudent.wallet = {
            soDu,
            history: [],
        };
        await firebase.student(newStudent.maSv).set(newStudent);
        return newStudent;
    }

    async update(formValues) {
        const {
            accountId, // Remove from "student"
            wallet,
            ...student
        } = formValues;
        await firebase.student(formValues.maSv).set(student);
    }
}

export default new StudentService();
