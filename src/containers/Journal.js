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
  width: ${width};
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

const AuthorText = styled(Card.Subtitle)`
  display: inline-block;
  &:hover {
    color: #a0bbd3 !important;
  }
`;

const LoaderDiv = styled.div`
  height: 3000px !important;
  text-align: center;
`;

const Letter = styled.div`
  background-color: #a0bbd3;
  padding: 0px 50px;
`;

export default function Category(...props) {
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

  function renderArticlesList(post) {
    var image = showImage(post);
    console.log(image);
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
    for (let i = articles.data.length - 2; i >= 0; i--) {
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
              <Header>Spring 2020 Issue | Volume XII</Header>
              <h4 style={{ marginBottom: "20px" }}>Contributions From:</h4>
              <AuthorName>Elizaveta Brover and Rebecca Schleimer</AuthorName>
              <SchoolName>University of Pennsylvania</SchoolName>
              <AuthorName>Sophia Cornell</AuthorName>
              <SchoolName>Columbia University</SchoolName>
              <AuthorName>Noah Talerman</AuthorName>
              <SchoolName>University Of Michigan</SchoolName>
              <AuthorName>Emily Malpass</AuthorName>
              <SchoolName>Harvard University</SchoolName>
              <AuthorName>Shreya Ganguly</AuthorName>
              <SchoolName>Columbia University</SchoolName>
            </Col>
            <Col style={{ margin: "auto", textAlign: "center" }}>
              <img
                style={{ maxHeight: "500px", maxWidth: "100%" }}
                alt="currentissueImage"
                src="https://econmag-bucket.s3.amazonaws.com/public/2020/8/Spring+2020.jpeg"
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
                  This past semester has been fraught, to say the least. What
                  started as a tensely watched &ndash; albeit distant &ndash;
                  news story became an ineluctable and frightening reality for
                  those of us in Morningside Heights. Though the global pandemic
                  has undoubtedly had a differential impact on the economic and
                  physical well-being of individuals in the Columbia community,
                  we have all had to cope with unanticipated class cancellations
                  and the indefinite suspension of in-person campus activities.
                </p>

                <p style={{ textIndent: ".5in" }}>
                  Compounding individual tragedy is the dire global economic
                  outlook. The limited data we have at the time of publication
                  suggests the United States &ndash; like the rest of the world
                  &ndash; is in the throes of a sudden and dramatic downturn. As
                  unemployment claims climb to record highs, the increasingly
                  frequent comparisons made to the Great Depression become more
                  appropriate by the day.
                </p>

                <p style={{ textIndent: ".5in" }}>
                  It is under these circumstances that we present to you the
                  Spring 2020 Issue of the Columbia Economic Review. It is only
                  through the diligence and flexibility of our staff, editorial
                  board, and advisor that we were able to publish a full issue.
                  While the semester has been difficult, this has not
                  discernibly affected our collective effort. We believe,
                  unequivocally, that this edition represents the very best in
                  undergraduate economics research. It demonstrates our
                  capacity, as students, to make valuable contributions to the
                  realm of academic inquiry.
                </p>

                <p style={{ textIndent: ".5in" }}>
                  This issue features rigorous work in a range of topics. Though
                  there is no thematic connection, they share a common
                  sensitivity to matters of contemporary importance in
                  economics, politics, and society. Noah Talerman (University of
                  Michigan - Ann Arbor) examines the relationship between income
                  inequality and the adoption of computer technology by
                  analyzing countries&rsquo; internet penetration rates. Emily
                  Malpass (Harvard University) analyzes irregularities in the
                  market for egg donation as a result of adverse selection,
                  price controls, and consumer preferences. Sophia Cornell
                  (Columbia University) investigates collusion and other forms
                  of anti-competitive behavior in the World Cup. Elizaveta
                  Brover and Rebecca Schleimer (University of Pennsylvania)
                  examine the literature on childhood disability and its impact
                  on maternal labor supply. Lastly, we present an article by
                  Shreya Ganguly (Columbia University&ndash;Sciences-Po), a
                  member of the Review&rsquo;s online team, on the alleged
                  right-wing bias in introductory economics courses.{" "}
                </p>

                <p style={{ textIndent: ".5in" }}>
                  While we encountered difficulties in the publication process,
                  we overcame them with the guidance and support of faculty and
                  student body members. In particular, we would like to
                  acknowledge the invaluable assistance of Professor Wouter
                  Vergote, our academic advisor, Lauren Close, the Program
                  Manage at the Program for Economic Research (PER), and Dr.
                  Sophia N. Johnson, Assistant Director of PER. Their continued
                  involvement and encouragement make CER possible.
                </p>

                <p style={{ textIndent: ".5in" }}>
                  Lastly, we would like to offer a reflection on the coming
                  decade. Even though significant uncertainties cloud the
                  economic and social panorama, we know that there will be a
                  time after this crisis. That time will give all of us &ndash;
                  including us amateur economists &ndash; the opportunity to
                  understand the event we are currently living through. While we
                  may not know when that time will come, CER will continue to
                  facilitate the probing academic work that makes sense of a
                  complex world. We expect this crisis to be the topic of
                  research for years to come, and we hope to begin that effort
                  whenever sensible.
                </p>

                <p style={{ textIndent: ".5in" }}>
                  We would like to dedicate this journal in honor of those who
                  have lost their lives to this pandemic, as well as those
                  individuals working tirelessly to fight it and prevent further
                  loss of life.
                </p>

                <p style={{ marginBottom: "2px" }}>Sincerely,</p>
                <p style={{ paddingBottom: "5px", marginBottom: "0px" }}>
                  Ignacio Lopez Gaffney and Sinet Chelagat
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
        <h2>Online Feature:</h2>
        {isLoading ? (
          <LoaderDiv>
            <Spinner animation="border" variant="primary" />
          </LoaderDiv>
        ) : (
          <>{renderArticlesList(articles.data[4])}</>
        )}
      </InnerSection>
      {/* </Default> */}
      {/* <div className="Home">{renderArticlesLists()}</div> */}
    </>
  );
}
