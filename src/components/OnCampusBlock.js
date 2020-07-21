import React, { useState, useEffect } from "react";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import makePretty, { randomImage } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import "./OnCampusBlock.css";
import { useMediaQuery } from "react-responsive";

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 901 });
  return isNotMobile ? children : null;
};

const RecentTitle = styled.h3`
  text-align: left;
  margin-top: 5px;
  // color: palevioletred;
  cursor: pointer;
`;

const RecentCaption = styled.p`
  text-align: left;
  color: black;
`;
const ImgHolder = styled.div`
  text-align: center;
  display: flex;
  width: 50%;
  justify-content: center;
  float: left;
  overflow: auto;
`;
const TextHolder = styled.div`
  text-align: center;
  display: block;
  width: 50%;
  justify-content: center;
  float: left;
  overflow: auto;
`;
const LeftImage = styled.img`
  max-height: 90%;
  max-width: 90%;
  border-radius: 2px;
  display: block;
  margin: auto;
  vertical-align: middle;
  float: right;
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
  border-bottom-color: rgb(38, 38, 38, 0.1);
  border-width: 1px;
  // margin: 20px 40px 0px 40px;
  padding: 0px 10px;
`;

const RightHeader = styled.h3`
  text-align: right;
  // color: palevioletred;
  cursor: pointer;
`;
const RightText = styled.p`
  text-align: right;
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

export default function OnCampus() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const articles = await loadArticles();
        setArticles(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
    return () => isLoading;
  }, [isLoading]);

  function loadArticles() {
    var x = API.get("posts", "posts/category/World/limit/3");
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
    articles[2].post_excerpt = "";
    makePretty({ data: articles });

    return articles[2].post_excerpt;
  }

  function descriptionControl(articles, maxLength) {
    for (var i = 0; i < articles.data.length; i++) {
      articles.data[i].post_excerpt = "";
    }

    var test = makePretty(articles, maxLength);
    return test;
  }

  function renderRecentArticles(posts) {
    var articles = descriptionControl(posts, 300);
    var HTML = (
      <>
        <Col key={articles[2].post_date} xs={7}>
          <LinkContainer to={`/post/${articles[2]._id}`}>
            <RightImage src={showImage(articles[2])} />
          </LinkContainer>
          <LinkContainer to={`/post/${articles[2]._id}`}>
            <RightHeader>{articles[2].post_title}</RightHeader>
          </LinkContainer>
          <RightText
            dangerouslySetInnerHTML={{
              __html: renderRight(articles),
            }}
          />
        </Col>
        <Col className="leftCol" key={articles[0].post_date} xs={5}>
          <Row className="topLeft">
            <LinkContainer to={`/post/${articles[2]._id}`}>
              <RightImage src={showImage(articles[2])} />
            </LinkContainer>
            <LinkContainer to={`/post/${articles[2]._id}`}>
              <RightHeader>{articles[2].post_title}</RightHeader>
            </LinkContainer>
            <RightText
              dangerouslySetInnerHTML={{
                __html: articles[1].post_excerpt,
              }}
            />
          </Row>
          <Row className="bottomLeft">
            <LinkContainer to={`/post/${articles[2]._id}`}>
              <RightImage src={showImage(articles[2])} />
            </LinkContainer>
            <LinkContainer to={`/post/${articles[2]._id}`}>
              <RightHeader>{articles[2].post_title}</RightHeader>
            </LinkContainer>
            <RightText
              dangerouslySetInnerHTML={{
                __html: articles[0].post_excerpt,
              }}
            />
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
        <MobileDiv key="MobileRecentArticles">
          {!isLoading && renderRecentMobile(articles)}
        </MobileDiv>
      </Mobile>
      <Default>
        <OuterDiv>
          <Container className="width">
            <Row>{!isLoading && renderRecentArticles(articles)}</Row>
          </Container>
        </OuterDiv>
      </Default>
    </>
  );
}
