import React, { useState } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Home.css";

import db, { storage } from "../firebase";
import Modal from "react-bootstrap/Modal";

import { useAuth } from "../contexts/AuthContext";
import Posts from "./Posts";
import { useToasts } from "react-toast-notifications";



function AddNewPost() {
    const [title,setTitle]= useState("");
    const [desc,setDesc] = useState("");
    const [tags,setTags]= useState("");
    const [image,setImage]=useState(null);

    const {addToast} = useToasts();

    const [show, setShow] = useState(false);

    const { user } = useAuth();

    const handleClose = () => setShow(false);


    const handleShow = () => {
      setShow(true);
    }
    const handleSave=()=>{        
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot=>{},
            error=>{
                console.log(error)
            },
            ()=>{
                storage
                .ref("images")
                .child(image.name)
                .getDownloadURL()
                .then(url=>{
                  db.collection('posts').add({
                    user:user.email,
                    title:title,
                    desc:desc,
                    image:url,
                    timestamp: new Date(),
                    localtimestamp:new Date().toLocaleString(),
                    solved:'N',
                    tags:tags
                  })
                })
            }
        )

        setShow(false);
        setTags("");
        setTitle("");
        setImage(null);
        setDesc("");
        addToast('Added New Issue',{appearance:'success',autoDismiss:true})
    }
    
  return (
    <div>
      <div className="headings">
        <h4>New Posts</h4>
        <PlusCircleFill
          className="plus_button"
          onClick={handleShow}
          size={45}
        />
      </div>
      <Posts/>  
      
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text"
                value={title}
                onChange={e=>setTitle(e.target.value)}
            />

          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={desc} onChange={e=>setDesc(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={e=>setImage(e.target.files[0])} />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Tags</Form.Label>
            <Form.Control type="type" placeholder="Tags seperated by space" value={tags} onChange={e=>setTags(e.target.value)} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>


      </div>
  );
}

export default AddNewPost;
