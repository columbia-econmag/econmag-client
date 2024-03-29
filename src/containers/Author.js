import React, { useState, useEffect, lazy, Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Spinner, Card, CardGroup, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
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

export default function Category(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { post_author } = useParams();
  const query = props[0].location.search;

  useEffect(() => {
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
        const articles = await loadArticles(query);
        setArticles(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [query, post_author]);

  function loadArticles(query) {
    var x = API.get("posts", "posts/author/" + post_author + query);
    return x;
  }

  function showImage(post) {
    var item = randomImage();
    if (post.cover_image) {
      return post.cover_image;
    } else {
      return item;
    }
  }

  function getPages(totalPages, currentPage) {
    let items = [];
    for (let x = 1; x <= totalPages; x++) {
      items.push(
        <LinkContainer
          key={x}
          to={`/author/${post_author}?limit=9&page=${x}`}
          style={{ cursor: "pointer" }}
        >
          <Pagination.Item key={x} active={"" + x === currentPage}>
            {x}
          </Pagination.Item>
        </LinkContainer>
      );
    }
    return (
      <Pagination className="justify-content-center  flex-wrap">
        {items}
      </Pagination>
    );
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
          <Card.Subtitle className="mb-2 text-muted">
            {post.post_author}
          </Card.Subtitle>
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

  return (
    <>
      <Mobile key="mobileHome">
        <Header>{post_author}</Header>
        {!isLoading && renderArticlesLists(articles)}
        <PageDiv>
          {!isLoading && getPages(articles.totalPages, articles.currentPage)}
        </PageDiv>
      </Mobile>
      <Default key="defaultHome">
        <InnerSection>
          <Header>{post_author}</Header>
          {!isLoading && renderArticlesLists(articles)}
          <PageDiv>
            {!isLoading && getPages(articles.totalPages, articles.currentPage)}
          </PageDiv>
        </InnerSection>
      </Default>
      {/* <div className="Home">{renderArticlesLists()}</div> */}
    </>
  );
}
