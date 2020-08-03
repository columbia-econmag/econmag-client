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
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   async function onLoad() {
  //     // if (!isAuthenticated) {
  //     //   const articles = await loadArticles();
  //     //   return;
  //     // }

  //     try {
  //       const articles = await loadArticles();
  //       setArticles(articles);
  //     } catch (e) {
  //       onError(e);
  //     }
  //     setIsLoading(false);
  //   }
  //   onLoad();
  // }, []);

  // function loadArticles() {
  //   var x = API.get("posts", "posts?limit=11");
  //   return x;
  // }
  function renderArticlesList(posts) {
    // for()
    return [{}].concat(posts.data).map((post, i) =>
      i !== 0 ? (
        <LinkContainer key={post._id} to={`/post/${post._id}`}>
          <ListGroupItem header={post.post_title}>
            {post.post_content.trim().split("\n")[0]}
            {"Created: " + new Date(post.post_date).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : null
    );
  }

  function renderArticlesLists() {
    return (
      <div className="articles">
        <h2>Your Articles</h2>
        <ListGroup>{!isLoading && renderArticlesList(articles)}</ListGroup>
      </div>
    );
  }

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
            <SimpleSlider query="/category/World/limit/5" />
          </Suspense>
        </SliderMobile>

        <MobileHeader>Recent Articles</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="" />
        </Suspense>
        <MobileHeader>Business</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="/category/Business/limit/3" />
        </Suspense>
        <MobileHeader>U.S.</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="/category/U.S./limit/3" />
        </Suspense>
        <MobileHeader>World</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="/category/World/limit/3" />
        </Suspense>
        <MobileHeader>On Campus</MobileHeader>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query="/category/On Campus/limit/3" />
        </Suspense>
      </Mobile>

      <Default key="defaultHome">
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
              <SimpleSlider query="/category/World/limit/5" />
            </Suspense>
          </InnerSection>
        </SliderSection>
        <InnerSection>
          <Header>Recent Articles</Header>
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
        <IssueSection>
          <InnerSection>
            <h2 style={{ fontWeight: 600, paddingTop: "25px" }}>
              Current Issue
            </h2>
            <div style={{ height: "300px", textAlign: "center" }}>
              <a
                href="https://issuu.com/columbiaeconreview/docs/cerspring2020"
                target="_blank"
              >
                <img
                  style={{ height: "280px" }}
                  alt="currentissueImage"
                  src="https://image.isu.pub/200612230156-36b641323d72cc38825fbe8b98b520dd/jpg/page_1_thumb_large.jpg"
                />
              </a>
              {/* <h4 style={{ float: "right" }}>Relevant Sections:</h4> */}
            </div>
          </InnerSection>
        </IssueSection>

        <InnerSection>
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
            <FiveViewBlock query="/category/Business/limit/5" />
          </Suspense>

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
            <CategoriesView query="/category/World/limit/3" />
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
            <CategoriesView query="/category/On Campus/limit/3" />
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
            <CategoriesView query="/category/U.S./limit/3" />
          </Suspense>
        </InnerSection>
      </Default>
      {/* <div className="Home">{renderArticlesLists()}</div> */}
    </>
  );
}
