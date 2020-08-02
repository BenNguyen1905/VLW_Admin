import React, { Component } from 'react';

export default class DetailForm extends Component{
    render(){
        return(
            <form onSubmit={ this.handleUpdateItem }>
                <label htmlFor={this.props.dbkey + 'itemname'}>Mã sinh viên</label>
                <input 
                id={this.props.dbkey + 'itemname'}
                onChange={ this.itemChange } 
                value={ this.state.maSv } 
                name="maSv"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itemname'}>Tên sinh viên</label>
                <input 
                id={this.props.dbkey + 'itemname'}
                onChange={ this.itemChange } 
                value={ this.state.tenSv } 
                name="tenSv"
                />
                <label htmlFor={this.props.dbkey + 'itemname'}>Mã tài khoản ví</label>
                <input 
                id={this.props.dbkey + 'itemname'}
                onChange={ this.itemChange } 
                value={ this.state.viId } 
                name="maTk"
                />
                <br/>
                <label htmlFor={this.props.dbkey + 'itemname'}>Lớp</label>
                <input 
                id={this.props.dbkey + 'itemname'}
                onChange={ this.itemChange } 
                value={ this.state.lop } 
                name="lop"
                />
                <label htmlFor={this.props.dbkey + 'itemname'}>Email</label>
                <input 
                id={this.props.dbkey + 'itemname'}
                type="email"
                onChange={ this.itemChange } 
                value={ this.state.email } 
                name="email"
                />
                <label htmlFor={this.props.dbkey + 'itemname'}>CMND</label>
                <input 
                id={this.props.dbkey + 'itemname'}
                onChange={ this.itemChange } 
                type="text"
                value={ this.state.cmnd } 
                name="cmnd"
                />
                <label htmlFor={this.props.dbkey + 'itemamaount'}>Amount</label>
                <input 
                id={this.props.dbkey + 'itemamaount'}
                type="number"
                onChange={ this.itemChange } 
                value={ this.state.sodu } 
                name="sodu"
                />
                <br/> 
                <label htmlFor={this.props.dbkey + 'itemselect'}>KHOA</label>
                <select 
                id={this.props.dbkey + 'KHOA'}
                value={ this.state.khoa }
                onChange={ this.itemChange }
                name="khoa"
                >
                <option value="CNTT">Công nghệ thông tin</option>
                <option value="TT">Thời trang</option>
                <option value="DL">Du lịch</option>
                </select>
                <button>Save</button>
            </form>
        );
    }
} 