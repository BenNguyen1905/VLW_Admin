/* eslint-disable no-restricted-globals */
import React, { Component } from 'react';
import { Table, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import studentSvc from './StudentService';


export default class StudentTable extends Component{

    constructor(props) {
        super(props);
        this.state = {
            students: [],
            pageIndex: 0,
            pageSize: 10,
            total: 0,
        };
    }

    componentDidMount() {
        this._loadData();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.includeDisabled !== this.props.includeDisabled
            || prevProps.searchKeywords !== this.props.searchKeywords
            || prevState.pageIndex !== this.state.pageIndex
            || prevState.pageSize !== this.state.pageSize
        ) {
            this._loadData();
        }
    }

    async _loadData() {
        const { includeDisabled, searchKeywords } = this.props;
        let { students, pageIndex, pageSize, total } = this.state
        let result

        if (searchKeywords) {
            // students = await studentSvc.searchByMaSv(searchKeywords, includeDisabled);
            result = await studentSvc.searchPagedByMaSv(searchKeywords, pageIndex, pageSize, includeDisabled);
            students = result.data
            total = result.total
        }
        else {
            // students = await studentSvc.getList(includeDisabled);
            result = await studentSvc.getPagedList(pageIndex, pageSize, includeDisabled);
            students = result.data
            total = result.total
        }
        this.setState({
            students,
            total,
        });
    }

    async _disable(maSv) {
        if (confirm(`Bạn có chắc muốn vô hiệu hóa tài khoản mã ${maSv}?`)) {
            await studentSvc.disable(maSv);
            return this._loadData();
        }
    }

    async _enable(maSv) {
        await studentSvc.enable(maSv);
        return this._loadData();
    }

    _onPageSizeChanged = (evt) => {
        this.setState({
            pageSize: parseInt(evt.target.value),
        })
    }

    _onPageButtonClicked = (evt) => {
        this.setState({
            pageIndex: parseInt(evt.target.value) - 1,
        })
    }

    _renderPageButtons() {
        const { pageIndex, pageSize, total } = this.state
        const pageCount = Math.ceil(total / pageSize)
        const buttons = []
        for (let i = 1; i <= pageCount; ++i) {
            buttons.push(
                <React.Fragment key={i}>
                    <input
                        value={i}
                        onClick={this._onPageButtonClicked}
                        className={`btn ${i===pageIndex+1 ? 'btn-primary' : 'btn-secondary'}`}
                        type="button"
                    />
                    {' '}
                </React.Fragment>
            )
        }
        return buttons
    }

    render() {
        const {
            students,
            pageSize,
            total,
        } = this.state;
        return (
            <>
                <div>
                    Hiển thị <select onChange={this._onPageSizeChanged} value={pageSize}>
                        <option value="5">5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="50">50</option>
                    </select> / {total}
                    {' '}|{' '}
                    {this._renderPageButtons()}
                </div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Mã Sinh Viên</th>
                            <th>Họ Tên</th>
                            <th>Lớp</th>
                            {/* <th>Email</th> */}
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
                                {/* <td>{st.email}</td> */}
                                <td>{st.cmnd}</td>
                                <td>{st.wallet?.soDu}</td>
                                <td>{st.khoa}</td>
                                <td>
                                    <Link to={`/students/${st.maSv}`} className="btn btn-success btn-sm">Chi tiết</Link>
                                    &nbsp; &nbsp;
                                    {st.enabled
                                        ? <Button onClick={() => this._disable(st.maSv)} variant="danger" size="sm">Vô hiệu</Button>
                                        : <Button onClick={() => this._enable(st.maSv)} variant="info" size="sm">Kích hoạt</Button>
                                    }
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </Table>
            </>
        );
    }
}
