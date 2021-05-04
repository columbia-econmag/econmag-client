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

const SliderSection = styled.section`
  padding: 5px 50px;
  background-color: aliceblue;
`;

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

const SliderMobile = styled(SliderSection)`
  padding: 5px 5px;
`;

const Header = styled.h2`
  padding: 30px 0px 0px 0px;
  font-weight: 600;
`;

const MobileHeader = styled.h2`
  padding: 35px 0px 0px 0px;
  font-weight: 600;
  text-align: center;
`;

export default function PrevIssues() {
  return (
    <>
      <Default key="defaultHome">
        <InnerSection>
        <Header>Previous Issues</Header>
        </InnerSection>
          <IssueSection style = {{backgroundColor: "#a0bbd3"}}>
          <InnerSection>
            <Suspense
              fallback={
                <div style={{ height: "500px", textAlign: "center" }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              }
            >
              <Issue query = "posts/category/Spring 2020 Issue" 
              issue = "Spring 2020 Issue" 
              image ="https://econmag-bucket.s3.amazonaws.com/public/2020/9/21-CER%20cover.jpg"
              volume = "Volume XII"/>
            </Suspense>
          </InnerSection>
        </IssueSection>
        <IssueSection style = {{backgroundColor: "aliceblue"}}>
          <InnerSection>
            <Suspense
              fallback={
                <div style={{ height: "500px", textAlign: "center" }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              }
            >
              <Issue query = "posts/category/Spring 2020 Issue" 
              issue = "Spring 2020 Issue" 
              image ="https://econmag-bucket.s3.amazonaws.com/public/2020/9/21-CER%20cover.jpg"
              volume = "Volume XII"/>
            </Suspense>
          </InnerSection>
        </IssueSection>
        <IssueSection style = {{backgroundColor: "rgb(0 123 255 / 25%)"}}>
          <InnerSection>
            <Header>Older Issues</Header>
            <h4>For older issues please <a href="https://issuu.com/columbiaeconreview">click here</a></h4>
            
          </InnerSection>
        </IssueSection>
        
      </Default>
    </>
  );
}
