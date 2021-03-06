import firebase from '../../data-store/firebase';


class AccountService {

    async create(formValues) {
        const {
            email,
            password,
            role = 'user',
            maSv,
        } = formValues;
        try {
            // Attempts to add account to test permission.
            await firebase.account(email).set({
                email,
                role,
                maSv,
            });

            let user;
            try {
             ({ user } = await firebase.createUserWithEmailAndPassword(email, password));
            }
            catch(accErr) {
                if (accErr?.code !== 'auth/email-already-in-use') {
                    throw accErr;
                }
            }

            await firebase.account(email).update({
                uid: user.uid,
            });
            
            return {
                uid: user.uid,
                email,
                role,
                maSv,
            };
        }
        catch (error) {
            console.error(error.message, error);
            return null;
        }
    }

    async getByEmail(email) {
        const snapshot = await firebase.account(email).get();
        return snapshot.empty ? null : snapshot.data();
    }

    async getById(id) {
        const snapshot = await firebase.accounts().where('uid', '==', id).get();
        return snapshot.empty ? null : snapshot.docs[0].data();
    }


    async importGoogleAccount(user) {
        const existingAccount = await this.getByEmail(user.email);
        if (existingAccount) {
            return existingAccount;
        }
        const newAccount = {
            uid: user.uid,
            displayName: user.displayName,
            email: user.email,
            role: 'admin',
        };
        await firebase.account(user.email).set(newAccount);
        return newAccount;
    }

    async signIn(email, password) {
        return await firebase.signInWithEmailAndPassword(email, password);
    }

    async changeCurrentUserPassword(newPassword) {
        await firebase.changePassword(newPassword);
    }

    async resetPassword(email) {
        await firebase.resetPassword(email);
    }
}

export default new AccountService();