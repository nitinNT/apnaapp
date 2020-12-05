import React, { useState } from "react";
import { PlusCircleFill } from "react-bootstrap-icons";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Home.css";

import db, { auth } from "../firebase";
import Modal from "react-bootstrap/Modal";

import { useAuth } from "../contexts/AuthContext";
import { useToasts } from "react-toast-notifications";
import Teams from "./Teams";



function AddNewTeam() {
  const [name,setName]= useState("");
  const[desc,setDesc] =useState("");
  const [ members, setMembers] = useState("");
  
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
      const teamMembers= members.split(" ")  
      var regex= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
      let flag=1
      teamMembers.map(a=>{
          if (!regex.test(a))
          {
              alert("Please Enter Proper Email Address in Members Field")
              flag=0
          }
      })
      if (flag===1){
          db.collection('teams').add({
              teamName:name,
              teamDesc: desc,
              createdBy:user.email,
              localtimestamp:new Date().toLocaleString(),
              timestamp: new Date(),
              members:teamMembers
              
          })
          .then(doc=>{
              addToast('Created New Team Successfully',{appearance:'success',autoDismiss:true})
          })
      }    
      
      setShow(false);
      setDesc("");
      setMembers("");
      setName("")
  }
    
  return (
    <div>
      <div className="headings">
        <h4>Your Teams</h4>
        <PlusCircleFill
          className="plus_button"
          onClick={handleShow}
          size={45}
        />
      </div>
      <Teams/>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Team</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Team Name</Form.Label>
            <Form.Control type="text"
                value={name}
                onChange={e=>setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <Form.Label>Team Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={desc} onChange={e=>setDesc(e.target.value)}/>
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Members</Form.Label>
            <Form.Control type="type" placeholder="Add Members by its email separated by space" value={members} onChange={e=>setMembers(e.target.value)} />
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

export default AddNewTeam;
