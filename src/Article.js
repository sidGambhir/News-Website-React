import React, {useState, useEffect} from "react";
import axios from "axios";
import fetch from "node-fetch";
import "./Article.css";
import { useNavigate } from 'react-router';
// import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css'
import {Modal, Button, Container} from "react-bootstrap";
// import Button from 'react-bootstrap/Button';



const Article = ({title, desc, url, img}) => {
    
    
    // let finalText = ""
    // let summary = ""
    const [finalText, setFinalText] = useState("loading")
    const [summary, setSummary] = useState("loading")
    const [open, setOpen] = useState(false);
    const [setTextURL] = useState("https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url=");
    var textURL = "https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url="
    
    function handleModalOpen(e){
        setOpen(true);
       // setTextURL("https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url=" + e.target.value);
        textURL = "https://api.diffbot.com/v3/article?token=a6f2f81502e721c6eab7efb894955ff2&url=" + e.target.value;
        // console.log(typeof(e.target.value));
        // console.log(textURL);

        axios.get(textURL).then(res => {
            
            // console.log(res.data.objects[0].text)
            // finalText = res.data.objects[0].text
            setFinalText(res.data.objects[0].text)
            
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
                 console.log(response.data.translatedText)
                //  setResultText(response.data.translatedText)
             });
         


       
        
    }

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
                        <Modal.Header>
                            <h4><strong>{title}</strong></h4>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="modal-image" src = {img} alt = {title}></img>
                            <p>{summary}</p>
                            
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick = {handleModalClose}>
                                Close
                            </Button>
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