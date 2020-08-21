import React, { Component } from 'react';

export default class StudentSearchList extends Component{
    constructor(){
        super();
        this.state = {
            search: ''
        };
    }

    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)});
    }
    render(){
        const filteredStudents = this.props.students.filter(
            (student) => {
                return student.maSv.indexOf(this.state.search) 
                !== -1;
            }
        );
        return(
            <div>
                <input type="text" value={this.state.search} onChange={this.updateSearch.bind(this)} />
                <ul>
                    {filteredStudents.map((student)=>{
                        return <StudentSearchList student={student}
                        key={student.id}/>
                    })}
                </ul>
            </div>
        );
    }
}