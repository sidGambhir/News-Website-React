import React, {useState, useEffect} from "react";
import axios from "axios";
import fetch from "node-fetch";
import "./Article.css";
import { useNavigate } from 'react-router';
// import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css'
import {Modal, Button, Container} from "react-bootstrap";
// import Button from 'react-bootstrap/Button';
const NLPCloudClient = require('nlpcloud');

const client = new NLPCloudClient('bart-large-cnn','4eC39HqLyjWDarjtT1zdp7dc')

var flag = 0

const Article = ({title, desc, url, img}) => {
    
    
    // let finalText = ""
    // let summary = ""
    var flag = 0;
    var tempSummary = "";
    const [finalText, setFinalText] = useState("loading")
    const [summary, setSummary] = useState("loading")
    const [open, setOpen] = useState(false);
    // const [setTextURL] = useState("https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url=");
    const [textURL, setTextURL] = useState("https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url=")
    const [siteName, setSiteName] = useState("")
    const [transSum, setTransSum] = useState("");
    const [categories, setCategories] = useState([]);
    // var textURL = "https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url="
    
    function handleModalOpen(e){
        setOpen(true);
       
        // textURL = "https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url=" + e.target.value;
        setTextURL("https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url=" + e.target.value)
        // setTextURL()
       // textURL = "https://extractorapi.com/api/v1/extractor/?apikey=d7e43671089ee93294d575e055abd14494d21d93&url=" + e.target.value

        // console.log(typeof(e.target.value));
        // console.log(textURL);
        console.log(textURL)
        if(textURL != "https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url="){
            axios.get(textURL).then(res => {
            
                // console.log(res.data.objects[0].text)
                // finalText = res.data.objects[0].text
                setFinalText(res.data.objects[0].text)
                setCategories(res.data.objects[0].categories)
                console.log(res.data.objects[0].categories[0].name)
                document.getElementById("categories-list").innerHTML = "Categories: ";
                for(var i = 0; i < res.data.objects[0].categories.length; i++){
                    document.getElementById("categories-list").innerHTML += res.data.objects[0].categories[i].name;
                    if(i != res.data.objects[0].categories.length - 1){
                        document.getElementById("categories-list").innerHTML += ", ";
                    }
                }
                // categories.forEach((item) => {
                //     document.getElementById("categories-list").innerHTML += item;
                // })
                setSiteName(res.data.objects[0].siteName)
                
                
                
            }).catch(error => {
                console.log(error);
            })
    
            async function query(data) {
                const response = await fetch(
                    "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
                    {
                        headers: { Authorization: "Bearer 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" },
                        method: "POST",
                        body: JSON.stringify(data),
                        
                    }
                );
                const result = await response.json();
                return result;
            }
            
            query({"inputs": finalText }).then((response) => {
                // summary = response[0].summary_text
                setSummary(response[0].summary_text)
                
                // console.log(JSON.stringify(response));
            });
    
            
         
                 let data = {
                     q : summary,
                     source: "en",
                     target: "hi"
                 }
                 axios.post(`https://libretranslate.de/translate`, data)
                 .then((response) => {
                    setTransSum(response.data.translatedText)
                 });
        }
        
         

            
       
        
    }

    function translate(){

        if(flag == 0){

            document.getElementById("summary-text").innerHTML = transSum;
            document.getElementById("translate-button").innerHTML = "To English"
            flag = 1

        }else{

            document.getElementById("summary-text").innerHTML = summary;
            document.getElementById("translate-button").innerHTML = "To Hindi"
            flag = 0
            
        }
       
    }
   
    
    // function translate(){
    //     console.log(flag)
    //     if(flag == 0){

    //         let data = {
    //             q : summary,
    //             source: "en",
    //             target: "hi"
    //         }
            

    //         axios.post(`https://libretranslate.de/translate`, data)
    //         .then((response) => {
    //             //console.log(response.data.translatedText)
                
                
                
    //            //  setResultText(response.data.translatedText)
    //         });

    //         flag = 1
    //         console.log(flag)
    //     }else{

    //         setSummary(tempSummary)
    //         flag = 0

    //     }
     
    // }

    // console.log(finalText)
    // const handleModalOpen = e => {

    // }

    function handleModalClose(){
        setOpen(false);
    }

    // useEffect(() => {
    //     // axios.get("https://gnews.io/api/v4/top-headlines?&lang=en&token=ac11ba9d3a81aa130dfa1e1f97c8a6b0")
    //     axios.get(textURL)
    //     .then(res => {
    //     //   setNews(res.data.articles);
    //       console.log(res);
          
    
    //     }).catch(error => {
    //       console.log(error);
    //     })
    //   }, [textURL]);
   
    return (
        <Container className="p-3">
        
            <Container className="p-5 mb-4 bg-light rounded-3 border py-3 my-3 big-container">
            <div className="news-container container-md">
            <div className="news-col">
                
                <div className="article">
                <img src = {img} alt = {title}></img>
                    <h1 className="title-name">{title}</h1>
                    {/* <img src = {image} alt = {title}></img> */}
                </div>
                <div className="article-data">
                    <p className="article-desc">{desc}</p>
                    
                    <a className = "link" href={url} target="_blank" rel="noreferrer noopener">Read more</a>
                    
                    <Button value = {url} className = "modal-button" onClick={handleModalOpen}>Summary</Button>   
                    <Modal show = {open}>
                        <Modal.Header id = "header-modal">
                            <h4 id = "modal-header"><strong>{title}</strong></h4>
                            
                        </Modal.Header>
                        <Modal.Header id = "addons">
                        <i>Published by: {siteName}</i>
                        <i id = "categories-list"></i>
                        
                        </Modal.Header>
                        <Modal.Body id = "modal-body">
                            <img className="modal-image" src = {img} alt = {title}></img>
                            <div >
                                <p id = "summary-id">Article Summary</p>
                                <p id = "summary-text">{summary}</p>
                            </div>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button  variant="secondary" onClick = {handleModalClose}>
                                Close
                            </Button>
                            <Button id = "translate-button" onClick = {translate}>To Hindi</Button>
                        </Modal.Footer>
                    </Modal>
                    

                </div>
            </div>
        </div>
        </Container>
        
        </Container>
        
        
    )
}

export default Article;