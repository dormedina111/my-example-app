import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Lobby from './components/Lobby';
import CodeBlockPage from './components/CodeBlockPage';

function App() {
    return (
      <Router>
            <Routes>
                <Route path="/" element={<Lobby />} />
                <Route path="/codeblock/:title" element={<CodeBlockPage />} />
            </Routes>
        </Router>
    );
}

export default App;