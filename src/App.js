import React from 'react';
import logo from './logo.jpg';
import './App.css';
import Tables from './Component/Table.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div className="Tittle">
          <p>Trang Quản lý chi tiêu sinh viên</p>
        </div>
        <div className="Table">
            <Tables/>    
          </div>
      </header>
    </div>
  );
}

export default App;
