import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "./NavBar";
import Card from "react-bootstrap/Card";
import db from "../firebase";

import "../components/Home.css";
import {  CardDeck } from "react-bootstrap";

import InputGroup from 'react-bootstrap/InputGroup'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { HandThumbsUp } from "react-bootstrap-icons";

function ViewPost(props) {
  const { user } = useAuth();
  const [post, setPost] = useState("");

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
  const setVote =(e)=>{
      console.log('HELLO');
  }
  const setAnswer =(e,id)=>{
      console.log(id);
      if (post.solved==='N'){
          db.collection('posts').doc(postID.toString()).collection('comments').doc(id.toString()).update({
              ans:'Y'
          })
          db.collection('posts').doc(postID.toString()).update({
              timestamp:new Date(),
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
        setComments(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
    })
  },[]);

  return (
    <div>
      <NavBar email={user.email} />
      <Card className="test">
        <Card.Img
          variant="top"
          src="data:image/png;base64,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"
          width={300}
          height={300}
        />
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.desc}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">posted on {post.timestamp}</small>
        </Card.Footer>
      </Card>

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
                return <Card key={comment.id}>
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
                        <HandThumbsUp onClick={e => setVote(e,comment.id)}/>
                        {comment.upvotes}
                    </small>
                  }
                    
                </Card.Body>
                 </Card>   
                  })
              }
            

        </CardDeck>
      </div>
    </div>
  );
}

export default ViewPost;
