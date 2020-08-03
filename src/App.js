import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { Nav, Navbar, Container, Row, Col } from "react-bootstrap";
import "./App.css";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";

const Footer = styled.section`
  height: 330px;
  padding: 5px 50px;
  background-color: aliceblue;
`;

const FootLogo = styled.img`
  height: 200px;
  margin: auto 20px;
`;

const FooterWrap = styled(Container)`
  margin: auto !important;
`;

const FooterText = styled.p`
  cursor: pointer;
  padding: 0px 20px;
  &:hover {
    color: #a0bbd3;
  }
`;

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
              <LinkContainer to="/category/Business?limit=9&page=1">
                <Nav.Link>Business</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/category/World?limit=9&page=1">
                <Nav.Link>World</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/category/U.S.?limit=9&page=1">
                <Nav.Link>U.S.</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/category/On Campus?limit=9&page=1">
                <Nav.Link className="rightMost">On Campus</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav className="ml-auto">
              {isAuthenticated ? (
                <>
                  <LinkContainer to="/editor?limit=9&page=1">
                    <Nav.Link>Editor</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                </>
              ) : (
                <>
                  {/* <LinkContainer to="/signup">
                    <Nav.Link>Signup</Nav.Link>
                  </LinkContainer> */}
                  <LinkContainer
                    style={{ borderRightStyle: "hidden !important" }}
                    to="/login"
                  >
                    <Nav.Link className="rightMost">Login</Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
        <Footer>
          <div style={{ display: "flex", height: "300px" }}>
            <FooterWrap>
              <Row className="justify-content-md-center">
                <Col md="auto">
                  <FootLogo
                    alt="currentissueImage"
                    src="https://econmag-bucket.s3.amazonaws.com/public/2020/7/CER.jpg"
                  />
                </Col>
                <Col
                  md="auto"
                  style={{ alignSelf: "center", paddingRight: "150px" }}
                >
                  <LinkContainer to="/">
                    <FooterText>About us</FooterText>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <FooterText>Subscribe</FooterText>
                  </LinkContainer>
                  <LinkContainer to="/">
                    <FooterText className="noBottomMargin">
                      Contact Us
                    </FooterText>
                  </LinkContainer>
                </Col>
              </Row>
            </FooterWrap>
          </div>
          <p
            style={{
              textAlign: "right",
              fontStyle: "italic",
              fontSize: "smaller",
              paddingBottom: "5px",
              margin: "0px",
            }}
          >
            Website Created By Ivan Barral
          </p>
        </Footer>
      </div>
    )
  );
}

export default App;
