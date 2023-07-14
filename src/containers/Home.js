import React, { useState, lazy, Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import { ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";
import { useMediaQuery } from "react-responsive";
const CategoriesView = lazy(() => import("../components/HomeCategory"));
const RecentArticles = lazy(() => import("../components/RecentArticles"));
const SimpleSlider = lazy(() => import("../components/Slider"));
const FiveViewBlock = lazy(() => import("../components/FiveViewBlock"));
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
  background-color: #a0bbd3;
`;

const InnerSection = styled.section`
  margin: auto;
  padding: 0px 2%;
  max-width: 1200px;
  // background-color: aliceblue;
`;

const SliderMobile = styled(SliderSection)`
  padding: 5px 5px;
`;

const Header = styled.h2`
  padding: 30px 0px 0px 0px;
  font-weight: 600;
  display: inline-block;
  cursor: pointer;
  // background-color: aliceblue;
  &:hover {
    color: grey;
  }
`;

const MobileHeader = styled.h2`
  padding: 35px 0px 0px 0px;
  font-weight: 600;
  text-align: center;
`;

export default function Home() {
  return (
    <>
      <Mobile key="mobileHome">
        <SliderMobile>
          <h2>Popular Articles</h2>
          <Suspense
            fallback={
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            }
          >
            <SimpleSlider query="/category/World/limit/5/excerpt" />
          </Suspense>
        </SliderMobile>

        <MobileHeader>Recent Articles</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="excerpt?limit=3" />
        </Suspense>
        <IssueSection>
          <InnerSection>
            <Suspense
              fallback={
                <div style={{ height: "500px", textAlign: "center" }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              }
            >
              <Issue query = "posts/category/Spring 2023 Issue" 
              issue = "Spring 2023 Issue" 
              image ="https://econmag-bucket.s3.amazonaws.com/public/ImageIssue/Spring 2021 Issue.jpg"
              volume = "Volume XV"
              isPrev = {false}/>
            </Suspense>
          </InnerSection>
        </IssueSection>
        <MobileHeader>Business</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="/category/Business/limit/3/excerpt" />
        </Suspense>
        <MobileHeader>U.S.</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="/category/U.S./limit/3/excerpt" />
        </Suspense>
        <MobileHeader>World</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="/category/World/limit/3/excerpt" />
        </Suspense>
        <MobileHeader>On Campus</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="/category/On Campus/limit/3/excerpt" />
        </Suspense>
      </Mobile>

      <Default key="defaultHome">
      <IssueSection>
          <InnerSection>
            <Suspense
              fallback={
                <div style={{ height: "500px", textAlign: "center" }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              }
            >
              <Issue query = "posts/category/Spring 2023 Issue" 
              issue = "Spring 2023 Issue" 
              image ="https://econmag-bucket.s3.amazonaws.com/public/ImageIssue/Spring 2021 Issue.jpg"
              volume = "Volume XV"/>
            </Suspense>
          </InnerSection>
        </IssueSection>
        
        <InnerSection>
          <LinkContainer to="/recent?limit=9&page=1">
            <Header>Recent Articles</Header>
          </LinkContainer>
          <Suspense
            fallback={
              <div style={{ height: "600px", textAlign: "center" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            }
          >
            <RecentArticles query="" />
          </Suspense>
        </InnerSection>
        
        <SliderSection>
          <InnerSection>
            <h2 style={{ fontWeight: 600, paddingTop: "25px" }}>
              Popular Articles
            </h2>
            <Suspense
              fallback={
                <div style={{ height: "500px", textAlign: "center" }}>
                  <Spinner animation="border" variant="primary" />
                </div>
              }
            >
              <SimpleSlider query="/category/World/limit/7/excerpt" />
            </Suspense>
          </InnerSection>
        </SliderSection>

        <InnerSection>
          <LinkContainer to="/category/World?limit=9&page=1">
            <Header>World</Header>
          </LinkContainer>
          <Suspense
            fallback={
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            }
          >
            <FiveViewBlock query="/category/World/limit/5/excerpt" />
          </Suspense>
          <LinkContainer to="/category/U.S.?limit=9&page=1">
            <Header>U.S.</Header>
          </LinkContainer>
          <Suspense
            fallback={
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            }
          >
            <CategoriesView query="/category/U.S./limit/3/excerpt" />
          </Suspense>
          <LinkContainer to="/category/Business?limit=9&page=1">
            <Header>Business</Header>
          </LinkContainer>
          <Suspense
            fallback={
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            }
          >
            <CategoriesView query="/category/Business/limit/3/excerpt" />
          </Suspense>
          <LinkContainer to="/category/On Campus?limit=9&page=1">
            <Header>On Campus</Header>
          </LinkContainer>
          <Suspense
            fallback={
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            }
          >
            <CategoriesView query="/category/On Campus/limit/3/excerpt" />
          </Suspense>
          
        </InnerSection>
      </Default>
    </>
  );
}
