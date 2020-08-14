import React, { useState, useEffect, lazy, Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import {
  Spinner,
  Card,
  CardGroup,
  Pagination,
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
import "./Home.css";
import { useMediaQuery } from "react-responsive";

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const SliderSection = styled.section`
  padding: 5px 50px;
  background-color: aliceblue;
`;

const IssueSection = styled.section`
  padding: 5px 50px;
  background-color: #a0bbd3;
`;

const InnerSection = styled.section`
  margin: auto;
  padding: 0px 2%;
  max-width: 1200px;
  // background-color: aliceblue;
`;

const PageDiv = styled.div`
  padding: 2%;
  text-align: center;
`;

const SliderMobile = styled(SliderSection)`
  padding: 5px 5px;
`;

const Header = styled.h2`
  padding: 30px 0px 0px 0px;
  font-weight: 600;
  // background-color: aliceblue;
`;

const MobileHeader = styled.h2`
  padding: 35px 0px 0px 0px;
  font-weight: 600;
  text-align: center;
`;

const LoaderDiv = styled.div`
  height: 3000px !important;
  text-align: center;
`;

export default function Category(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();
  const [allArticles, setAllArticles] = useState([]);
  const [search, setSearch] = useState("");
  let query = decodeURI(props[0].location.search.slice(3));
  useEffect(() => {
    setSearch(query);
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
        setAllArticles(articles);
        setArticles(handleSearch(articles.data, query));
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [query]);

  function loadArticles() {
    var x = API.get("posts", "posts/all");
    return x;
  }

  function handleSearch(articles, query) {
    let listOArticles = [];
    for (let i = 0; i < articles.length; i++) {
      if (
        articles[i]["post_content"].toLowerCase().includes(query.toLowerCase())
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
        <LinkContainer
          to={`/post/${post._id}/edit`}
          style={{ cursor: "pointer" }}
        >
          <Card.Img variant="top" src={showImage(post)} />
        </LinkContainer>
        <Card.Body>
          <LinkContainer
            to={`/post/${post._id}/edit`}
            style={{ cursor: "pointer" }}
          >
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
          <LinkContainer
            to={`/post/${post._id}/edit`}
            style={{ cursor: "pointer" }}
          >
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
    history.push("/search?s=" + search); // <--- The page you want to redirect your user to.
  }

  function getStickBugged() {
    if (search === "get stick bugged lol") {
      return (
        <img src="https://media1.tenor.com/images/a38eae4a52a11d3845b2d6bdfa3f6710/tenor.gif?itemid=18048663"></img>
      );
    } else {
      return null;
    }
  }

  return (
    <>
      <Mobile key="mobileHome">
        <Header>Editor</Header>

        <Jumbotron fluid>
          <Container style={{ textAlign: "center" }}>
            <h1>Create a new article!</h1>
          </Container>
        </Jumbotron>
        {!isLoading && renderArticlesLists(articles)}
      </Mobile>
      <Default key="defaultHome">
        <InnerSection>
          <Header>Search</Header>
          <Jumbotron fluid>
            <Container style={{ textAlign: "center" }}>
              <h1 style={{ paddingBottom: "20px" }}>Search!</h1>

              <form onSubmit={submitForm}>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value.toLowerCase());
                  }}
                  placeholder="search"
                />
                <button type="submit">Submit</button>
              </form>
            </Container>
          </Jumbotron>
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
