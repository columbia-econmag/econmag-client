import React, { useState, useEffect } from "react";
import Routes from "./Routes";
import { Nav, Navbar, Container, Row, Col, FormGroup } from "react-bootstrap";
import "./App.css";
import { useHistory, useLocation } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import styled from "styled-components";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import { GoSearch } from "react-icons/go";

const Footer = styled.section`
  height: 330px;
  padding: 5px 50px;
  background-color: #1c3c75;
`;

const FootLogo = styled.img`
  height: 200px;
  margin: 0 20px;
`;

const FooterWrap = styled(Container)`
  margin: auto !important;
`;

const FooterText = styled.p`
  cursor: pointer;
  padding: 0px 20px;
  color: white;
  &:hover {
    color: #a0bbd3;
  }
`;

const SearchBar = styled.input`
  width: 0px;
  border-style: none;
  background: border-box;
  transition: 0.2s;
  &:focus {
    border-style: none;
    outline-style: none;
    opacity: 1;
    width: 150px;
  }
`;
const SearchImage = styled(GoSearch)`
  height: 20px;
  width: 20px;
  color: rgba(0, 0, 0, 0.8);
`;
const SearchGroup = styled.div`
  overflow: hidden;
  margin: 6px 16px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  border-color: transparent;
  transition: 0.2s;

  &:hover {
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: initial;
    opacity: 1;
  }

  &:hover ${SearchBar} {
    width: 150px;
  }
  &:focus ${SearchBar} {
    width: 150px;
  }

  &:focus-within ${SearchBar} {
    width: 150px;
  }

  &:focus-within {
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: initial;
  }
`;

function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const history = useHistory();
  var search = "";
  var path = useLocation().pathname;
  console.log(useLocation().pathname);
  // let query = decodeURI(props[0].location.search.slice(3));
  // console.log(decodeURI(props[0].location.search));
  // if (decodeURI(props[0].location.search)[1] === "s") {
  //   search = query;
  // }

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

  function submitForm(e) {
    e.preventDefault();
    console.log(e);
    history.push("/search?s=" + search); // <--- The page you want to redirect your user to.
  }

  return (
    !isAuthenticating && (
      <div className="App container">
        {/* <Navbar.Brand
          style={{ width: "100%", margin: "auto", textAlign: "center" }}
        >
          Columbia Econ Review
        </Navbar.Brand> */}
        <div style={{ width: "100%", textAlign: "center", padding: "1%" }}>
          <LinkContainer to="/">
            <img
              className="headerImage"
              alt="CER Header"
              src="https://econmag-bucket.s3.amazonaws.com/public/2020/8/CER+new+Logo.png"
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
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {path !== "/search" ? (
            <Nav className="ml-auto">
              <form className="hide" onSubmit={submitForm}>
                <SearchGroup
                  onClick={(e) => {
                    e.currentTarget.getElementsByTagName("input")[0].focus();
                  }}
                >
                  <SearchBar
                    type="text"
                    onChange={(e) => {
                      search = e.target.value.toLowerCase();
                    }}
                    placeholder="Search..."
                  />

                  <SearchImage />
                </SearchGroup>
              </form>
            </Nav>
          ) : null}
        </Navbar>
        <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
          <Routes />
        </AppContext.Provider>
        <Footer>
          <div style={{ display: "flex", height: "300px" }}>
            <FooterWrap>
              <Row>
                <Col md="auto">
                  <a href="#top">
                    <FootLogo
                      alt="currentissueImage"
                      src="https://econmag-bucket.s3.amazonaws.com/public/2020/7/CER.jpg"
                    />
                  </a>
                </Col>
                <Col
                  md="auto"
                  style={{ alignSelf: "center", paddingRight: "150px" }}
                >
                  <LinkContainer to="/About">
                    <FooterText className="noBottomMargin">About Us</FooterText>
                  </LinkContainer>
                  <LinkContainer to="/Subscribe">
                    <FooterText className="noBottomMargin">
                      Subscribe
                    </FooterText>
                  </LinkContainer>
                  <LinkContainer to="/Contact">
                    <FooterText className="noBottomMargin">
                      Contact Us
                    </FooterText>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <FooterText className="noBottomMargin">
                      Editor Login
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
              color: "grey",
            }}
          >
            Website By Ivan Barral
          </p>
        </Footer>
      </div>
    )
  );
}

export default App;
