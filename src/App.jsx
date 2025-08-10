import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <Header/>
      <AppRoutes/>
    </>
  );
}

export default App;