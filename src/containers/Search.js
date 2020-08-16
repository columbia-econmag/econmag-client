import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import {
  Spinner,
  Card,
  CardGroup,
  FormGroup,
  Jumbotron,
  Container,
  Button,
} from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import { chunk } from "lodash";
import makePretty, { randomImage } from "../libs/articleLib";
import "./Search.css";
import { useMediaQuery } from "react-responsive";
import { GoSearch } from "react-icons/go";

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const InnerSection = styled.section`
  margin: auto;
  padding: 0px 2%;
  max-width: 1200px;
  // background-color: aliceblue;
`;

const EmptyDiv = styled.div`
  height: 300px;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
  margin: auto;
  padding-top: 100px;
`;

const SearchButton = styled.button`
  border: none;
  background: transparent;
  // opacity: 0.5;
  color: #e9ecef;
  width: 5%;
  transition: 0.2s;
  &:focus {
    border-style: none;
    outline-style: none;
    opacity: 1;
  }
`;

const SearchGroup = styled(FormGroup)`
  margin: 20px 2px;
  border-bottom-width: 2px;
  border-bottom-style: solid;
  margin-bottom: 30px;
  border-color: #e9ecef;
  transition: 0.2s;

  &:hover {
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: initial;
    opacity: 1;
  }
  &:hover ${SearchButton} {
    color: black;
  }
  &:focus-within ${SearchButton} {
    color: black;
  }
  &:focus-within {
    border-bottom-style: solid;
    border-bottom-width: 2px;
    border-bottom-color: initial;
  }
`;

const SearchBar = styled.input`
  width: 95%;
  border-style: none;
  background: border-box;
  font-weight: 600;
  font-size: 35px;
  &:focus {
    border-style: none;
    outline-style: none;
    opacity: 1;
  }
`;

const LoaderDiv = styled.div`
  height: 3000px !important;
  text-align: center;
`;

export default function Category(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  let query = decodeURI(props[0].location.search.slice(3));
  const search = useRef(query);
  useEffect(() => {
    search.current = query;
    setIsLoading(true);
    async function onLoad() {
      // if (!isAuthenticated) {
      //   const articles = await loadArticles();
      //   return;
      // }
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
      try {
        const articles = await loadArticles();
        setArticles(handleSearch(articles.data, query));
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [query, search]);

  function loadArticles() {
    var x = API.get("posts", "posts/all");
    return x;
  }

  function handleSearch(articles, query) {
    let listOArticles = [];
    for (let i = 0; i < articles.length; i++) {
      if (
        articles[i]["post_content"]
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        articles[i]["post_author"]
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        articles[i]["post_title"].toLowerCase().includes(query.toLowerCase()) ||
        articles[i]["post_date"].toLowerCase().includes(query.toLowerCase())
      ) {
        listOArticles.push(articles[i]);
      }
    }
    return { data: listOArticles };
  }

  function showImage(post) {
    var item = randomImage();
    if (post.cover_image) {
      return post.cover_image;
    } else {
      return item;
    }
  }

  function renderArticlesList(post) {
    var html = (
      <>
        <LinkContainer to={`/post/${post._id}`} style={{ cursor: "pointer" }}>
          <Card.Img variant="top" src={showImage(post)} />
        </LinkContainer>
        <Card.Body>
          <LinkContainer to={`/post/${post._id}`} style={{ cursor: "pointer" }}>
            <Card.Title>{post.post_title}</Card.Title>
          </LinkContainer>
          <LinkContainer
            to={`/author/${post.post_author}?limit=9&page=1`}
            style={{ cursor: "pointer" }}
          >
            <Card.Subtitle className="mb-2 text-muted">
              {post.post_author}
            </Card.Subtitle>
          </LinkContainer>
          <LinkContainer to={`/post/${post._id}`} style={{ cursor: "pointer" }}>
            <Card.Text>{[post.post_excerpt]}</Card.Text>
          </LinkContainer>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">
            From{" "}
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "long",
              day: "2-digit",
            }).format(new Date(post.post_date))}
          </small>
        </Card.Footer>
      </>
    );
    return html;
  }

  function renderArticlesLists(articles) {
    console.log(articles);
    console.log(articles.data.length);
    if (articles.data.length === 0) {
      return <EmptyDiv>nothing found ):</EmptyDiv>;
    }
    makePretty(articles, 500);
    const sections = chunk(articles.data, 3);

    return sections.map((posts, i) => (
      <CardGroup key={i}>
        {posts.map((post) => (
          <Card key={post._id}>{renderArticlesList(post)}</Card>
        ))}
      </CardGroup>
    ));
  }

  function submitForm(e) {
    e.preventDefault();
    history.push("/search?s=" + search.current); // <--- The page you want to redirect your user to.
  }

  function getStickBugged() {
    if (search.current === "get stick bugged lol") {
      return (
        <div style={{ width: "100%", textAlign: "center" }}>
          <img
            style={{ margin: "auto" }}
            alt="get stickbugged lol"
            src="https://media1.tenor.com/images/a38eae4a52a11d3845b2d6bdfa3f6710/tenor.gif?itemid=18048663"
          ></img>
        </div>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <Mobile key="mobileHome">
        <InnerSection>
          <form onSubmit={submitForm}>
            <SearchGroup>
              <SearchBar
                style={{ width: "95%" }}
                type="text"
                defaultValue={query}
                onChange={(e) => {
                  search.current = e.target.value.toLowerCase();
                }}
                placeholder="Search..."
              />
              <SearchButton
                style={{ width: "0%" }}
                type="submit"
              ></SearchButton>
            </SearchGroup>
          </form>
          {isLoading ? (
            <LoaderDiv>
              <Spinner animation="border" variant="primary" />
            </LoaderDiv>
          ) : (
            <>
              {getStickBugged()}
              {renderArticlesLists(articles)}
            </>
          )}
        </InnerSection>
      </Mobile>
      <Default key="defaultHome">
        <InnerSection>
          <form onSubmit={submitForm}>
            <SearchGroup>
              <SearchBar
                type="text"
                autoFocus
                defaultValue={query}
                onChange={(e) => {
                  search.current = e.target.value.toLowerCase();
                }}
                placeholder="Search..."
              />
              <SearchButton type="submit">
                <GoSearch style={{ width: "70%", height: "100%" }} />
              </SearchButton>
            </SearchGroup>
          </form>
          {isLoading ? (
            <LoaderDiv>
              <Spinner animation="border" variant="primary" />
            </LoaderDiv>
          ) : (
            <>
              {getStickBugged()}
              {renderArticlesLists(articles)}
            </>
          )}
        </InnerSection>
      </Default>
      {/* <div className="Home">{renderArticlesLists()}</div> */}
    </>
  );
}
