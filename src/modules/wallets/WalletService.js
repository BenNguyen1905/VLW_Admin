import firebase from '../../data-store/firebase';


class WalletService {
    constructor() {
        this._dbRoot = firebase.database().ref();
        this._dbStudents = this._dbRoot.child('SINHVIEN');
        this._dbWallets = this._dbRoot.child('TAIKHOANVI');
    }

    getList() {
        return new Promise((resolve, reject) => {
            this._dbWallets.once('value', dataSnapshot => {
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
            this._dbWallets.child(id).once('value', (snapShot) => {
                // console.log({ snapShot });
                const student = snapShot.val();

                this._dbWallets.child(student.viId).once('value', walletSnapshot => {
                    const wallet = walletSnapshot.val();
                    student.sodu = wallet.sodu;
                    resolve(student);
                });
            });
        });
    }

    async create(model) {
        const { sodu, ...student } = model;
        const newWalletRef = this._dbWallets.push();
        await newWalletRef.set({ sodu })
        const newStudentRef = this._dbStudents.push();
        student.viId = newWalletRef.key;
        await newStudentRef.set(student);
        return newStudentRef.key;
    }
}

export default new WalletService();