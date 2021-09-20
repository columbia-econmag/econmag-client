import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { Spinner, Card, Row, Col, Collapse } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { LinkContainer } from "react-router-bootstrap";
import { API, Cache } from "aws-amplify";
import makePretty, { randomImage } from "../libs/articleLib";
import "./Home.css";
import { useMediaQuery } from "react-responsive";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";

const width = "200px;";
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
const SliderTitle = styled.h3`
  text-align: left;
  cursor: pointer;
  margin-bottom: 0px;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #a0bbd3;
  }
`;

const OuterDiv = styled.div`
  display: flex !important;
  padding: 20px 0px;
`;

const SliderCaption = styled.p`
  text-align: left;
  // width: 50%;
  // float: right;
  color: black;
`;

const Author = styled.p`
  text-align: left;
  color: grey;
  margin-bottom: 4px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    color: #a0bbd3;
  }
`;
const ImgHolder = styled.div`
  text-align: left;
  display: flex;
  width: 50%;
  justify-content: center;
  float: left;
  overflow: auto;
`;
const TextHolder = styled.div`
  text-align: left;
  margin-left: 15px;
  display: block;
  width: 50%;
  // justify-content: center;
  float: left;
  overflow: auto;
`;

const ImageTemp = styled.div`
  max-width: 500px;
  max-height: 500px;
  background-position: 50%;
  background-size: cover;
  width: 100%;
  height: 100%;
  cursor: pointer;
`;

const LetterButton = styled.div`
  background-color: #a0bbd3;
  cursor: pointer;
  width: fit-content;
  padding-left: 10px;
  padding-right: 10px;
  margin: auto;
  margin-bottom: 30px;
  text-align: center;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;
  transition: 0.2s;
  &:hover {
    color: azure;
  }
`;

const IssueSection = styled.section`
  padding: 5px 50px;
  // margin-bottom: 50px;
  background-color: #a0bbd3;
  // background-color: rgb(185, 217, 235); pantone blue
`;

const Header = styled.h2`
  padding: 20px 0px 40px 0px;
  font-weight: 600;
  font-size: 40px;
  // background-color: aliceblue;
`;

const AuthorName = styled.h5`
  padding: 0px;
  margin: 0px;
`;

const SchoolName = styled.h6`
  margin-bottom: 20px;
  font-style: italic;
  color: rgb(2, 33, 105);
`;

const LoaderDiv = styled.div`
  height: 3000px !important;
  text-align: center;
`;

const Letter = styled.div`
  background-color: #a0bbd3;
  padding: 0px 50px;
`;

export default function Journal(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isClicked, setClicked] = useState(false);
  const { journal_year } = useParams();

  useEffect(() => {
    setIsLoading(true);
    window.scroll({
      top: 0,
      left: 0,
      behavior: "auto",
    });
    async function onLoad() {
      try {
        var articles = Cache.getItem(journal_year);
        if (!articles) {
          articles = await loadArticles();
          Cache.setItem(journal_year, articles);
        }
        setArticles(articles);
        makePretty(articles, 300);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
      try {
        let cachedArticles = Cache.getItem(journal_year);
        let tempArticles = await loadArticles();
        if (
          cachedArticles.data[0].post_title !==
            tempArticles.data[0].post_title ||
          cachedArticles.data[0].post_content !==
            tempArticles.data[0].post_content
        ) {
          Cache.setItem(journal_year, tempArticles);
        }
      } catch (e) {
        onError(e);
      }
    }
    onLoad();
    return () => isLoading;
  }, [journal_year]);

  function loadArticles() {
    var x = API.get("posts", "posts/category/Spring 2021 Issue/excerpt");
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

  function renderArticlesList(post) {
    var image = encodeURI(showImage(post));
    console.log(encodeURI(image));
    var html = (
      <>
        <OuterDiv key={post._id}>
          <LinkContainer to={`/post/${post._id}`}>
            <ImgHolder key={post.post_author}>
              <ImageTemp style={{ backgroundImage: "url(" + image + ")" }} />
            </ImgHolder>
          </LinkContainer>
          <TextHolder>
            <LinkContainer to={`/post/${post._id}`}>
              <SliderTitle>{post.post_title}</SliderTitle>
            </LinkContainer>
            <LinkContainer to={`/author/${post.post_author}?limit=9&page=1`}>
              <Author>{post.post_author}</Author>
            </LinkContainer>
            <SliderCaption
              dangerouslySetInnerHTML={{
                __html: post.post_largeExcerpt,
              }}
            >
              {/* {post.post_content.trim().split("\n")[0]} */}
            </SliderCaption>
          </TextHolder>
        </OuterDiv>
      </>
    );
    return html;
  }

  function renderArticlesLists(articles) {
    makePretty(articles, 500);
    var toR = [];
    for (let i = articles.data.length - 1; i >= 0; i--) {
      toR.push(renderArticlesList(articles.data[i]));
    }
    return toR;
  }

  return (
    <>
      {/* <Mobile key="mobileHome">
        <Header>{journal_year}</Header>
        {!isLoading && renderArticlesLists(articles)}
      </Mobile>
      <Default key="defaultHome"> */}
      <IssueSection>
        <InnerSection>
          <Row>
            <Col md="auto" style={{ textAlign: "left" }}>
              <Header>Spring 2021 Issue | Volume XIV</Header>
              <h4 style={{ marginBottom: "20px" }}>Contributions From:</h4>
              <AuthorName>Ana Pranger</AuthorName>
              <SchoolName>Princeton University</SchoolName>
              <AuthorName>Amy Kim</AuthorName>
              <SchoolName>Massachusetts Institute of Technology</SchoolName>
              <AuthorName>Santiago Roberton-Lavalle</AuthorName>
              <SchoolName>Princeton University</SchoolName>
              <AuthorName>Jodie Bhattacharya</AuthorName>
              <SchoolName>Stanford University</SchoolName>
            </Col>
            <Col style={{ margin: "auto", textAlign: "center" }}>
              <img
                style={{ maxHeight: "450px", maxWidth: "100%" }}
                alt="currentissueImage"
                src="https://econmag-bucket.s3.amazonaws.com/public/ImageIssue/Spring 2021 Issue.jpg"
              />
            </Col>
          </Row>
        </InnerSection>
      </IssueSection>
      <div>
        <Collapse in={isClicked}>
          <Letter id="letters">
            <InnerSection>
              <div style={{ padding: "5% 4%" }}>
                <p>Dear Readers,</p>

                <p style={{ textIndent: ".5in" }}>
                It is a pleasure to present the Columbia Economic Review’s (CER) Spring 2021
                issue. This edition marks the 12-year anniversary of the journal’s publication of
                a distinguished collection of original undergraduate research papers, on topics as
                varied as our field.
                </p>

                <p style={{ textIndent: ".5in" }}>
                Once comprised primarily of research produced by undergraduate students at
                Columbia University, the journal now attracts submissions from students across
                the country. It helps foster a community of economists-in-training.
                </p>

                <p style={{ textIndent: ".5in" }}>
                This issue features peer-reviewed analysis of important issues &ndash; from
                occupational licensing and the gender wage gap, to the effects of tax provisions.
                </p>

                <p style={{ textIndent: ".5in" }}>
                In closing, I want to acknowledge the tremendous work that went into this issue. 
                The managing board, led by Ignacio Lopez Gaffney and Sinet Chelagat, worked remotely and tirelessly. 
                Thanks also to Wouter Vergote, the journal’s faculty advisor who supported the students’ aims. 
                We have a real example of resiliency that helps illustrate what economics is and how it connects to our everyday lives.
                </p>

                <p style={{ marginBottom: "2px" }}>Miguel Urquiola</p>
                <p style={{ marginBottom: "2px" }}>Chair, Department of Economics</p>
                <p style={{ paddingBottom: "5px", marginBottom: "0px" }}>
                  Columbia University
                </p>
              </div>
            </InnerSection>
          </Letter>
        </Collapse>
        <LetterButton
          onClick={() => setClicked(!isClicked)}
          aria-controls="letters"
          aria-expanded={isClicked}
        >
          <h6 style={{ marginBottom: "0px" }}>Letter from the Department Chair</h6>
          {!isClicked ? <BsChevronDown /> : <BsChevronUp />}
        </LetterButton>
      </div>
      <InnerSection>
        <h2>In this Issue:</h2>
        {isLoading ? (
          <LoaderDiv>
            <Spinner animation="border" variant="primary" />
          </LoaderDiv>
        ) : (
          <>{renderArticlesLists(articles)}</>
        )}
      </InnerSection>
      {/* </Default> */}
      {/* <div className="Home">{renderArticlesLists()}</div> */}
    </>
  );
}
