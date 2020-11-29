import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "./NavBar";
import Card from "react-bootstrap/Card";
import db from "../firebase";

import "../components/Home.css";
import {  CardDeck, Spinner } from "react-bootstrap";

import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { CheckCircleFill, HandThumbsUp, XCircleFill  } from "react-bootstrap-icons";


function ViewPost(props) {
  const { user } = useAuth();
  const [post, setPost] = useState("");

  const [loading,setLoading] = useState(true);

  const [comments,setComments] = useState([]);
  const [comment,setComment] = useState("");
  const postID = props.location.state.id;

  const submitComment=()=>{
      db.collection("posts").doc(postID.toString()).collection('comments').add({
          user:user.email,
          comment:comment,
          timestamp:new Date(),
          upvotes:0,
          ans:'N'

      })
      setComment("")
  }
  const setVote =(e,id,initial)=>{
       db.collection('posts').doc(postID.toString()).collection('comments').doc(id.toString()).update({
         upvotes:initial+1
       })
  }
  const setAnswer =(e,id)=>{
      console.log(id);
      if (post.solved==='N'){
          db.collection('posts').doc(postID.toString()).collection('comments').doc(id.toString()).update({
              ans:'Y'
          })
          db.collection('posts').doc(postID.toString()).update({
              timestamp:new Date(),
              localtimestamp:new Date().toLocaleString(),
              solved:'Y'
          })
      }
  }
  useEffect(() => {
    db.collection("posts")
      .doc(postID.toString())
      .get()
      .then((snapshot) => setPost({ id: snapshot.id, ...snapshot.data() }));
    
    db.collection("posts").doc(postID.toString()).collection('comments').orderBy('timestamp','desc').onSnapshot(snapshot=>{
        setLoading(false);
        setComments(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
    })
  },[]);

  return (
    <div>
      <NavBar email={user.email} />
      <Card className="test">
        <Card.Img
          variant="top"
          src={post.image}
          width={300}
          height={300}
        />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.desc}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">posted on {post.localtimestamp} </small>
          {post.solved==='Y'? 
          <small className="text-center" style={{float:"right"}}><CheckCircleFill/></small>
          :<small className="text-center" style={{float:"right"}}><XCircleFill/></small>
          }
        </Card.Footer>
      </Card>

        {loading ? <div><Spinner animation="grow" variant="dark" /> </div>:
        <div className="comments">
          <h6>Comments</h6>
          <InputGroup size="sm">
          <Form.Control as="textarea" rows={2} 
          value={comment} 
          onChange={e => setComment(e.target.value)}
          placeholder="Enter Comments" />
  
          <Button variant="outline-secondary" onClick={submitComment}>Comment</Button>
          </InputGroup>
          <CardDeck style={{ display : 'flex' , flexDirection: 'column'}}>
              {console.log(comments)}
                {
                    comments.map(comment=>{
                  return <Card
                  border={comment.ans==='Y' ?"success":"danger"}
                  key={comment.id}>
                  <Card.Body>
                  <blockquote className="blockquote mb-1">
                  <p>{comment.comment}</p>
                  <footer className="blockquote-footer">
                  commented by 
                  <cite title="Source Title">{comment.user}</cite>
                  </footer>
                  </blockquote>
                  
                    {(post.user===user.email  && post.solved==='N' )?
                      <small className="text-center" style={{float:"left"}} >
                          <Button variant="outline-success" onClick={e => setAnswer(e,comment.id)}>IS this Answer?</Button>
                      </small>
                    : 
                      <small className="text-center" style={{float:"right"}} >
                          <HandThumbsUp onClick={e => setVote(e,comment.id,comment.upvotes)}/>
                          {comment.upvotes}
                      </small>
                    }
                      
                  </Card.Body>
                   </Card>   
                    })
                }
              
  
          </CardDeck>
          </div>
        }
        
    </div>
  );
}

export default ViewPost;
