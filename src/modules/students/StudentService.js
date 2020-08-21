import firebase from '../../data-store/firebase';
import accountSvc from '../auth/AccountService';


class StudentService {

    async getList(includeDisabled) {
        let snapshot;

        const query = firebase.students().orderBy('maSv')
        if (includeDisabled) {
            snapshot = await query.get();
        }
        else {
            snapshot = await query.where('enabled', '==', true).get();
        }

        if (snapshot.empty) return [];
        const students = snapshot.docs.map(d => d.data());
        const accountIds = students.map(st => st.accountId);
        
        snapshot = await firebase.accounts().where('uid', '==', accountIds).get();
        const accounts = snapshot.docs.map(d => d.data());
        students.forEach(st => {
            const acc = accounts.find(a => a.uid === st.accountId);
            st.account = acc;
        });
        
        return students;
    }

    async searchByMaSv(maSv, includeDisabled) {
        const query = firebase.students()
            .orderBy('maSv')
            .where('maSv', '>=', maSv)
            .where('maSv', '<=', maSv + '\uf8ff')

        let snapshot;
        if (includeDisabled) {
            snapshot = await query.get();
        }
        else {
            snapshot = await query.where('enabled', '==', true).get();
        }

        if (snapshot.empty) return [];
        const students = snapshot.docs.map(d => d.data());
        const accountIds = students.map(st => st.accountId);
        
        snapshot = await firebase.accounts().where('uid', '==', accountIds).get();
        const accounts = snapshot.docs.map(d => d.data());
        students.forEach(st => {
            const acc = accounts.find(a => a.uid === st.accountId);
            st.account = acc;
        });
        
        return students;
    }

    async getPagedList(pageIndex, pageSize, includeDisabled) {
        const allStudents = await this.getList(includeDisabled)
        const total = allStudents.length
        if (total === 0) return {
            total: 0,
            data: [],
        };

        return {
            total: allStudents.length,
            data: this._doPaging(pageIndex, pageSize, allStudents),
        }
    }

    async searchPagedByMaSv(maSv, pageIndex, pageSize, includeDisabled) {
        const allStudents = await this.searchByMaSv(maSv, includeDisabled)
        const total = allStudents.length
        if (total === 0) return {
            total: 0,
            data: [],
        };

        return {
            total: allStudents.length,
            data: this._doPaging(pageIndex, pageSize, allStudents),
        }
    }

    _doPaging(pageIndex, pageSize, allStudents) {
        const startIndex = pageIndex * pageSize
        const endIndex = startIndex + pageSize
        return allStudents.slice(startIndex, endIndex)
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
   
        const newAccount = await accountSvc.create({
            email,
            password,
            role,
            maSv : newStudent.maSv,
        });

        newStudent.accountId = newAccount.uid;
        newStudent.wallet = {
            soDu,
            history: [],
        };
        await firebase.student(newStudent.maSv).set({
            ...newStudent,
            enabled: true,
        });
        return newStudent;
    }

    async update(formValues) {
        const {
            accountId, // Remove from "student"
            wallet,
            soDu,
            uid,
            ...student
        } = formValues;
        await firebase.student(formValues.maSv).update({
            ...student,
            wallet: {
                ...wallet,
                soDu,
            },
        });
    }

    disable(maSv) {
        return firebase.student(maSv).update({
            enabled: false,
        });
    }

    enable(maSv) {
        return firebase.student(maSv).update({
            enabled: true,
        });
    }

}

export default new StudentService();
