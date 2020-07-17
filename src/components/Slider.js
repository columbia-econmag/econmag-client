import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import styled from "styled-components";
import makePretty, { randomImage } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import "./Slider.css";
import { useMediaQuery } from "react-responsive";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 });
  return isDesktop ? children : null;
};
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 });
  return isTablet ? children : null;
};
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};

const SliderTitle = styled.h3`
  text-align: center;
  // width: 50%;
  // float: right;
  color: palevioletred;
  cursor: pointer;
`;

const SliderCaption = styled.p`
  text-align: center;
  // width: 50%;
  // float: right;
  color: black;
`;
const ImgHolder = styled.div`
  text-align: center;
  display: flex;
  width: 50%;
  justify-content: center;
  float: left;
  overflow: auto;
`;
const TextHolder = styled.div`
  text-align: center;
  display: block;
  width: 50%;
  justify-content: center;
  float: left;
  overflow: auto;
`;
const SliderImage = styled.img`
  max-height: 80%;
  max-width: 85%;
  border-radius: 2px;
  display: block;
  margin: auto;
  vertical-align: middle;
  float: right;
  cursor: pointer;
`;

const OuterDiv = styled.div`
  display: flex !important;
`;

export default function SimpleSlider({ ...props }) {
  console.log(props.children);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const articles = await loadArticles();
        setArticles(articles);
        makePretty(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
  }, []);

  function loadArticles() {
    var x = API.get("posts", "posts/limit/5");
    return x;
  }

  function showImage(post) {
    var item = randomImage();
    if (post.cover_image) {
      return <SliderImage src={post.cover_image.src} />;
    } else {
      return <SliderImage src={item} />;
    }
  }

  function renderArticlesCarousel(posts) {
    console.log(posts);

    const articles = posts.data.map((post) => (
      <OuterDiv key={post._id}>
        <LinkContainer to={`/post/${post._id}`}>
          <ImgHolder key={post.post_author}>{showImage(post)}</ImgHolder>
        </LinkContainer>
        <TextHolder>
          <LinkContainer to={`/post/${post._id}`}>
            <SliderTitle>{post.post_title}</SliderTitle>
          </LinkContainer>
          <SliderCaption
            dangerouslySetInnerHTML={{
              __html: post.post_excerpt,
            }}
          >
            {/* {post.post_content.trim().split("\n")[0]} */}
          </SliderCaption>
        </TextHolder>
      </OuterDiv>
    ));
    return articles;
  }

  // loadArticles(props.children);
  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const mobileSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Mobile>
        <Slider {...mobileSettings}>
          {!isLoading && renderArticlesCarousel(articles)}
        </Slider>
      </Mobile>
      <Default>
        <Slider {...settings}>
          {!isLoading && renderArticlesCarousel(articles)}
        </Slider>
      </Default>
    </>
  );
}
