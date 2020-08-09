import React, { Component } from 'react';
import { Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import studentSvc from './StudentService';
import walletService from '../wallets/WalletService';


export default class StudentTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
            students: [],
        };
    }

    componentDidMount() {
        this._loadData();
    }

    async _loadData() {
        const students = await studentSvc.getList();
        // const wallets = await walletService.getList();
        // students.forEach(st => {
        //     const wallet = wallets.find(w => w.key === st.viId);
        //     if(wallet){
        //         st.sodu = wallet.sodu;
        //     }
        // })
        this.setState({
            students,
        });
    }

    
    render() {
    
        // Expression - Bieu thuc - Do something & return value
        // Statement - Cau lenh - Do something
        const { students } = this.state;

        return(
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Mã Sinh Viên</th>
                        <th>Họ Tên</th>
                        <th>Lớp</th>
                        <th>Mã Tài Khoản Ví</th>
                        <th>Email</th>
                        <th>CMND</th>
                        <th>Số Dư</th>
                        <th>Khoa</th>
                        <th>&nbsp;</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    students.map(st => (
                        <tr key={st.maSv}>
                            <td>{st.maSv}</td>
                            <td>{st.tenSv}</td>
                            <td>{st.lop}</td>
                            <td>{st.account?.email}</td>
                            <td>{st.cmnd}</td>
                            <td>{st.wallet?.soDu}</td>
                            <td>{st.khoa}</td>
                            <td>
                                <Link to={`/students/${st.maSv}`} className="btn btn-success btn-sm">Xem</Link>
                                &nbsp; &nbsp;
                                <Button variant="danger" size="sm">Xóa</Button>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </Table>
        );
    }
}