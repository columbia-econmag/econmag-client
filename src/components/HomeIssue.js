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
const ArtTitle = styled.h5`
  padding: 0px;
  margin: 0px;
  cursor: pointer;
`;

const AuthorName = styled.h6`
  margin-bottom: 20px;
  font-style: italic;
  color: rgb(2, 33, 105);
`;

const CatImage = styled.img`
  max-height: 50%;
  max-width: 100%;
  border-radius: 2px;
  display: block;
  margin: auto;
  vertical-align: middle;
  cursor: pointer;
`;

const Header = styled.h2`
  padding: 20px 0px 20px 0px;
  font-weight: 600;
  font-size: 40px;
  cursor: pointer;
  // background-color: aliceblue;
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

  useEffect(() => {
    async function onLoad() {
      try {
        var articles = Cache.getItem("Spring 2020");
        if (!articles) {
          articles = await loadArticles();
          Cache.setItem("Spring 2020", articles);
        }
        setArticles(articles);
        makePretty(articles, 300);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
    return () => isLoading;
  }, []);

  function loadArticles() {
    var x = API.get("posts", "posts/category/Spring 2020 Issue");
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

  function renderRecentArticles(posts) {
    var articles = posts.data;
    var HTML = articles.map((post) => (
      <>
        <LinkContainer to={`/post/${post._id}`}>
          <ArtTitle>{post.post_title}</ArtTitle>
        </LinkContainer>
        <AuthorName>{post.post_author}</AuthorName>
      </>
    ));

    return HTML;
  }

  function renderRecentMobile(posts) {
    var HTML = posts.data.map((post) => (
      <div key={post._id} style={{ textAlign: "center" }}>
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
          <Row>
            <Col key="first" style={{ margin: "auto", textAlign: "center" }}>
              <LinkContainer to={`/journal/Spring 2020 Issue`}>
                <a>
                  <img
                    style={{ maxHeight: "500px", maxWidth: "100%" }}
                    alt="currentissueImage"
                    src="https://econmag-bucket.s3.amazonaws.com/public/2020/8/Spring+2020.jpeg"
                  />
                </a>
              </LinkContainer>
            </Col>
            <Col key="second" style={{ textAlign: "left" }}>
              <LinkContainer to={`/journal/Spring 2020 Issue`}>
                <Header>Spring 2020 Issue | Volume XII</Header>
              </LinkContainer>
              <h4 style={{ marginBottom: "20px" }}>In This Issue: </h4>
              {!isLoading && renderRecentArticles(articles)}
            </Col>
          </Row>
        )}
      </Default>
    </>
  );
}
