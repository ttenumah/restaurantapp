import React, { useState, useContext } from "react";

import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { registerUser } from "../lib/auth";
import AppContext from "../context/AppContext";

const Register = () => {
  const [data, setData] = useState({ email: "", username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);

  // define validation function
  const validateForm = () => {
    let errors = {};
    if (!data.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = "Invalid email address.";
    }
    if (!data.username) {
      errors.username = "Username is required.";
    }
    if (!data.password) {
      errors.password = "Password is required.";
    }
    setError(errors);
    return Object.keys(errors).length === 0;
  };

  return (
    <Container>
      <Row>
        <Col sm="12" md={{ size: 5, offset: 3 }}>
          <div className="paper">
            <div className="header">
              <img src="https://strapi.io/assets/images/logo.png" />
            </div>
            <section className="wrapper">
              {Object.entries(error).length !== 0 &&
                error.constructor === Object &&
                Object.values(error).map((value) => (
                  <div key={value} style={{ marginBottom: 10 }}>
                    <small style={{ color: "red" }}>{value}</small>
                  </div>
                ))}
              <Form>
                <fieldset disabled={loading}>
                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      disabled={loading}
                      onChange={(e) =>
                        setData({ ...data, username: e.target.value })
                      }
                      value={data.username}
                      type="text"
                      name="username"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Email:</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, email: e.target.value })
                      }
                      value={data.email}
                      type="email"
                      name="email"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup style={{ marginBottom: 30 }}>
                    <Label>Password:</Label>
                    <Input
                      onChange={(e) =>
                        setData({ ...data, password: e.target.value })
                      }
                      value={data.password}
                      type="password"
                      name="password"
                      style={{ height: 50, fontSize: "1.2em" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    
                    <Button
                      style={{ float: "right", width: 120 }}
                      color="primary"
                      disabled={loading}
                      onClick={() => {
                        if (validateForm()) {
                          setLoading(true);
                          registerUser(
                            data.username,
                            data.email,
                            data.password
                          )
                            .then((res) => {
                              // set authed user in global context object
                              appContext.setUser(res.data.user);
                              setLoading(false);
                              // show success message
                              alert("Account Created");
                            })
                            .catch((error) => {
                              setError(error.response.data);
                              setLoading(false);
                            });
                        }
                      }}
                    >
                      {loading ? "Loading.." : "Submit"}
                    </Button>
                  </FormGroup>
                </fieldset>
              </Form>
            </section>
          </div>
        </Col>
      </Row>
      <style jsx>
        {`
          .paper {
            border: 1px solid lightgray;
            box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2),
              0px 1px 1px 0px rgba(0, 0, 0, 0.14),
              0px 2px 1px -1px rgba(0, 0, 0, 0.12);
            border-radius: 6px;
            margin-top: 90px;
          }
          .notification {
            color: #ab003c;
          }
          .header {
            width: 100%;
            height: 120px;
            background-color: #2196f3;
            margin-bottom: 30px;
            border-radius-top: 6px;
          }
          .wrapper {
            padding: 10px 30px 20px 30px !important;
          }
          a {
            color: blue !important;
          }
          img {
            margin: 15px 30px 10px 50px;
          }
        `}
      </style>
    </Container>
  );
};
export default Register;
