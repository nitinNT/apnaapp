import React, { useEffect, useState } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import db from "../firebase";
import NavBar from "./NavBar";
import "./profile.css";

function MyProfile() {
  const { user } = useAuth();
  const [position, setPosition] = useState("");
  const [company, setCompany] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    db.collection("profile").doc("");
  }, []);
  const updateDetails = () => {
    db.collection("profile").doc(user.email.toString()).set({
      jobposition: position,
      company: company,
      status: status,
    });
  };
  return (
    <div>
      <NavBar email={user.email} />
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
            style={{ marginLeft: "11%" }}
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
              <Form.Group controlId="exampleForm">
                <Form.Label>Job Position</Form.Label>
                <Form.Control
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm">
                <Form.Label>Company</Form.Label>
                <Form.Control
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="exampleForm">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  type="text"
                  value={status}
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
