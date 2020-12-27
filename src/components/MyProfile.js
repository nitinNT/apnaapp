import React, { useEffect, useState } from "react";
import { Card, Row, Col, Image, Button, Form } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import db from "../firebase";
import NavBar from "./NavBar";
import "./profile.css";

function MyProfile() {
  const { user } = useAuth();
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    db.collection("profile")
      .doc(user.email)
      .get()
      .then((snapshot) =>
        setUserDetail({ id: snapshot.id, ...snapshot.data() })
      );
  }, []);
  const updateDetails = () => {
    db.collection("profile").doc(user.email.toString()).update({
      jobposition: position,
      company: company,
      status: status,
    });
  };
  return (
    <div>
      <NavBar email={user.email} />
      <h1> WORK IN PROGRESS.............</h1>
      <Row>
        <Col
          sm={4}
          style={{
            paddingTop: "50px",
            paddingLeft: "70px",
            paddingRight: "30px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Image
            roundedCircle
            style={{ marginLeft: "16%" }}
            width={200}
            height={200}
            src={user.photoURL}
            alt="Profile Photo"
          />
          <br />
          <Button>Change Photo</Button>
        </Col>
        <Col sm={8} style={{ paddingTop: "30px" }}>
          <Card>
            <Card.Body>
              <Form.Group controlId="exampleForm.Control1">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" value={user.email} readOnly />
              </Form.Group>
              <Form.Group controlId="exampleForm">
                <Form.Label>
                  Your Email Address is{" "}
                  {user.emailVerified ? (
                    <Button variant="success" disabled>
                      Verified
                    </Button>
                  ) : (
                    <Button variant="danger"></Button>
                  )}
                </Form.Label>
              </Form.Group>
              <Form.Group controlId="exampleForm1">
                <Form.Label>Job Position</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userDetail.jobposition}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm2">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userDetail.company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm3">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue={userDetail.status}
                  onChange={(e) => setStatus(e.target.value)}
                />
              </Form.Group>
              <Button style={{ float: "right" }} onClick={updateDetails}>
                Update
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default MyProfile;
