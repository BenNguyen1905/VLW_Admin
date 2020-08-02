// eslint-disable-next-line
import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import firebase from './data-store/firebase';
import Routes from './Routes';


export default function App() {
  return(
      <Routes/>
  )
};


class DetailForm extends Component {
  static defaultProps = {
    data: {},
  };

  constructor (props) {
    super(props);
    const { data } = props;

    console.log({data})

    this.state = {
      id: data.id,
      maSv: data.maSv,
      tenSv: data.tenSv,
      maTk: data.maTk,
      lop: data.lop,
      email: data.email,
      cmnd: data.cmnd,
      // amount: (props.amount == null) ? 0 : props.amount,
      khoa: data.khoa || 'CNTT',
      viId: data.viId,
      sodu: data.sodu,
    };
    this.onItemChange = this.itemChange.bind(this);
  }

  itemChange(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleFormSubmit = (e) => {
    e.preventDefault();
    this.props.onFormSubmit(this.state);
  }

  render() {
    return (
      <DetailForm/>
    );
  }
}


class NewItem extends Component {

  constructor (props) {
    super(props);
    this.state = {
      item: {},
    };
    this.dbRoot = firebase.database().ref();
    this.dbStudents = this.dbRoot.child('SINHVIEN');
    this.dbWallets = this.dbRoot.child('TAIKHOANVI'); 
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }


  async handleUpdateItem(formValue) {
    const { key, sodu, viId, ...student } = formValue;
    const newWalletRef = this.dbWallets.push();
    const newStudentRef = this.dbStudents.push();
    student.viId = newWalletRef.key;
    await Promise.all([
      newWalletRef.set({ sodu }),
      newStudentRef.set(student),
    ]);
    this.setState({
      item: {},
    });
  }

  render() {
    return (
      <DetailForm data={this.state.item} onFormSubmit={this.handleUpdateItem} />
    )
  }
}

class UpdateableItem extends Component {
  static defaultProps = {
    item: {},
  };

  constructor (props) {
    super(props);
    this.state = {
      item: props.item,
    };
    this.dbRoot = firebase.database().ref();
    this.dbStudents = this.dbRoot.child('SINHVIEN');
    this.dbWallets = this.dbRoot.child('TAIKHOANVI'); 
    this.handleUpdateItem = this.handleUpdateItem.bind(this);
  }

  componentDidMount() {
    this.loadWallet();
  }

  loadWallet() {
    const { item } = this.state;
    this.dbWallets.child(item.viId).once('value', (snapShot) => {
      // console.log({ snapShot });
      const wallet = snapShot.val();
      if (!wallet) return;

      this.setState(
        {
          item: {
            ...item,
            sodu: Number(wallet.sodu),
          },
        },
        () => {
          console.log({ newItem: this.state.item});
        }
      );
    })
  }

  async handleUpdateItem(formValue) {
    const { key, sodu, viId, ...student } = formValue;
    
    await Promise.all([
      this.dbStudents.child(key).set(student),
      this.dbWallets.child(viId).set({ sodu }),
    ]);
    
  }

  render() {
    console.log({item: this.state.item});
    return (
      <DetailForm data={this.state.item} onFormSubmit={this.handleUpdateItem} />
    )
  }
}

class AppOld extends Component {
  constructor () {
    super();
    this.state = {
      students: [],
      newMASV : ''
    };
    this.dbRoot = firebase.database().ref();
    this.dbStudents = this.dbRoot.child('SINHVIEN');
    this.dbWallets = this.dbRoot.child('TAIKHOANVI');
    this.onNewItemChange = this.onNewItemChange.bind(this);
    this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  componentDidMount() {
    this.dbStudents.on('value', dataSnapshot => {
      const students = [];
      
      dataSnapshot.forEach(function(childSnapshot) {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        students.push(item);
      });

      this.setState({
        students,
      });
    });
  }

  componentWillUnmount() {
    this.dbStudents.off();
  }

  handleNewItemSubmit(e) {
    e.preventDefault();
    if (this.state.newMASV && this.state.newMASV.trim().length !== 0) {
      this.dbItems.push({
        MASV: this.state.newMASV
      });
      this.setState({
        newMASV: ''
      });
    }
  }

  onNewItemChange(e) {
    this.setState({newMASV: e.target.value});
  }

  removeItem(key){
    this.dbItems.child(key).remove();
  }

  render() {
    var _this = this;
    return (
      <div className="App">
        <fieldset>
          <legend>Tạo mới</legend>
          <NewItem />
        </fieldset>
        <ul>
          {this.state.students.map(function(item) {
            return ( 
              <li key={ item.key }>
                <UpdateableItem item={item}/>
                <a href="https:/google.com" onClick={ _this.removeItem.bind(null, item['.key']) } style={{cursor: 'pointer', color: 'red'}}>Delete</a>
              </li>
            );
          })}
        </ul>
        <form onSubmit={ this.handleNewItemSubmit }>
          <input 
            onChange={ this.onNewItemChange } 
            value={ this.state.newMASV } 
          />
          <button>{ 'Add #' + (this.state.students.length + 1) }</button>
        </form>
      </div>
    );
  }
}
