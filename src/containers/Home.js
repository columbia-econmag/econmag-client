import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import makePretty, { randomImage } from "../libs/articleLib";
import styled from "styled-components";
import SimpleSlider from "../components/Slider";
import RecentArticles from "../components/RecentArticles";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

const SliderSection = styled.section`
  padding: 5px 50px;
  background-color: aliceblue;
`;

const RecentHeader = styled.h2`
  padding: 30px 0px 0px 50px;
  // background-color: aliceblue;
`;

export default function Home() {
  const [articles, setArticles] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);
  const settings = {
    dots: true,
    // arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

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
    console.log(posts.data);
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
        <PageHeader>Your Articles</PageHeader>
        <ListGroup>{!isLoading && renderArticlesList(articles)}</ListGroup>
      </div>
    );
  }

  return (
    <div>
      <SliderSection>
        <h2>Popular Articles</h2>
        <SimpleSlider />
      </SliderSection>

      <RecentHeader>Recent Articles</RecentHeader>
      <RecentArticles />

      <div className="Home">{renderArticlesLists()}</div>
    </div>
  );
}
