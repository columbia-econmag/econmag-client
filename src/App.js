import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { Link } from "react-router-dom";
import {
  Nav,
  Image,
  NavItem,
  Navbar,
  NavDropdown,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import "./App.css";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      // const currentUserInfo = await Auth.currentUserInfo();
      // console.log(currentUserInfo);
      userHasAuthenticated(true);
    } catch (e) {
      if (e !== "No current user") {
        onError(e);
      }
    }
    setIsAuthenticating(false);
  }
  async function handleLogout() {
    // const currentUserInfo = await Auth.currentUserInfo();
    // console.log(currentUserInfo);
    await Auth.signOut();

    userHasAuthenticated(false);
  }

  return (
    !isAuthenticating && (
      <div className="App container">
        {/* <Navbar.Brand
          style={{ width: "100%", margin: "auto", textAlign: "center" }}
        >
          Columbia Econ Review
        </Navbar.Brand> */}
        <div style={{ width: "100%", textAlign: "center" }}>
          <LinkContainer to="/">
            <img
              className="headerImage"
              alt="CER Header"
              src="https://econmag-bucket.s3.amazonaws.com/public/2015/10/CER_LOGO_BANNER-e1444933900847.png"
            />
          </LinkContainer>
        </div>
        <Navbar
          style={{ maxWidth: "1300px", margin: "auto" }}
          bg="light"
          variant="light"
          expand="lg"
          fluid="true"
          collapseOnSelect="true"
        >
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <LinkContainer to="/">
                <Nav.Link>Current Issue</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/category/World?limit=12">
                <Nav.Link>World</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/category/U.S.?limit=12">
                <Nav.Link>U.S.</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/category/On Campus?limit=12">
                <Nav.Link>On Campus</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/category/Business?limit=12">
                <Nav.Link>Business</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ml-auto">
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/editor">
                    <Nav.Link>Editor</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <Nav.Link>Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
      </div>
    )
  );
}

export default App;
