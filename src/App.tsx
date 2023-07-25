import './App.css';
import { HashRouter, Routes, Route } from "react-router-dom";
import NavBar from './Component/NavBar';
import { useEffect } from 'react';
import { AppRoutes } from './AppRoutes';
import { APIService } from './APIService';
import { Project, User, Comment } from './Component/Interface';



const App:React.FC = () => {


  useEffect(() => {
    
    // get queryString (http://localhost:3000/login?id=1 to ?id=1)
    const queryString = window.location.search;

    // get params value from the queryString
    // urlParam.get("id") = 1
    const urlParam = new URLSearchParams(queryString);
    APIService.getUserById(urlParam?.get('userId') || "").then((data:User) => {
      sessionStorage.setItem("name", data.name);
      sessionStorage.setItem("userId", data.id);
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("avatar_url", data.avatarUrl);
      window.location.href = "https://larrywongkahei.github.io/MentorShip/";
    })
    
    // check if urlParam has code param for github oauth login
    // if(urlParam.has("code") && window.location.hash === "#/github"){
    //   APIService.FetchDataFromGithub(urlParam?.get("code") || "");
    // }

    // check if urlParam has code param for linkedin oauth login
    // else if(urlParam.has("code") && window.location.hash === "#/linkedin"){
    //   APIService.FetchDataFromLinkedin(urlParam?.get("code") || "");
    // }
}, [])

  return (
    <HashRouter>
    <NavBar />
    <Routes>
      {AppRoutes.map((route:any, index:number) => {
        const { element, ...rest } = route;
        return <Route key={index} {...rest} element={element}/>;
      })}
    </Routes>
  </HashRouter>
  );
}

export default App;
