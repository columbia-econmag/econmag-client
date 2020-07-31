import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Spinner, Card, CardGroup, Pagination } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { LinkContainer } from "react-router-bootstrap";
import { API, Cache } from "aws-amplify";
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

const Header = styled.h2`
  padding: 30px 0px 0px 0px;
  font-weight: 600;
  // background-color: aliceblue;
`;

const CardTitle = styled(Card.Title)`
  &:hover {
    text-decoration: underline;
    text-decoration-color: #a0bbd3;
  }
`;

const AuthorText = styled(Card.Subtitle)`
  display: inline-block;
  &:hover {
    color: #d4a3a1 !important;
  }
`;

const LoaderDiv = styled.div`
  height: 3000px !important;
  text-align: center;
`;

export default function Category(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { post_category } = useParams();
  const query = props[0].location.search;

  useEffect(() => {
    setIsLoading(true);
    async function onLoad() {
      try {
        var articles = Cache.getItem(post_category + query);
        if (!articles) {
          articles = await loadArticles(query);
          Cache.setItem(post_category + query, articles);
        }
        setArticles(articles);
        makePretty(articles, 300);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
      try {
        let cachedArticles = Cache.getItem(post_category + query);
        let tempArticles = await loadArticles(query);
        if (
          cachedArticles.data[0].post_title !== tempArticles.data[0].post_title
        ) {
          Cache.setItem(post_category + query, tempArticles);
        }
      } catch (e) {
        onError(e);
      }
    }
    onLoad();
    return () => isLoading;
  }, [query, post_category]);

  function loadArticles(query) {
    var x = API.get("posts", "posts/category/" + post_category + query);
    return x;
  }

  function showImage(post) {
    var item = randomImage();
    if (post.cover_image) {
      return post.cover_image.src;
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
          to={`/category/${post_category}?limit=9&page=${x}`}
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
            <CardTitle>{post.post_title}</CardTitle>
          </LinkContainer>
          <LinkContainer
            to={`/author/${post.post_author}?limit=9&page=1`}
            style={{ cursor: "pointer" }}
          >
            <AuthorText className="mb-2 text-muted">
              {post.post_author}
            </AuthorText>
          </LinkContainer>
          <Card.Text>{[post.post_excerpt]}</Card.Text>
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
        <Header>{post_category}</Header>
        {!isLoading && renderArticlesLists(articles)}
        <PageDiv>
          {!isLoading && getPages(articles.totalPages, articles.currentPage)}
        </PageDiv>
      </Mobile>
      <Default key="defaultHome">
        <InnerSection>
          <Header>{post_category}</Header>
          {isLoading ? (
            <LoaderDiv>
              <Spinner animation="border" variant="primary" />
            </LoaderDiv>
          ) : (
            <>{renderArticlesLists(articles)}</>
          )}
          <PageDiv>
            {!isLoading && getPages(articles.totalPages, articles.currentPage)}
          </PageDiv>
        </InnerSection>
      </Default>
      {/* <div className="Home">{renderArticlesLists()}</div> */}
    </>
  );
}
