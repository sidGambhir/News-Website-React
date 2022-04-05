import React, {useState} from "react";
import "./Article.css";
import { useNavigate } from 'react-router';
// import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.css'
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
                    
                    <Button className = "modal-button" onClick={handleModalOpen}>Summary</Button>
                    <Modal show = {open}>
                        <Modal.Header>
                            <h4><strong>{title}</strong></h4>
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