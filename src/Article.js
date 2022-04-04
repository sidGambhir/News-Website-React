import React, {useState} from "react";
import "./Article.css";
import { useNavigate } from 'react-router';
// import Container from 'react-bootstrap/Container';

import {Modal, Button, Container} from "react-bootstrap";
// import Button from 'react-bootstrap/Button';


const Article = ({title, desc, url, img}) => {
    
    const [open, setOpen] = useState(false);
    
    function handleModalOpen(){
        setOpen(true);
    }
    function handleModalClose(){
        setOpen(false);
    }
    return (
        <Container className="p-3">
        
            <Container className="p-5 mb-4 bg-light rounded-3">
            <div className="news-container">
            <div className="news-row">
                <div className="article">
                <img src = {img} alt = {title}></img>
                    <h1 className="title-name">{title}</h1>
                    {/* <img src = {image} alt = {title}></img> */}
                </div>
                <div className="article-data">
                    <p className="article-desc">{desc}</p>
                    
                    <a href={url} target="_blank" rel="noreferrer noopener">Read more</a>
                    
                    <Button className = "modal-button" onClick={handleModalOpen}>Summary</Button>
                    <Modal show = {open}>
                        <Modal.Header>
                            <h4>{title}</h4>
                        </Modal.Header>
                        <Modal.Body>
                            <img className="modal-image" src = {img} alt = {title}></img>
                            <p>{desc}</p>
                            
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