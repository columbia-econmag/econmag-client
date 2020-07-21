import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import styled from "styled-components";
import makePretty, { randomImage } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import "./HomeCategory.css";
import { useMediaQuery } from "react-responsive";

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const CatImage = styled.img`
  max-height: 50%;
  max-width: 80%;
  border-radius: 2px;
  display: block;
  margin: auto;
  vertical-align: middle;
  cursor: pointer;
`;

const OuterDiv = styled.div`
  margin-top: 30px;
  display: flex !important;
  border-bottom-style: solid;
  border-bottom-color: rgb(38, 38, 38, 0.3);
  border-width: 1px;
  // margin: 20px 40px 0px 40px;
`;

const Header = styled.h3`
  text-align: center;
  // color: palevioletred;
  cursor: pointer;
`;
const CatText = styled.p`
  text-align: center;
`;

const MobileDiv = styled.div`
  margin: 0px 10px;
`;
const MobileHeader = styled(Header)`
  text-align: center;
`;

const MobileText = styled(CatText)`
  text-align: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom-style: solid;
  border-bottom-color: rgb(38, 38, 38, 0.3);
  border-width: 1px;
`;

const MobileImage = styled(CatImage)`
  max-width: 95%;
`;

const LoaderDiv = styled.div`
  height: 440px !important;
  text-align: center;
`;

export default function CategoriesView(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const newProp = props[0].category;

  useEffect(() => {
    // eslint-disable-next-line no-unused-vars
    let loading = true;
    async function onLoad() {
      try {
        const articles = await loadArticles(newProp);
        setArticles(articles);
        makePretty(articles, 300);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
    return () => (loading = false);
  }, [newProp]);

  function loadArticles(category) {
    var x = API.get("posts", "posts/category/" + category + "/limit/3");
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

  function renderRecentArticles(posts) {
    var articles = posts.data;
    var HTML = articles.map((post) => (
      <Col className="flex" key={post._id}>
        <LinkContainer to={`/post/${post._id}`}>
          <CatImage src={showImage(post)} />
        </LinkContainer>
        <LinkContainer to={`/post/${post._id}`}>
          <Header>{post.post_title}</Header>
        </LinkContainer>
        <CatText
          dangerouslySetInnerHTML={{
            __html: post.post_excerpt,
          }}
        />
      </Col>
    ));

    return HTML;
  }

  function renderRecentMobile(posts) {
    var HTML = posts.data.map((post) => (
      <div key={post._id}>
        <LinkContainer to={`/post/${post._id}`}>
          <MobileImage src={showImage(post)} />
        </LinkContainer>
        <LinkContainer to={`/post/${post._id}`}>
          <MobileHeader>{post.post_title}</MobileHeader>
        </LinkContainer>
        <MobileText
          dangerouslySetInnerHTML={{
            __html: post.post_excerpt,
          }}
        />
      </div>
    ));

    return HTML;
  }

  return (
    <>
      <Mobile>
        {isLoading ? (
          <LoaderDiv>
            <Spinner animation="border" variant="primary" />
          </LoaderDiv>
        ) : (
          <MobileDiv key="MobileCategory">
            {renderRecentMobile(articles)}
          </MobileDiv>
        )}
      </Mobile>
      <Default>
        <OuterDiv>
          <Container className="width">
            <Row className="categoryContainer">
              {!isLoading && renderRecentArticles(articles)}
            </Row>
          </Container>
        </OuterDiv>
      </Default>
    </>
  );
}
