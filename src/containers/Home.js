import React, { useState, useEffect } from "react";
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

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const articles = await loadArticles();
        setArticles(articles);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadArticles() {
    var x = API.get("posts", "posts/limit/20");
    return x;
  }
  function renderArticlesList(posts) {
    return [{}].concat(posts.data).map((post, i) =>
      i !== 0 ? (
        <LinkContainer key={post._id} to={`/post/${post._id}`}>
          <ListGroupItem header={post.post_title}>
            {post.post_content.trim().split("\n")[0]}
            {"Created: " + new Date(post.post_date).toLocaleString()}
          </ListGroupItem>
        </LinkContainer>
      ) : (
        <LinkContainer key="new" to="/articles/new">
          <ListGroupItem>
            <h4>
              <b>{"\uFF0B"}</b> Create a new article
            </h4>
          </ListGroupItem>
        </LinkContainer>
      )
    );
  }

  function renderLander() {
    return (
      <div className="lander">
        <h1>Columbia Econ Review</h1>
        <p>Test Page</p>
      </div>
    );
  }

  function renderArticles() {
    return (
      <div className="articles">
        <PageHeader>Your Articles</PageHeader>
        <ListGroup>{!isLoading && renderArticlesList(articles)}</ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderArticles() : renderLander()}
    </div>
  );
}
