import React from 'react'
import Card from "react-bootstrap/Card";
import { useHistory } from 'react-router-dom';
function PostCard({postId,title,desc,image,timestamp,user,tags,solved}) {
  const history = useHistory();
  const viewPost=(e)=>{
    e.preventDefault();

    
    history.push({
      pathname:"/post",
      state:{id:postId}
    })
    
  }
  return (

      <Card border={solved==='Y'?"success":"danger"} onClick={(e) => viewPost(e)}>
      <Card.Img variant="top" src={image}
        width={200}
        height={200}
      />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          {desc}
        </Card.Text>
      </Card.Body>
      <Card.Footer>
      <small className="text-muted" style={{float:"left"}} >
        {tags}

      </small>
        <small className="text-center" style={{float:"right"}} >posted by {user} on {timestamp}</small>
      </Card.Footer>
    </Card>

  )
}

export default PostCard;
