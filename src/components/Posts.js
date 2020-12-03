import React,{useEffect, useState} from 'react'
import PostCard from "./PostCard";
import { Col, Container,Row, Spinner} from "react-bootstrap";
import db from "../firebase";
import '../components/Home.css'

function Posts() {
    const [posts,setPosts] = useState([]);
    const [loading,setLoading] = useState(true);
    useEffect(()=>{
        db.collection('posts').orderBy('timestamp','desc').onSnapshot((snapshot)=>{
            setLoading(false);
            setPosts(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})))
        }
        ); 
      },[])
    return (
        <div>
          {loading ?  
          <div className="center">
            <Spinner animation="grow" variant="dark" />
          </div>
          :
    <Container>
      {
          
          posts.map((post,i)=>(
            <Row key={i}>
                <Col>
                <PostCard
            postId={post.id}
            user={post.user}
            title={post.title}
            image={post.image}
            desc={post.desc}
            timestamp={post.localtimestamp}
            tags={post.tags}
            solved={post.solved}
            /> 
          
                </Col>
            </Row>  
          )  
          )
        }
      
      </Container>
 }
           
       
        </div>
    )
}

export default Posts
