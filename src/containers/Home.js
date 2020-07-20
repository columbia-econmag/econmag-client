import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";
import SimpleSlider from "../components/Slider";
import RecentArticles from "../components/RecentArticles";
import CategoriesView from "../components/HomeCategory";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { onError } from "../libs/errorLib";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";
import { useMediaQuery } from "react-responsive";

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

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      // if (!isAuthenticated) {
      //   const articles = await loadArticles();
      //   return;
      // }

      try {
        const articles = await loadArticles();
        setArticles(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, []);

  function loadArticles() {
    var x = API.get("posts", "posts/limit/11");
    return x;
  }
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
          <SimpleSlider />
        </SliderMobile>

        <MobileHeader>Recent Articles</MobileHeader>
        <RecentArticles key="mobileRecentArticles" />
        <MobileHeader>On Campus</MobileHeader>
        <CategoriesView category="On Campus" />
        <MobileHeader>U.S.</MobileHeader>
        <CategoriesView category="U.S." />
        <MobileHeader>World</MobileHeader>
        <CategoriesView category="World" />
      </Mobile>
      <Default key="defaultHome">
        <SliderSection>
          <InnerSection>
            <h2 style={{ fontWeight: 600 }}>Popular Articles</h2>
            <SimpleSlider />
          </InnerSection>
        </SliderSection>
        <InnerSection>
          <Header>Recent Articles</Header>
          <RecentArticles />
          <Header>On Campus</Header>
          <CategoriesView category="On Campus" />
          <Header>U.S.</Header>
          <CategoriesView category="U.S." />
          <Header>World</Header>
          <CategoriesView category="World" />
        </InnerSection>
      </Default>
      {/* <div className="Home">{renderArticlesLists()}</div> */}
    </>
  );
}
