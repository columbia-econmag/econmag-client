import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { onError } from "../libs/errorLib";
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import config from "../config";
import { s3Upload } from "../libs/awsLib";
import "./Articles.css";

export default function Articles() {
  const file = useRef(null);
  const { _id } = useParams();
  const history = useHistory();
  const [article, setArticle] = useState(null);
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    function loadArticle() {
      return API.get("posts", `posts/${_id}`);
    }

    async function onLoad() {
      try {
        const article = await loadArticle();
        const { post_content, attachment } = article.data;
        if (attachment) {
          article.attachmentURL = await Storage.vault.get(attachment);
        }

        setContent(post_content);
        setArticle(article.data);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [_id]);

  function validateForm() {
    return content.length > 0;
  }

  function formatFilename(str) {
    return str.replace(/^\w+-/, "");
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  function saveArticle(article) {
    return API.put("posts", `posts/${_id}`, {
      body: { post_content: article.content },
    });
  }

  async function handleSubmit(event) {
    let attachment;

    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      await saveArticle({
        content,
        attachment: attachment || article.attachment,
      });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }

  function deleteArticle() {
    return API.del("posts", `posts/${_id}`);
  }

  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this article?"
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteArticle();
      history.push("/");
    } catch (e) {
      onError(e);
      setIsDeleting(false);
    }
  }

  return (
    <div className="Articles">
      {article && (
        <form onSubmit={handleSubmit}>
          <FormGroup controlId="content">
            <FormControl
              value={content}
              componentclass="textarea"
              onChange={(e) => setContent(e.target.value)}
            />
          </FormGroup>
          <div
            className="journal"
            dangerouslySetInnerHTML={{ __html: content }}
          />
          {article.attachment && (
            <FormGroup>
              <FormLabel>Attachment</FormLabel>
              <FormControl.Static>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={article.attachmentURL}
                >
                  {formatFilename(article.attachment)}
                </a>
              </FormControl.Static>
            </FormGroup>
          )}
          <FormGroup controlId="file">
            {!article.attachment && <FormLabel>Attachment</FormLabel>}
            <FormControl onChange={handleFileChange} type="file" />
          </FormGroup>
          <LoaderButton
            block
            type="submit"
            bssize="large"
            bsstyle="primary"
            isLoading={isLoading}
            disabled={!validateForm()}
          >
            Save
          </LoaderButton>
          <LoaderButton
            block
            bssize="large"
            bsstyle="danger"
            onClick={handleDelete}
            isLoading={isDeleting}
          >
            Delete
          </LoaderButton>
        </form>
      )}
    </div>
  );
}
