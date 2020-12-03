import React, { useState } from 'react'
import { Spinner , Card, Button } from 'react-bootstrap';
import AsyncSelect from 'react-select/async';
import db from '../firebase';
import '../components/Home.css';
import { useHistory } from 'react-router-dom';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';


function Search() {
    const [tag,setTag] =useState([])
    const history= useHistory();
    const handleOnChange=(tags)=>{
        setTag([tags])          
    }

    const viewPost=(e,id)=>{
        e.preventDefault();  
        history.push({
          pathname:"/post",
          state:{id:id}
        })

    }
    const [loading, setLoading ] = useState(true)
    const loadOptions = async (inputValue)=>{
        inputValue = inputValue.replace(/\W/g, "");
        return new Promise((resolve => {
            db.collection('posts')
                    .where('keywords','array-contains',inputValue)
                    .get()
                    .then(docs => {
                        if (!docs.empty) {
                            let recommendedTags = []
                            docs.forEach(function (doc) {
                                const tag = {
                                    value: doc.id,
                                    label: doc.data().desc,
                                    title:doc.data().title,
                                    solved:doc.data().solved,
                                    timestamp:doc.data().localtimestamp
                                }
                                recommendedTags.push(tag)
                            });
                            setLoading(false);
                            return resolve(recommendedTags)
                        } else {
                            return resolve([])
                        }
                    })
        
        })
        )
    }
    return (
        <div>
            {/* <Row>
                <Col>
                <Form.Control type="text"
            value={search}
            onChange={e => setResults(e)}
            /> 
                </Col>
                <Col>
                {(loading  && search.length>1)? <Button variant="primary" disabled > 
                <Spinner
                as="span"
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
                />
                </Button>:<span>Loading</span>}
                </Col>
            </Row>             */}
            <h6>Search using tag or by its description  </h6>
            <AsyncSelect
                    loadOptions={loadOptions}
                    onChange={handleOnChange}         
            />
            <p>RESULTS </p>
            
            {
                loading ?  <div className="center">
                <Spinner animation="grow" variant="dark" />
              </div>:
                tag.map(t=>{
                    return <Card
                    key={t.value}
                    >
                    <Card.Body>
                    <Card.Title>{t.title}</Card.Title>
                    <Card.Text>
                    {t.label}
                    </Card.Text>
                    <Button variant="dark" onClick={e => viewPost(e,t.value)}>View</Button>
                    </Card.Body>

                    <Card.Footer>
          <small className="text-muted">posted on {t.timestamp} </small>
          {t.solved==='Y'? 
          <small className="text-center" style={{float:"right"}}><CheckCircleFill/></small>
          :<small className="text-center" style={{float:"right"}}><XCircleFill/></small>
          }
        </Card.Footer>
                     </Card>   
                })
            }
        </div>
    )
}

export default Search
