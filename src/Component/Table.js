import React, { Component } from 'react'
import './myStyles.css'

class Tables extends Component {
  constructor(props) {
    super(props)
    this.state = {
      students: [
        { id: 1, name: 'Wasif', group: "k23t01", email: 'wasif@email.com', mssv:"X161026", sodu:50000, khoa:"CNTT"},
        { id: 2, name: 'Ali', group: "k23t01", email: 'ali@email.com', mssv:"X161026", sodu:50000, khoa:"CNTT" },
        { id: 3, name: 'Saad', group: "k23t01", email: 'saad@email.com', mssv:"X161026", sodu:50000, khoa:"CNTT" },
        { id: 4, name: 'Asad', group: "k23t01", email: 'asad@email.com', mssv:"X161026", sodu:50000, khoa:"CNTT" },
      ],
    }
  }

  renderTableData() {
    return this.state.students.map((student, index) => {
      const { id, name, group, email, mssv, sodu, khoa } = student
      return (
        <tr key={id}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{group}</td>
          <td>{email}</td>
          <td>{mssv}</td>
          <td>{sodu}</td>
          <td>{khoa}</td>
        </tr>
      )
    })
  }

  renderTableHeader() {
    const header = Object.keys(this.state.students[0])
    return header.map((key, index) => <th key={index}>{key.toUpperCase()}</th>)
  }

  render() {
    return (
        <table className="students">
          <tbody>
            <tr>{this.renderTableHeader()}</tr>
            {this.renderTableData()}
          </tbody>
        </table>
    )
  }
}

export default Tables
