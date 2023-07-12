import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import NavBar from './Component/NavBar';
import React, { Component, useState, useEffect } from 'react';
import APIService from './APIService';



function App() {

  
  useEffect(() => {
    const queryString = window.location.search;
    const urlParam = new URLSearchParams(queryString);
    if(urlParam.has("code")){
      APIService.FetchDataFromGithub(urlParam.get("code"));
    }
    if(sessionStorage.length > 0){
      APIService.fetchUserOrCreateUser()
    }
}, [])


  return (
    <BrowserRouter>
    <NavBar />
    <Routes>
      {AppRoutes.map((route, index) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element}/>;
      })}
    </Routes>
  </BrowserRouter>
  );
}

export default App;
