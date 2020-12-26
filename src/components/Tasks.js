import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Form,
  Container,
  Modal,
  Table,
  Accordion,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import { PlusCircleFill } from "react-bootstrap-icons";
import { useToasts } from "react-toast-notifications";
import { useAuth } from "../contexts/AuthContext";
import db, { auth } from "../firebase";

function Tasks({ teamid }) {
  const [addButton, setAddButton] = useState(false);
  const { user } = useAuth();
  const [show, setShow] = useState(false);
  const { addToast } = useToasts();
  const handleClose = () => setShow(false);

  const [name, setName] = useState("");
  const [priority, setPriority] = useState("");
  const [assigned, setAssigned] = useState("");
  const [date, setDate] = useState();
  const [comdate, setComDate] = useState("");
  const [comments, setComments] = useState("");

  const [milestones, setMilestones] = useState([]);
  const handleSave = () => {
    db.collection("teams").doc(teamid.toString()).collection("milestones").add({
      name: name,
      assignedDate: date,
      priority: priority,
      assignedto: assigned,
      status: "open",
    });
    setShow(false);
  };
  const updateMdata = (id) => {
    db.collection("teams")
      .doc(teamid.toString())
      .collection("milestones")
      .doc(id.toString())
      .update({
        status: "closed",
        completionDate: comdate,
        comments: comments,
      });
    setComments("");
  };
  const handleShow = () => {
    if (user.emailVerified === false) {
      addToast("Please Verify your Email address", {
        appearance: "warning",
        autoDismiss: true,
      });
      auth.currentUser
        .sendEmailVerification()
        .then(() => {
          addToast("Email Verification Link Sent", {
            appearance: "info",
            autoDismiss: true,
          });
        })
        .catch((err) => console.log(err));
    } else {
      if (addButton) setShow(true);
      else addToast("You are Not Admin", { appearance: "info" });
    }
  };
  useEffect(() => {
    db.collection("teams")
      .doc(teamid.toString())
      .get()
      .then((snapshot) => {
        if (snapshot.data().createdBy === user.email) {
          setAddButton(true);
        }
      });
    db.collection("teams")
      .doc(teamid.toString())
      .collection("milestones")
      .onSnapshot((snapshot) => {
        setMilestones(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
      });
  }, []);
  return (
    <Container>
      <PlusCircleFill className="plus_button" onClick={handleShow} size={40} />
      <Table bordered hover>
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((t, i) => {
            return (
              <tr key={i}>
                <td>
                  <Accordion>
                    <Card>
                      <Card.Header>
                        <Accordion.Toggle
                          as={Form.Label}
                          variant="link"
                          eventKey="0"
                        >
                          {t.name}
                        </Accordion.Toggle>
                      </Card.Header>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <Form.Group controlId="completiondate">
                            <Form.Label>Select Completion Date</Form.Label>
                            <Form.Control
                              type="date"
                              name="completiondate"
                              placeholder="Date of Completion"
                              value={comdate}
                              onChange={(e) => setComDate(e.target.value)}
                            />
                          </Form.Group>
                          <Form.Group controlId="comments">
                            <Form.Label>Comments</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="comments"
                              rows={2}
                              placeholder="Comments"
                              value={comments}
                              onChange={(e) => setComments(e.target.value)}
                            />
                            <Button
                              variant="dark"
                              key={t.id}
                              onClick={() => updateMdata(t.id)}
                            >
                              Update
                            </Button>
                          </Form.Group>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
                </td>
                <td style={{ width: "1%", whiteSpace: "nowrap" }}>
                  {t.status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New MileStone</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput2">
            <h6>Priority</h6> <br />
            <ButtonGroup className="mb-2">
              <Button variant="info" onClick={(e) => setPriority("Level 1")}>
                Level 1
              </Button>
              <Button variant="warning" onClick={(e) => setPriority("Level 2")}>
                Level 2
              </Button>
              <Button variant="danger" onClick={(e) => setPriority("Level 3")}>
                Level 3
              </Button>
            </ButtonGroup>
          </Form.Group>
          <Form.Group controlId="date">
            <Form.Label>Select Date</Form.Label>
            <Form.Control
              type="date"
              name="date"
              placeholder="Date of Assigned"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlInput3">
            <Form.Label>Assigned to </Form.Label>
            <Form.Control
              type="text"
              value={assigned}
              onChange={(e) => setAssigned(e.target.value)}
            />
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
    </Container>
  );
}

export default Tasks;
