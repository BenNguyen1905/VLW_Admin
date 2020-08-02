import firebase from '../../data-store/firebase';


class StudentService {
    constructor() {
        this._dbRoot = firebase.database().ref();
        this._dbStudents = this._dbRoot.child('SINHVIEN');
    }

    getList() {
        return new Promise((resolve, reject) => {
            this._dbStudents.once('value', dataSnapshot => {
                const students = [];
                
                dataSnapshot.forEach(function(childSnapshot) {
                    const item = childSnapshot.val();
                    item.key = childSnapshot.key;
                    students.push(item);
                });
        
                resolve(students);
            });
        });
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this._dbStudents.child(id).once('value', (snapShot) => {
                // console.log({ snapShot });
                const student = snapShot.val();
                resolve(student);
            });
        });
    }
}

export default new StudentService();