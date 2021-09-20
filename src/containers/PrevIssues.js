import React, { useState, lazy, Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { useMediaQuery } from "react-responsive";
const Issue = lazy(() => import("../components/HomeIssue"));

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

//IF ADDING NEW ISSUES CHANGE THIS 
const prevIssues = [
  "Fall 2020 Issue",
  "Spring 2020 Issue"
];

//ALSO CHANGE THIS
const prevVolumes = [
  "Volume XIII",
  "Volume XII"
]

//
const backgroundColors = [
  "rgb(160, 187, 211, 0.5)",
  "rgba(0, 123, 255, 0.25)"
]

const IssueSection = styled.section`
  padding: 5px 50px;
  border-bottom-style: solid;
  border-bottom-color: rgb(38,38,38,0.8);
  border-width: 3px;
`;

const InnerSection = styled.section`
  margin: auto;
  padding: 10px 2%;
  max-width: 1200px;
  // background-color: aliceblue;
`;

const Header = styled.h2`
  padding: 30px 0px 0px 0px;
  font-weight: 600;
`;


function renderArticlesList(prevIssue, i) {
  var imageIss = "https://econmag-bucket.s3.amazonaws.com/public/ImageIssue/" + prevIssue + ".jpg";
  var quer = "posts/category/" + prevIssue
  var color = backgroundColors[i%2]
  console.log(color)
  var html = (
    <>
      <IssueSection style = {{backgroundColor: color}} key = {prevIssue}>
          <InnerSection>
            <Suspense
              fallback={
                <div style={{ height: "500px", textAlign: "center" }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              }
            >
              <Issue query = {quer}
              issue = {prevIssue} 
              image = {imageIss}
              volume = {prevVolumes[i]}
              isPrev = {true}/>
            </Suspense>
          </InnerSection>
        </IssueSection>
    </>
  );
  return html;
}

function renderIssueList(prevIssues) {
  var toR = [];
  for (let i = 0 ; i < prevIssues.length; i++) {
    toR.push(renderArticlesList(prevIssues[i], i));
  }
  return toR;
}

export default function PrevIssues() {
  return (
    <>
      <div key="defaultHome">
        <InnerSection>
        <Header>Past Issues</Header>
        </InnerSection>
        {renderIssueList(prevIssues)}
        <IssueSection style = {{backgroundColor: "aliceblue"}}>
          <InnerSection>
            <Header>Older Issues</Header>
            <h4>For older issues please <a href="https://issuu.com/columbiaeconreview">click here</a></h4>
            
          </InnerSection>
        </IssueSection>
        
      </div>
    </>
  );
}
