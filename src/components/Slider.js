import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import styled from "styled-components";
import makePretty, { randomImage } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import "./Slider.css";
import { useMediaQuery } from "react-responsive";
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 });
  return isNotMobile ? children : null;
};
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
const SliderTitle = styled.h3`
  text-align: center;
  // width: 50%;
  // float: right;
  // color: palevioletred;
  cursor: pointer;
`;

const MobileImage = styled.img`
  max-height: 50%;
  max-width: 95%;
  border-radius: 2px;
  display: block;
  margin: auto;
  vertical-align: middle;
  cursor: pointer;
`;
const MobileHeader = styled.h3`
  text-align: center;
  // color: palevioletred;
  cursor: pointer;
`;
const MobileText = styled.p`
  text-align: center;
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

const OuterMobile = styled.div`
  display: block;
`;

export default function SimpleSlider({ ...props }) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const articles = await loadArticles();
        setArticles(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }
    onLoad();
    return () => isLoading;
  }, [isLoading]);

  function loadArticles() {
    var x = API.get("posts", "posts/limit/5");
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

  function renderArticlesCarousel(posts) {
    const bigPosts = descriptionControl(posts, 600);

    const articles = bigPosts.map((post) => (
      <OuterDiv key={post._id}>
        <LinkContainer to={`/post/${post._id}`}>
          <ImgHolder key={post.post_author}>
            <SliderImage src={showImage(post)} />
          </ImgHolder>
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

  function descriptionControl(articles, maxLength) {
    for (var i = 0; i < articles.data.length; i++) {
      articles.data[i].post_excerpt = "";
    }

    var test = makePretty(articles, maxLength);
    return test;
  }

  function renderMobileCarousel(posts) {
    var smallPosts = descriptionControl(posts, 300);
    var temporary = smallPosts.map((post) => (
      <OuterMobile key={post._id}>
        <LinkContainer to={`/post/${post._id}`}>
          <MobileImage src={showImage(post)} />
        </LinkContainer>
        <LinkContainer to={`/post/${post._id}`}>
          <MobileHeader>{post.post_title}</MobileHeader>
        </LinkContainer>
        <MobileText
          dangerouslySetInnerHTML={{
            __html: post.post_excerpt,
          }}
        />
      </OuterMobile>
    ));
    return temporary;
  }

  // loadArticles(props.children);

  return (
    <>
      <Mobile>
        <Slider {...mobileSettings}>
          {!isLoading && renderMobileCarousel(articles)}
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
