import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { Grid, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import makePretty, { randomImage } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import "./RecentArticles.css";

const RecentTitle = styled.h3`
  text-align: left;
  margin-top: 5px;
  color: palevioletred;
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
`;

const RightHeader = styled.h3`
  text-align: right;
  color: palevioletred;
  cursor: pointer;
`;
const RightText = styled.p`
  text-align: right;
`;

export default function RecentArticles() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const articles = await loadArticles();
        setArticles(articles);
        makePretty(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, []);

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

  function renderRecentArticles(posts) {
    var articles = posts.data;
    console.log(articles[0].post_title);
    console.log(articles[0]);
    var HTML = (
      <>
        <Col className="flex" key={articles[0].post_date} xs={7}>
          <Row className="topLeft">
            <TextHolder>
              <LinkContainer to={`/post/${articles[0]._id}`}>
                <RecentTitle>{articles[0].post_title}</RecentTitle>
              </LinkContainer>
              <RecentCaption>{articles[0].post_excerpt}</RecentCaption>
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
              <RecentCaption>{articles[1].post_excerpt}</RecentCaption>
            </TextHolder>
            <LinkContainer to={`/post/${articles[1]._id}`}>
              <ImgHolder>
                <LeftImage src={showImage(articles[1])} />
              </ImgHolder>
            </LinkContainer>
          </Row>
        </Col>
        <Col key={articles[2].post_date} xs={5}>
          <LinkContainer to={`/post/${articles[2]._id}`}>
            <RightImage src={showImage(articles[2])} />
          </LinkContainer>
          <LinkContainer to={`/post/${articles[2]._id}`}>
            <RightHeader>{articles[2].post_title}</RightHeader>
          </LinkContainer>
          <RightText>{articles[2].post_excerpt}</RightText>
        </Col>
      </>
    );

    return HTML;
  }

  return (
    <OuterDiv>
      <Grid className="width">
        <Row className="padding">
          {!isLoading && renderRecentArticles(articles)}
        </Row>
      </Grid>
    </OuterDiv>
  );
}
