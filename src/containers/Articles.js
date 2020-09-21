import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import styled from "styled-components";
import parse from "html-react-parser";
import { removeHome } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Spinner } from "react-bootstrap";
import { FcPrevious } from "react-icons/fc";
import "./Articles.css";

const Header = styled.h2`
  color: Black;
  padding: 0px 25%;
`;

const OuterDiv = styled.div`
  overflow: auto;
`;

const LabelHolder = styled.div`
  padding: 0px 25%;
  padding-bottom: 60px;
`;
const AuthorLabel = styled.h6`
  float: left;
  color: grey;
  cursor: pointer;
  &:hover {
    color: #a0bbd3;
  }
`;
const DateLabel = styled.h6`
  color: grey;
  float: right;
  padding-bottom: 20px;
`;

const MyButton = styled(Button)`
  margin-left: 10%;
  margin-top: 10px;
  background-color: #f0f0f0;
  display: flex;
`;

const ButtonDiv = styled.div``;
export default function Articles() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "auto",
  });
  const { _id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [article, setArticle] = useState(null);
  let history = useHistory();

  useEffect(() => {
    function loadArticle() {
      return API.get("posts", `posts/${_id}`);
    }

    async function onLoad() {
      try {
        const article = await loadArticle();
        await addView(article.data["post_clicks"]);
        setArticle(article.data);
      } catch (e) {
        onError(e);
      }
      setIsLoading(false);
    }

    onLoad();
  }, [_id]);

  function addView(clicks) {
    console.log("THIS IS RUNNING");
    if (clicks) {
      API.put("posts", `posts/${_id}`, {
        body: {
          post_clicks: clicks + 1,
        },
      });
    } else {
      API.put("posts", `posts/${_id}`, {
        body: {
          post_clicks: 1,
        },
      });
    }
  }

  function renderArticle(post) {
    var content = removeHome(post.post_content);
    return (
      <>
        <ButtonDiv>
          <MyButton
            className="buttonMargin"
            variant="outline-light"
            size="sm"
            onClick={() => history.goBack()}
          >
            <FcPrevious />
          </MyButton>
        </ButtonDiv>
        <OuterDiv className="margins">
          <Header className="uglyJournal">{post.post_title}</Header>
          <LabelHolder className="uglyJournal">
            <LinkContainer to={`/author/${post.post_author}?limit=9&page=1`}>
              <AuthorLabel>By {post.post_author}</AuthorLabel>
            </LinkContainer>
            <DateLabel>
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              }).format(new Date(post.post_date))}
            </DateLabel>
          </LabelHolder>
          <div className="uglyJournal">{parse(content.uglyDiv)}</div>
          <div className="journal">{parse(content.prettyDiv)}</div>
        </OuterDiv>
      </>
    );
  }

  return (
    <div className="Articles">
      {isLoading ? (
        <div style={{ height: "1000px", width: "100%", textAlign: "center" }}>
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <>{renderArticle(article)}</>
      )}
    </div>
  );
}
