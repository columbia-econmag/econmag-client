import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { LinkContainer } from "react-router-bootstrap";
import { API } from "aws-amplify";
import "./Home.css";

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
      console.log(articles);
      var x = await loadArticles();
      console.log(x);
      console.log(renderArticlesList(x));
      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadArticles() {
    var x = API.get("posts", "posts/limit/3");
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

  function renderArticlesCarousel(posts) {
    console.log(posts);

    const articles = posts.data.map((post) => (
      <div key={post._id}>
        <h3 className="carouselCaption">{post.post_title}</h3>
        <p>{post.post_content.trim().split("\n")[0]}</p>
      </div>
    ));
    return articles;
  }

  function renderCarousel() {
    var temp = settings;
    temp["arrows"] = true;
    console.log(settings);
    return (
      <div className="carouselContainer">
        <Slider {...temp}>
          {!isLoading && renderArticlesCarousel(articles)}
        </Slider>
      </div>
    );
  }

  return (
    <div>
      {renderCarousel()}
      <div className="Home">{renderArticlesLists()}</div>
    </div>
  );
}
