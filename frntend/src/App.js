import React from 'react';
import Nav from './components/Nav';
import Chat from './components/Chat';
import './App.css';


function App() {
  return (
    <div className="App">
      <div className="Navigation">
        <Nav/>
      </div>

      <div className="chatarea">
        <Chat/>
      </div>
      
    </div>
  );
}

export default App;
