import React, { useState } from "react";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useHistory } from "react-router-dom";
import { useToasts } from "react-toast-notifications";

import { MDBBtn, MDBIcon, MDBModalFooter } from "mdbreact";

import "./SignIn.css";

import { useAuth } from "../contexts/AuthContext";
import db from "../firebase";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signin } = useAuth();
  const { resetPassword, googleSignIn } = useAuth();

  const history = useHistory();
  const { addToast } = useToasts();
  const submitSignIn = async (e) => {
    e.preventDefault();
    try {
      await signin(email, password);
      addToast("Successfully Logged", {
        appearance: "success",
        autoDismiss: true,
      });
      history.push("/home");
    } catch {
      addToast("Wrong Credentials ", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  const forgotPassword = async () => {
    try {
      await resetPassword(email);
      addToast("Password Reset Link Sent Successfully ", {
        appearance: "info",
        autoDismiss: true,
      });
    } catch {
      addToast("Invalid Email ", { appearance: "error", autoDismiss: true });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await googleSignIn();
      addToast("Successfully Logged", {
        appearance: "success",
        autoDismiss: true,
      });

      history.push("/home");
    } catch {
      addToast("Some Error Please Try Again ", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };
  return (
    <div>
      <div className="login__form is-Responsive">
        <Form.Group controlId="formBasicText">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Row>
          <Button as={Col} variant="danger" onClick={forgotPassword}>
            Forgot Password
          </Button>
          <Button as={Col} variant="primary" onClick={(e) => submitSignIn(e)}>
            Login
          </Button>
        </Form.Row>
        <p className="font-small dark-grey-text text-right d-flex justify-content-center mb-3 pt-2">
          or Sign in with:
        </p>
        <div className="row my-3 d-flex justify-content-center">
          <MDBBtn
            type="button"
            color="white"
            rounded
            className="z-depth-1a"
            onClick={handleGoogleLogin}
          >
            <MDBIcon fab icon="google-plus-g" className="blue-text" />
          </MDBBtn>
        </div>
        <MDBModalFooter className="mx-5 pt-3 mb-1">
          <p className="font-small grey-text d-flex justify-content-end">
            Not Registered?
            <a href="/register" className="blue-text ml-1">
              Sign Up
            </a>
          </p>
        </MDBModalFooter>
      </div>
    </div>
  );
}

export default SignIn;
