import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./EditArticle.css";
import { API } from "aws-amplify";
import styled from "styled-components";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImageUploader from "quill-image-uploader";
import ImageResize from "quill-image-resize-module-react";
import { ImageDrop } from "quill-image-drop-module";
import "./Articles.css";
import katex from "katex";
import "katex/dist/katex.min.css";
window.katex = katex;

ReactQuill.Quill.register("modules/imageResize", ImageResize);
ReactQuill.Quill.register("modules/imageDrop", ImageDrop);
ReactQuill.Quill.register("modules/imageUploader", ImageUploader);
const categories = [
  "On Campus",
  "Business",
  "World",
  "U.S",
  "Competitions",
  "2023-2024 Issue",
];
const OuterDiv = styled.div`
  margin: 20px 10%;
  overflow: auto;
`;
const Header = styled.h2`
  color: Black;
`;

const LabelHolder = styled.div`
  padding-bottom: 60px;
`;
const AuthorLabel = styled.h6`
  float: left;
  color: grey;
  cursor: pointer;
`;

const CoverImageWrap = styled.img`
  max-width: 40%;
  padding: 20px;
  padding-top: 0px !important;
`;

const DateLabel = styled.h6`
  color: grey;
  float: right;
  padding-bottom: 20px;
`;

const WarningLabel = styled.h6`
  color: #ff6d6dd1;
`;

const PrevWrapper = styled.div`
  padding-top: 30px;
  padding-bottom: 30px;
`;

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "formula"],
    ["clean"],
  ],
  imageResize: { parchment: ReactQuill.Quill.import("parchment") },
  imageDrop: true,
  imageUploader: {
    upload: (file) => {
      return new Promise((resolve, reject) => {
        resolve(s3Upload(file));
      });
    },
  },
};
const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "formula",
];
export default function NewArticle() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [excerptLong, setExcerptLong] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState([]);

  const handleCheckbox = (e, s) => {
    const checkedBoxes = [...category];
    if (e.target.checked) {
      checkedBoxes.push(s);
    } else {
      const index = checkedBoxes.findIndex((ch) => ch === s);
      checkedBoxes.splice(index, 1);
    }
    setCategory(checkedBoxes);
  };

  function validateForm() {
    return content.length > 0;
  }

  async function handleCoverImage(event) {
    console.log(event);
    console.log(event.target.files[0]);
    let attachment = await s3Upload(event.target.files[0]);
    setCoverImage(attachment);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await createArticle({
        title,
        author,
        content,
        category,
        excerpt,
        excerptLong,
        coverImage,
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function createArticle(article) {
    return API.post("posts", "posts", {
      body: {
        post_title: article.title,
        post_author: article.author,
        post_content: article.content,
        post_category: article.category,
        post_date: Date.now(),
        post_excerpt: article.excerpt,
        post_largeExcerpt: article.excerptLong,
        cover_image: article.coverImage,
      },
    });
  }

  function showCoverImage() {
    console.log(coverImage);
    if (coverImage !== "") {
      return <CoverImageWrap alt="cover" src={coverImage} />;
    }
    return null;
  }
  return (
    <div className="NewArticle">
      <form onSubmit={handleSubmit}>
        <OuterDiv>
          <h3>New Article</h3>
          <FormGroup controlId="title">
            <FormLabel
              style={{
                marginTop: "10px",
                fontWeight: "bold",
              }}
            >
              Title:
            </FormLabel>
            <FormControl
              required
              value={title}
              componentclass="textarea"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormGroup>
          <FormLabel style={{ marginBottom: "0px", fontWeight: "bold" }}>
            Author:
          </FormLabel>
          <WarningLabel>
            If this author has been previously published, please make sure this
            name matches the one registered in their previous article
          </WarningLabel>
          <FormGroup controlId="author">
            <FormControl
              required
              value={author}
              componentclass="textarea"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </FormGroup>
          <FormLabel style={{ marginBottom: "0px", fontWeight: "bold" }}>
            Categories:
          </FormLabel>
          <div key={`inline-checkbox`} className="mb-3">
            {categories.map((cat) => (
              <Form.Check
                key={cat}
                inline
                label={cat}
                type="checkbox"
                id={`inline-checkbox-1`}
                onChange={(e) => handleCheckbox(e, cat)}
              />
            ))}
          </div>
          <Form.Group controlId="excerptLong">
            <Form.Label style={{ marginBottom: "0px", fontWeight: "bold" }}>
              Long Excerpt:
            </Form.Label>
            <Form.Control
              required
              placeholder="Around 500 Characters Long"
              value={excerptLong}
              onChange={(e) => {
                setExcerptLong(e.target.value);
              }}
              as="textarea"
              rows="3"
            />
            <p style={{ textAlign: "right" }}>{excerptLong.length}/500</p>
          </Form.Group>
          <Form.Group controlId="excerpt">
            <Form.Label style={{ marginBottom: "0px", fontWeight: "bold" }}>
              Short Excerpt:
            </Form.Label>
            <Form.Control
              required
              placeholder="Around 200 Characters Long"
              value={excerpt}
              onChange={(e) => {
                setExcerpt(e.target.value);
              }}
              as="textarea"
              rows="2"
            />
            <p style={{ textAlign: "right" }}>{excerpt.length}/200</p>
          </Form.Group>
          <FormGroup controlId="file">
            <FormLabel style={{ marginBottom: "0px", fontWeight: "bold" }}>
              Cover Image:
            </FormLabel>
            <FormControl onChange={handleCoverImage} type="file" />
          </FormGroup>
          {showCoverImage()}
          <ReactQuill
            theme="snow"
            value={content}
            modules={modules}
            formats={formats}
            onChange={(v) => {
              // replace tabs with spaces
              v = v.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
              setContent(v);
            }}
          />
          <PrevWrapper>
            <h3 style={{ marginBottom: "0px" }}>Preview:</h3>
            <Header>{title}</Header>
            <LabelHolder>
              <AuthorLabel>By {author}</AuthorLabel>
              <DateLabel>
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "2-digit",
                }).format(new Date(Date.now()))}
              </DateLabel>
            </LabelHolder>

            <div
              className="journal"
              dangerouslySetInnerHTML={{
                __html: content,
              }}
            ></div>
          </PrevWrapper>
          <LoaderButton
            block
            type="submit"
            bssize="large"
            bsstyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Create
          </LoaderButton>
        </OuterDiv>
      </form>
    </div>
  );
}
