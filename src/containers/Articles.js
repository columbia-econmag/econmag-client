import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import styled from "styled-components";
import parse from "html-react-parser";
import { removeHome } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import { Button } from "react-bootstrap";
import { FcPrevious } from "react-icons/fc";
import "./Articles.css";

const Header = styled.h2`
  color: Black;
`;

const OuterDiv = styled.div`
  overflow: auto;
`;

const LabelHolder = styled.div`
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
  const { _id } = useParams();
  const [article, setArticle] = useState(null);
  let history = useHistory();

  useEffect(() => {
    function loadArticle() {
      return API.get("posts", `posts/${_id}`);
    }

    async function onLoad() {
      try {
        const article = await loadArticle();
        setArticle(article.data);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [_id]);

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
          <Header>{post.post_title}</Header>
          <LabelHolder>
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

  return <div className="Articles">{article && renderArticle(article)}</div>;
}
