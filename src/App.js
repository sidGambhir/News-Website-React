import React, {useState, useEffect} from "react";
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.css'
import {Navbar} from 'react-bootstrap';


import axios from "axios";
import './App.css';
import Article from "./Article";

import { Select } from '@chakra-ui/react'
// import Header from "./Header";

const clientId = "588815007694-2t58oohj5sb31t01e87c6uepr3d3d357.apps.googleusercontent.com";

function App() {

  //
  // const handleFailure = (result) => {
  //   alert(result);
  // }
  // const handleLogin = (googleData) => {
  //   console.log(googleData);
  // }

  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  );

  const handleFailure = (result) => {
    alert(result);
  };

  const handleLogin = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });

    const data = await res.json();
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
  };
  const handleLogout = () => {
    localStorage.removeItem('loginData');
    setLoginData(null);
  };
  //
  
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const apiKey = "f44ceb56f02d4e2b90c92523129f5aa4";
  const [country, setCountry] = useState("in");
  const [topic, setTopic] = useState("general");
  const [url, setUrl] = useState(`https://newsapi.org/v2/top-headlines?country=${country}&pageSize=100&apiKey=${apiKey}`);

  

  const countryChange = e => {
    
    setUrl(`https://newsapi.org/v2/top-headlines?country=${e.target.value}&category=${topic}&pageSize=100&apiKey=${apiKey}`)
   
    setCountry(e.target.value);
    
  }

  const topicChange = e => {
    setUrl(`https://newsapi.org/v2/top-headlines?country=${country}&category=${e.target.value}&pageSize=100&apiKey=${apiKey}`)
    setTopic(e.target.value);
    
  }

  useEffect(() => {
    // axios.get("https://gnews.io/api/v4/top-headlines?&lang=en&token=ac11ba9d3a81aa130dfa1e1f97c8a6b0")
    axios.get(url)
    .then(res => {
      setNews(res.data.articles);
      

    }).catch(error => {
      console.log(error);
    })
  }, [url]);

  const handleChange = e => {
    setSearch(e.target.value);
  };

  const filteredNews = news.filter(article => 
    article.title.toLowerCase().includes(search.toLowerCase())
    // setUrl(`https://newsapi.org/v2/top-headlines?country=${e.target.value}&pageSize=100&apiKey=${apiKey}`)
  );

  

  return (
    
         <div className="news-app">
        
      
          <div>
            {loginData ? (
              <div>
               


                <Navbar class="navbar navbar-dark bg-primary sticky-top">
  
  <div class="collapse navbar-collapse" id="navbarText">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Features</a>
      </li>
     
      
    </ul>
    <Select className = "select-drop-down" placeholder='Select category' onChange={topicChange} variant='filled' size='lg'> 
                    
                    <option value='general'>General</option>
                    <option value='business'>Business</option>
                    <option value='science'>Science</option>
                    <option value='entertainment'>Entertainment</option>
                    <option value='sports'>Sports</option>
                    <option value='technology'>Technology</option>

    </Select>
    <select defaultValue="in" onChange={countryChange}>
                    <option value = "us">us</option>
                    <option value = "in">in</option>
                    <option value = "gb">gb</option>
                  </select>
    <form class="form-inline">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
   
  </form>

    <span class="navbar-text badge badge-success">
    <h6>{loginData.name}</h6>
    </span>
    <div>
      
      <img className = "profile-pic" src = {loginData.picture}></img>
    </div>
    <button type="button" class="btn btn-dark" onClick={handleLogout}>Logout</button>
    
  </div>
</Navbar>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Dropdown
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Something else here</a>
        </div>
      </li>
      
      <Select className = "select-drop-down" placeholder='Select category' onChange={topicChange} variant='filled' size='lg'> 
                    
                    <option value='general'>General</option>
                    <option value='business'>Business</option>
                    <option value='science'>Science</option>
                    <option value='entertainment'>Entertainment</option>
                    <option value='sports'>Sports</option>
                    <option value='technology'>Technology</option>

    </Select>
      
      
      
    </ul>
    {/* <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
      <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
    </form> */}
    <form class="form-inline my-2 my-lg-0">
    <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" onChange={handleChange}/>
   
  </form>


    <span class="navbar-text badge badge-success">
    <h6>{loginData.name}</h6>
    </span>
    <div>
      
      <img className = "profile-pic" src = {loginData.picture}></img>
    </div>
    <button type="button" class="btn btn-dark" onClick={handleLogout}>Logout</button>
  </div>
</nav>

          
                        <div className="news-search">
                   
                  </div>
                  
                  
                  {filteredNews.map(article => {
                    return (
                      <Article 
                        key = {article.publishedAt + article.title}
                        title = {article.title}
                        desc = {article.description}
                        url = {article.url}
                        img = {article.urlToImage}
                        
                      />
                    )
                  })}
              </div>
            ) :
              (
                  <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  buttonText="Log in with Google"
                  onSuccess={handleLogin}
                  onFailure={handleFailure}
                  cookiePolicy={'single_host_origin'}
              ></GoogleLogin>
              )
              }
          </div>    

          
          
        
        
      
          
    </div>
    
   
  );
}

export default App;
