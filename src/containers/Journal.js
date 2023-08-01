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
    var x = API.get("posts", "posts/category/2022-2023 Issue/excerpt");
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
              <Header>2022-2023 Issue | Volume XV</Header>
              <h4 style={{ marginBottom: "20px" }}>Contributions From:</h4>
              <AuthorName>Ilina Logani</AuthorName>
              <SchoolName>Columbia University</SchoolName>
              <AuthorName>Ignacio Lopez Gaffney Jr.</AuthorName>
              <SchoolName>Columbia University</SchoolName>
              <AuthorName>Bennett Smith-Worthington</AuthorName>
              <SchoolName>Columbia University</SchoolName>
              <AuthorName>Abhimanyu Banerjee</AuthorName>
              <SchoolName>Princeton University</SchoolName> 
              <AuthorName>Solveig Baylor</AuthorName>
              <SchoolName>Georgetown University</SchoolName>
              <AuthorName>Steele Schoeberl</AuthorName>
              <SchoolName>Georgetown University</SchoolName>
              <AuthorName>Zhang Zhi</AuthorName>
              <SchoolName>University of Chicago</SchoolName>
              <AuthorName>Rayna Zhou</AuthorName>
              <SchoolName>Georgetown University</SchoolName>
            </Col>
            <Col style={{ margin: "auto", textAlign: "center" }}>
              <img
                style={{ maxHeight: "450px", maxWidth: "100%" }}
                alt="currentissueImage"
                src="https://columbiaeconreview.com/2022-2023Issue.jpg"
              />
            </Col>
          </Row>
        </InnerSection>
      </IssueSection>
      <div>
        <Collapse in={isClicked}>
          <Letter id="letters">
            <InnerSection>
              <div style={{ padding: '5% 4%' }}>
                <p>Dear Readers,</p>
                <p style={{ textIndent: '.5in' }}>
                  The editorial leadership of the Columbia Economic Review is very excited to 
                  present our 2022–2023 volume, Volume XV. The past few years have ushered in 
                  a new set of societal and economic changes that have disrupted many of the 
                  ways in which the world works—many short-term policy changes were made to 
                  adjust to immediate crises. Nevertheless, these changes have presented numerous 
                  new opportunities in which to explore and test novel economic questions relating 
                  to said policy changes, the focus of some of the papers featured in this volume here.

                </p>
                <p style={{ textIndent: '.5in' }}>
                  The Columbia Economic Review has also discovered new ways to adjust to the 
                  changes of the era. This volume presents premiering our new entirely online 
                  format and layout, and for the first time highlights the senior theses written by the 
                  2022 Columbia University Department of Economics undergraduate prizewinners. 
                  Nevertheless, it maintains continuity with the previous fourteen years of the 
                  Columbia Economic Review’s existence, featuring a select group of excellent senior 
                  theses and other papers submitted by students at a wide range of undergraduate institutions.
                </p>
                <p style={{ textIndent: '.5in' }}>
                  In this volume, we feature three papers written by the top graduating seniors 
                  from the Columbia College Class of 2022—the theses written by Ignacio Lopez Gaffney 
                  and Bennett Smith Worthington, the two 2022 winners of the Sanford S. Parker Prize, 
                  and Ilina Logani, the 2022 winner of the David Estabrook Romine Prize for the Best 
                  Senior Thesis. These three students’ exemplary papers cover numerous topics: education 
                  economics, urban economics, and labor economics, respectively.
                </p>
                <p style={{ textIndent: '.5in' }}>
                  We are also grateful to have received a large set of submissions by current undergraduates 
                    and graduating seniors of the class of 2022 from a wide range of institutions around 
                      the country and world. From this body, we feature a select five papers, written by 
                        Abhimanyu Banerjee, Solveig Baylor, Steele Schoeberl, Zhi Zhang, and Rayna Zhou. The 
                          papers featured in this volume span a range of areas, including healthcare economics, 
                            labor economics, and macroeconomics. Despite their wide range in topics, the eight 
                            papers featured in this volume share in their originality and intellectual rigor.

                 </p>
                <p style={{ textIndent: '.5in' }}>
                 We are extremely grateful for the extensive academic and financial support granted 
                   by the Columbia University Department of Economics and the Program for Economic 
                     Research. Additionally, producing this volume took a tremendous amount of work 
                       done by our extensive team of staff and deputy editors.
              
                </p>
                <p style={{ textIndent: '.5in' }}>
                  In producing this volume, we hope that we have contributed to the rich world 
                    of academic inquiry in the field of Economics while providing opportunities 
                      for current students to gain experience contributing in a variety of ways 
                        to the body of economic knowledge. As we move forward, we are excited to 
                          transition the Columbia Economic Review in its new online format to a 
                            new team of incoming leaders, who we hope will share in our lasting 
                              commitment to feature original academic work, and in doing so spread 
                                the insights of a new rising generation of economists, selected and edited 
                                  by Columbia University undergraduate students.

                </p>
                <p style={{ marginBottom: '2px' }}>Sincerely,</p>
                <p style={{ paddingBottom: '5px', marginBottom: '0px' }}>
                  Jacob Kim-Sherman, <i>Editor-in-Chief </i>, and Jessica Li, <i>Managing Editor</i>
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
          <h6 style={{ marginBottom: "0px" }}>Letter from the Editors</h6>
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
