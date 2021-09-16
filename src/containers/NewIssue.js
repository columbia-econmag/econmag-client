import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, FormLabel, Form } from "react-bootstrap";
import { s3Upload } from "../libs/awsLib-issue";
import "./EditArticle.css";
import styled from "styled-components";
import "./Articles.css";

const CoverImageWrap = styled.img`
  max-width: 40%;
  padding: 20px;
  padding-top: 0px !important;
`;

const InnerSection = styled.section`
  margin: auto;
  padding: 2% 2%;
  max-width: 1200px;
  // background-color: aliceblue;
`;

const OuterDiv = styled.div`
  display: flex !important;
  padding: 20px 0px;
`;

export default function NewArticle() {
  const [coverImage, setCoverImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleCoverImage(event) {
    console.log(event);
    console.log(event.target.files[0]);
    let attachment = await s3Upload(event.target.files[0]);
    setCoverImage(attachment);
  }

  function showCoverImage() {
    if (coverImage !== "") {
      return (
        <div>
          <CoverImageWrap alt="cover" src={coverImage} />
          <p>Please make sure that this image is correct</p>
          <p>Link to the image: </p>
          <a href={coverImage}>{coverImage}</a>
        </div>);
    }
    return null;
  }
  return (
    <InnerSection>
      <h4><b>Adding a cover image for the newest edition:</b></h4>
      <br/>
      <h5><b>IMPORTANT</b>: Make sure to rename the image is a <a href="https://png2jpg.com/">JPG</a> and is named in this format: "*Semester* *Year* Issue"</h5>
      <p>For example: "Spring 2020 Issue"</p>
      <p>If you do not do this, the image will not appear correctly in the previous issue page, please check that page to make sure everything worked correctly</p>
      <div className="NewArticle">
            <FormGroup controlId="file">
              <FormLabel style={{ marginBottom: "0px", fontWeight: "bold" }}>
                Cover Image:
              </FormLabel>
              <FormControl onChange={handleCoverImage} type="file" />
            </FormGroup>
            {showCoverImage()}
      </div>
    </InnerSection>
  );
}
