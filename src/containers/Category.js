import React, { useState, useEffect, lazy, Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import {
  ListGroup,
  ListGroupItem,
  Spinner,
  Card,
  CardGroup,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import { chunk } from "lodash";
import makePretty, { randomImage } from "../libs/articleLib";
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
  // background-color: aliceblue;
`;

const MobileHeader = styled.h2`
  padding: 35px 0px 0px 0px;
  font-weight: 600;
  text-align: center;
`;

export default function Category(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { post_category } = useParams();
  console.log(post_category);
  console.log(props[0].location.search);
  const query = props[0].location.search;

  useEffect(() => {
    async function onLoad() {
      // if (!isAuthenticated) {
      //   const articles = await loadArticles();
      //   return;
      // }

      try {
        const articles = await loadArticles(query);
        console.log(articles);
        makePretty(articles, 500);
        setArticles(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, [query, post_category]);

  function loadArticles(query) {
    var x = API.get("posts", "posts/category/" + post_category + query);
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
  function renderArticlesList(post) {
    var html = (
      <>
        <Card.Img variant="top" src={showImage(post)} />
        <Card.Body>
          <Card.Title>{post.post_title}</Card.Title>
          <Card.Text>{[post.post_excerpt]}</Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Last updated 3 mins ago</small>
        </Card.Footer>
      </>
    );
    return html;
  }

  function renderArticlesLists(articles) {
    const sections = chunk(articles.data, 3);
    console.log(sections);
    // for (var i = 0; i < articles.length; i++){
    //   if (i % 3  === 0){
    //     toR +=
    //   }
    // }

    return sections.map((posts, i) => (
      <CardGroup key={i}>
        {posts.map((post) => (
          <Card key={post._id}>{renderArticlesList(post)}</Card>
        ))}
      </CardGroup>
    ));
  }

  return (
    <>
      <Mobile key="mobileHome">
        <SliderMobile>
          <h2>{post_category}</h2>
          <Suspense
            fallback={
              <div style={{ textAlign: "center" }}>
                <Spinner animation="border" variant="primary" />
              </div>
            }
          >
            <SimpleSlider query={"/category/" + post_category + "/limit/5"} />
          </Suspense>
        </SliderMobile>

        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <RecentArticles query={"/category/" + post_category + "/limit/3"} />
        </Suspense>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query={"/category/" + post_category + "/limit/3"} />
        </Suspense>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query={"/category/" + post_category + "/limit/3"} />
        </Suspense>
        <Suspense fallback={<Spinner animation="border" variant="primary" />}>
          <CategoriesView query={"/category/" + post_category + "/limit/3"} />
        </Suspense>
      </Mobile>
      <Default key="defaultHome">
        <InnerSection>
          <Header>{post_category}</Header>
          {!isLoading && renderArticlesLists(articles)}
        </InnerSection>
      </Default>
      {/* <div className="Home">{renderArticlesLists()}</div> */}
    </>
  );
}
