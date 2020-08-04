import React, { useState, useEffect } from "react";
import { API, Cache } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import styled from "styled-components";
import makePretty, { randomImage } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import "./RecentArticles.css";
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
  margin-bottom: 0px;
  // color: palevioletred;
  cursor: pointer;
`;

const RecentCaption = styled.p`
  text-align: left;
  color: black;
`;
const ImgHolder = styled.div`
  text-align: center;
  display: -webkit-flexbox;
  width: 50%;
  justify-content: center;
  float: left;
  overflow: auto;
`;
const TextHolder = styled.div`
  text-align: left;
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
  margin-bottom: 0px;
`;
const RightText = styled.p`
  text-align: right;
`;

const RightAuthor = styled.p`
  text-align: Right;
  color: grey;
  margin-bottom: 4px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    color: #a0bbd3;
  }
`;

const LeftAuthor = styled.p`
  text-align: left;
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

const LoaderDiv = styled.div`
  height: 535px !important;
  text-align: center;
`;

const MobileLoaderDiv = styled.div`
  height: 1350px !important;
  text-align: center;
`;

export default function RecentArticles(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const propQuery = props[0].query;
  useEffect(() => {
    async function onLoad() {
      try {
        var articles = Cache.getItem("recent");

        if (!articles) {
          articles = await loadArticles(propQuery);

          Cache.setItem("recent", articles);
        }
        setArticles(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
      try {
        let cachedArticles = Cache.getItem("recent");
        let tempArticles = await loadArticles(propQuery);
        if (
          cachedArticles.data[0].post_title !==
            tempArticles.data[0].post_title ||
          cachedArticles.data[0].post_content !==
            tempArticles.data[0].post_content
        ) {
          Cache.setItem("recent", tempArticles);
        }
      } catch (e) {
        onError(e);
      }
    }
    onLoad();
    return () => isLoading;
  }, [propQuery, isLoading]);

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
        <Col className="leftCol" key={articles[0].post_date} xs={7}>
          <Row className="topLeft">
            <TextHolder>
              <LinkContainer to={`/post/${articles[0]._id}`}>
                <RecentTitle>{articles[0].post_title}</RecentTitle>
              </LinkContainer>
              <LinkContainer
                to={`/author/${articles[0].post_author}?limit=9&page=1`}
              >
                <LeftAuthor>{articles[0].post_author}</LeftAuthor>
              </LinkContainer>
              <RecentCaption
                dangerouslySetInnerHTML={{
                  __html: articles[0].post_excerpt,
                }}
              />
            </TextHolder>
            <LinkContainer to={`/post/${articles[0]._id}`}>
              <ImgHolder>
                <LeftImage src={showImage(articles[0])} />
              </ImgHolder>
            </LinkContainer>
          </Row>
          <Row className="bottomLeft">
            <TextHolder>
              <LinkContainer to={`/post/${articles[1]._id}`}>
                <RecentTitle>{articles[1].post_title}</RecentTitle>
              </LinkContainer>
              <LinkContainer
                to={`/author/${articles[1].post_author}?limit=9&page=1`}
              >
                <LeftAuthor>{articles[1].post_author}</LeftAuthor>
              </LinkContainer>
              <RecentCaption
                dangerouslySetInnerHTML={{
                  __html: articles[1].post_excerpt,
                }}
              />
            </TextHolder>
            <LinkContainer to={`/post/${articles[1]._id}`}>
              <ImgHolder>
                <LeftImage src={showImage(articles[1])} />
              </ImgHolder>
            </LinkContainer>
          </Row>
        </Col>
        <Col key={articles[2].post_date} style={{ textAlign: "right" }} xs={5}>
          <LinkContainer to={`/post/${articles[2]._id}`}>
            <RightImage src={showImage(articles[2])} />
          </LinkContainer>
          <LinkContainer to={`/post/${articles[2]._id}`}>
            <RightHeader>{articles[2].post_title}</RightHeader>
          </LinkContainer>
          <LinkContainer
            to={`/author/${articles[2].post_author}?limit=9&page=1`}
          >
            <RightAuthor>{articles[2].post_author}</RightAuthor>
          </LinkContainer>
          <RightText
            dangerouslySetInnerHTML={{
              __html: renderRight(articles),
            }}
          />
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
