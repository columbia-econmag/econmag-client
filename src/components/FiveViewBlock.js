import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import styled from "styled-components";
import makePretty, { randomImage } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import "./FiveViewBlock.css";
import { useMediaQuery } from "react-responsive";

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const LoaderDiv = styled.div`
  height: 690px !important;
  text-align: center;
`;

const LeftHeader = styled.h2`
  text-align: left;
  margin-bottom: 0px;
  cursor: pointer;
`;
const LeftImage = styled.img`
  height: auto;
  max-width: 100%;
  border-radius: 2px;
  display: block;
  margin: auto;
  vertical-align: middle;
  cursor: pointer;
`;

const RightImage = styled.img`
  max-height: 50%;
  max-width: 50%;
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
  padding: 0px 10px;
`;

const RightHeader = styled.h4`
  text-align: left;
  // color: palevioletred;
  cursor: pointer;
  margin-bottom: 0px;
`;
const RightText = styled.p`
  text-align: left;
`;

const RightCaption = styled.p`
  text-align: left;
  color: grey;
  margin-bottom: 4px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    color: #d4a3a1;
  }
`;

const MobileCaption = styled(RightCaption)``;

const LeftCaption = styled(RightCaption)`
  margin-bottom: 16px !important;
  display: inline-block;
  &:hover {
    color: #d4a3a1;
  }
`;

const MobileDiv = styled.div`
  margin: 0px 10px;
`;
const MobileHeader = styled(RightHeader)`
  text-align: center;
`;

const MobileText = styled(RightText)`
  text-align: center;
  padding-bottom: 15px;
  margin-bottom: 15px;
  border-bottom-style: solid;
  border-bottom-color: rgb(38, 38, 38, 0.3);
  border-width: 1px;
`;

const MobileImage = styled(RightImage)`
  max-width: 95%;
`;

const MobileLoaderDiv = styled.div`
  height: 1350px !important;
  text-align: center;
`;

export default function FiveViewBlock(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const propQuery = props[0].query;

  useEffect(() => {
    async function onLoad() {
      try {
        const articles = await loadArticles(propQuery);
        setArticles(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
    return () => false;
  }, [propQuery]);

  function loadArticles(propQuery = "") {
    var x = API.get("posts", "posts/" + propQuery);
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

  function renderRight(articles) {
    articles[0].post_excerpt = "";
    makePretty({ data: articles });

    return articles[0].post_excerpt;
  }

  function descriptionControl(articles, maxLength) {
    for (var i = 0; i < articles.data.length; i++) {
      articles.data[i].post_excerpt = "";
    }

    var test = makePretty(articles, maxLength);
    return test;
  }

  function articleContainer(post1, post2) {
    return (
      <>
        <Col className="rightCol">
          <LinkContainer to={`/post/${post1._id}`}>
            <RightImage src={showImage(post1)} />
          </LinkContainer>
          <LinkContainer to={`/post/${post1._id}`}>
            <RightHeader>{post1.post_title}</RightHeader>
          </LinkContainer>
          <LinkContainer to={`/author/${post1.post_author}?limit=9&page=1`}>
            <RightCaption>{post1.post_author}</RightCaption>
          </LinkContainer>
          <RightText
            dangerouslySetInnerHTML={{
              __html: post1.post_excerpt,
            }}
          />
        </Col>
        <Col className="rightmostCol">
          <LinkContainer to={`/post/${post2._id}`}>
            <RightImage src={showImage(post2)} />
          </LinkContainer>
          <LinkContainer to={`/post/${post2._id}`}>
            <RightHeader>{post2.post_title}</RightHeader>
          </LinkContainer>
          <LinkContainer to={`/author/${post2.post_author}?limit=9&page=1`}>
            <RightCaption>{post2.post_author}</RightCaption>
          </LinkContainer>
          <RightText
            dangerouslySetInnerHTML={{
              __html: post2.post_excerpt,
            }}
          />
        </Col>
      </>
    );
  }

  function renderRecentArticles(posts) {
    var articles = descriptionControl(posts, 300);
    var HTML = (
      <>
        <Col style={{ paddingLeft: "0" }} xs={5}>
          <LinkContainer to={`/post/${articles[0]._id}`}>
            <LeftImage src={showImage(articles[0])} />
          </LinkContainer>
          <LinkContainer to={`/post/${articles[0]._id}`}>
            <LeftHeader>{articles[0].post_title}</LeftHeader>
          </LinkContainer>
          <LinkContainer
            to={`/author/${articles[0].post_author}?limit=9&page=1`}
          >
            <LeftCaption>{articles[0].post_author}</LeftCaption>
          </LinkContainer>
          <RightText
            dangerouslySetInnerHTML={{
              __html: renderRight(articles),
            }}
          />
        </Col>
        <Col className="leftColumn" xs={7}>
          <Row className="topLeft">
            {articleContainer(articles[1], articles[2])}
          </Row>
          <Row className="leftBottom">
            {articleContainer(articles[3], articles[4])}
          </Row>
        </Col>
      </>
    );

    return HTML;
  }

  function renderRecentMobile(posts) {
    var articles = descriptionControl(posts, 300);
    var HTML = articles.map((post) => (
      <div key={post._id}>
        <LinkContainer to={`/post/${post._id}`}>
          <MobileImage src={showImage(post)} />
        </LinkContainer>
        <LinkContainer to={`/post/${post._id}`}>
          <MobileHeader>{post.post_title}</MobileHeader>
        </LinkContainer>
        <MobileCaption>{post.post_title}</MobileCaption>
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
          <MobileDiv key="MobileRecentArticles">
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
              <Row>{renderRecentArticles(articles)}</Row>
            </Container>
          </OuterDiv>
        )}
      </Default>
    </>
  );
}
