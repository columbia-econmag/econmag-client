import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Spinner } from "react-bootstrap";
import { API, Cache } from "aws-amplify";
import { onError } from "../libs/errorLib";
import styled from "styled-components";
import makePretty, { randomImage } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import "./Slider.css";
import { useMediaQuery } from "react-responsive";
import { MdNavigateNext } from "react-icons/md";
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
  text-align: left;
  cursor: pointer;
  margin-bottom: 0px;
  &:hover {
    text-decoration: underline;
    text-decoration-color: #a0bbd3;
  }
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
  display: inline-block;
  &:hover {
    color: #d4a3a1;
  }
`;

const SliderCaption = styled.p`
  text-align: left;
  // width: 50%;
  // float: right;
  color: black;
`;

const Author = styled.p`
  text-align: left;
  color: grey;
  margin-bottom: 4px;
  cursor: pointer;
  display: inline-block;
  &:hover {
    color: #a0bbd3;
  }
`;

const ImgHolder = styled.div`
  text-align: left;
  display: flex;
  width: 50%;
  justify-content: center;
  float: left;
  overflow: auto;
`;
const TextHolder = styled.div`
  text-align: left;
  margin-left: 15px;
  display: block;
  width: 50%;
  // justify-content: center;
  float: left;
  overflow: auto;
`;
const SliderImage = styled.img`
  max-height: 100%;
  max-width: 90%;
  padding: 8px 0px;
  border-radius: 2px;
  display: block;
  margin-right: 15px !important;
  margin-left: 1px;
  margin: auto;
  vertical-align: middle;
  float: right;
  cursor: pointer;
`;

const OuterDiv = styled.div`
  display: flex !important;
`;

const LoaderDiv = styled.div`
  height: 350px !important;
  text-align: center;
`;

const MobileLoaderDiv = styled.div`
  height: 500px !important;
  text-align: center;
`;

const OuterMobile = styled.div`
  display: block;
  text-align: center;
`;

export default function SimpleSlider(...props) {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const propQuery = props[0].query;
  useEffect(() => {
    async function onLoad() {
      try {
        var articles = Cache.getItem("slider");
        if (!articles) {
          articles = await loadArticles(propQuery);
          Cache.setItem("slider", articles);
        }
        setArticles(articles);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
      try {
        let cachedArticles = Cache.getItem("slider");
        let tempArticles = await loadArticles(propQuery);
        if (
          cachedArticles.data[0].post_title !==
            tempArticles.data[0].post_title ||
          cachedArticles.data[0].post_content !==
            tempArticles.data[0].post_content ||
          cachedArticles.data[0].post_excerpt !==
            tempArticles.data[0].post_excerpt ||
          cachedArticles.data[0].post_largeExcerpt !==
            tempArticles.data[0].post_largeExcerpt
        ) {
          Cache.setItem("slider", tempArticles);
        }
      } catch (e) {
        onError(e);
      }
    }
    onLoad();
    return () => isLoading;
  }, [propQuery, isLoading]);

  function loadArticles(propQuery = "") {
    var x = API.get("posts", "posts/" + propQuery);
    return x;
  }
  function showImage(post) {
    var item = randomImage();
    if (post.cover_image) {
      return post.cover_image;
    } else {
      return item;
    }
  }

  function renderArticlesCarousel(posts) {
    const bigPosts = descriptionControl(posts, 600);
    console.log(bigPosts);
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
          <LinkContainer to={`/author/${post.post_author}?limit=9&page=1`}>
            <Author>{post.post_author}</Author>
          </LinkContainer>
          <SliderCaption
            dangerouslySetInnerHTML={{
              __html: post.post_largeExcerpt,
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
      if (!articles.data[i].post_excerpt) {
        articles.data[i].post_excerpt = "";
      }
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
        <LinkContainer to={`/author/${post.post_author}?limit=9&page=1`}>
          <Author>{post.post_author}</Author>
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
        {isLoading ? (
          <MobileLoaderDiv>
            <Spinner animation="border" variant="primary" />
          </MobileLoaderDiv>
        ) : (
          <Slider {...mobileSettings}>
            {/* {!isLoading && renderMobileCarousel(articles)} */}

            {renderMobileCarousel(articles)}
          </Slider>
        )}
      </Mobile>
      <Default>
        {isLoading ? (
          <LoaderDiv>
            <Spinner animation="border" variant="primary" />
          </LoaderDiv>
        ) : (
          <Slider {...settings}>
            {/* {!isLoading && renderArticlesCarousel(articles)} */}
            {renderArticlesCarousel(articles)}
          </Slider>
        )}
      </Default>
    </>
  );
}
