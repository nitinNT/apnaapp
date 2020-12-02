import React, { useState } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Home.css";

import db, { auth, storage } from "../firebase";
import Modal from "react-bootstrap/Modal";

import { useAuth } from "../contexts/AuthContext";
import Posts from "./Posts";
import { useToasts } from "react-toast-notifications";



function AddNewPost() {
    const createKeyWords = (name)=>{
      let arr=[]

      let cur='';

      name.split('').forEach((letter)=>{
        cur+=letter
        arr.push(cur)
      })
      return arr;
    }

    const  generateKeyWords=(fields)=>{
      const [tag , desc ,sfx] = fields;
      
      const suffix = sfx.length >0 ? `${sfx}.` : '';
      let arrayTag= tag.split(" ")
      
      let arrayDesc= desc.split(" ")
      

      const keywordtagWithoutDesc = createKeyWords(`${tag}${suffix}`)
      const keyworddesc= createKeyWords(`${desc}${suffix}`)
      return [
        ...new Set([
          ...keywordtagWithoutDesc,
          ...keyworddesc,
          ...arrayTag,
          ...arrayDesc
        ])
      ]
    }
    const [title,setTitle]= useState("");
    const [desc,setDesc] = useState("");
    const [tags,setTags]= useState("");
    const [image,setImage]=useState(null);

    const {addToast} = useToasts();

    const [show, setShow] = useState(false);

    const { user } = useAuth();

    const handleClose = () => setShow(false);


    const handleShow = () => {
      if (user.emailVerified===false)
        {
          addToast('Please Verify your Email address',{appearance:'warning',autoDismiss:true})
          auth.currentUser.sendEmailVerification().then(()=>{
            addToast('Email Verification Link Sent',{appearance:'info',autoDismiss:true})
          })
          .catch(err=>console.log(err))
        }
        else{
          setShow(true);
        }
      
    }
    const handleSave=()=>{        
        const uploadTask=storage.ref(`images/${image.name}`).put(image);
        let keywords=generateKeyWords([tags,desc,''])
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
                    tags:tags,
                    keywords:keywords
                  }).then(doc=>{
                    addToast(`Issue Added Successfully`,{appearance:'success',autoDismiss:true})
                    let postTags= tags.split(" ");
                    postTags.map(a=>{
                      db.collection('tags').doc(a.toString()).collection('posts').add({
                        postid:doc.id
                      })
                      db.collection('tags').doc(a.toString()).set({
                        tag:a.toString()
                      })
                    })
                    
                  })
                  .catch(error=>{
                    addToast('Error in Adding Issue',{appearance:'error',autoDismiss:true})
                  })                  
                })
            }
        )

        setShow(false);
        setTags("");
        setTitle("");
        setImage(null);
        setDesc("");
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
