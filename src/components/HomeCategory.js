import React, { useState, useEffect } from "react";
import { API, Cache } from "aws-amplify";
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
  margin-bottom: 0px;
`;
const CatText = styled.p`
  text-align: center;
`;

const Caption = styled.p`
  text-align: center;
  color: grey;
  margin-bottom: 4px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    color: #a0bbd3;
  }
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

const MobileLoaderDiv = styled.div`
  height: 1350px !important;
  text-align: center;
`;

export default function CategoriesView(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  var propQuery = props[0].query;

  if (propQuery === "") {
    propQuery = "?limit=3";
  }
  useEffect(() => {
    async function onLoad() {
      try {
        var articles = Cache.getItem(propQuery);
        if (!articles) {
          articles = await loadArticles(propQuery);
          Cache.setItem(propQuery, articles);
        }
        setArticles(articles);
        makePretty(articles, 300);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
      try {
        let cachedArticles = Cache.getItem(propQuery);
        let tempArticles = await loadArticles(propQuery);
        if (
          cachedArticles.data[0].post_title !==
            tempArticles.data[0].post_title ||
          cachedArticles.data[0].post_content !==
            tempArticles.data[0].post_content
        ) {
          Cache.setItem(propQuery, tempArticles);
        }
      } catch (e) {
        onError(e);
      }
    }
    onLoad();
    return () => isLoading;
  }, [propQuery]);

  function loadArticles(query = "") {
    var x = API.get("posts", "posts/" + query);
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
        <LinkContainer to={`/author/${post.post_author}?limit=9&page=1`}>
          <Caption>{post.post_author}</Caption>
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
        <LinkContainer to={`/author/${post.post_author}?limit=9&page=1`}>
          <Caption>{post.post_author}</Caption>
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
          <MobileLoaderDiv>
            <Spinner animation="border" variant="primary" />
          </MobileLoaderDiv>
        ) : (
          <MobileDiv key="MobileCategory">
            {renderRecentMobile(articles)}
          </MobileDiv>
        )}
      </Mobile>
      <Default>
        {isLoading ? (
          <LoaderDiv>
            <Spinner animation="border" variant="primary" />
          </LoaderDiv>
        ) : (
          <OuterDiv>
            <Container className="width">
              <Row className="categoryContainer">
                {!isLoading && renderRecentArticles(articles)}
              </Row>
            </Container>
          </OuterDiv>
        )}
      </Default>
    </>
  );
}
