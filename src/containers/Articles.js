import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import styled from "styled-components";
import parse from "html-react-parser";
import { removeHome } from "../libs/articleLib";
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
`;
const DateLabel = styled.h6`
  color: grey;
  float: right;
  padding-bottom: 20px;
`;
export default function Articles() {
  const { _id } = useParams();
  const [article, setArticle] = useState(null);

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
      <OuterDiv className="margins">
        <Header>{post.post_title}</Header>
        <LabelHolder>
          <AuthorLabel>By {post.post_author}</AuthorLabel>
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
    );
  }

  return <div className="Articles">{article && renderArticle(article)}</div>;
}
