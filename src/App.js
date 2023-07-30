//import logo from './logo.svg';
import React from 'react';
import './App.css';
import Quiz from './Quiz'; 
import ButtonAppBar from './ButtonAppBar';
import { Container,AppBar } from '@mui/material';
import './Quiz.css';

function App() { 
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a 
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
<div> 

      <ButtonAppBar/>
      <div className='displayContainer'> 
        <Container>
          <Quiz />
        </Container>

      </div>
    </div>
  );
}

export default App;
