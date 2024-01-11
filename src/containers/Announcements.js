import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { API } from "aws-amplify";
import { onError } from "../libs/errorLib";
import styled from "styled-components";
import parse from "html-react-parser";
import { removeHome } from "../libs/articleLib";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Spinner } from "react-bootstrap";
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";
import "./Articles.css";

const Insta = styled(FaInstagramSquare)`
  width: 8%;
  height: 8%;
`;

const FB = styled(FaFacebookSquare)`
  width: 8%;
  height: 8%;
`;

const Header = styled.h2`
  color: Black;
  padding: 0px 20%;
  margin-top: 2%;
  margin-bottom: 2%;
  font-weight: bold;
  text-decoration: underline;
`;

const OuterDiv = styled.div`
  overflow: auto;
`;

export default function Announcements() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "auto",
  });

  return (
    <div className="Articles">
      <OuterDiv className="margins">
        <Header id="aboutBlurb" className="uglyJournal">
          Announcements
        </Header>
        <div className="uglyJournal">
              <p>
            <b>The Columbia Economic Review is currently taking high school essay submissions until 2/1. Submissions must meet the following requirements and be emailed to{" "}
                <a href="mailto:econreview@columbia.edu">econreview@columbia.edu</a>:</b>
            <ol type="1">
            <li>The content of the paper (not including the bibliography and extra data tables) must not exceed 5 pages. It is the author’s responsibility to trim down their work prior to submitting it.</li>
            <li>Include the author’s name and university, acknowledgements (if relevant), and image files of all graphics or tables used in the paper. All images should be included in the paper and separate files (e.g., jpeg) should be submitted alongside the paper.</li>
            <li>Any spreadsheets used should also have relevant data linked.</li>
            <li>Not have already been published in other journals. By submitting, you give CER the sole right to publish the paper and make any edits that we see fit. Please do not submit to other academic journals.</li>
            <li>All manuscripts should be submitted in PDF format with 1.5 line spacing. We strongly recommend manuscripts not exceed 40 pages (not including the bibliography and extra data tables). The suggested length includes reference lists, figures, and tables. Submit the .tex file if LaTeX was used). It is the author’s responsibility to condense the thesis prior to submitting the documents.</li>
            <li>Please use 12-point Times New Roman or similar font. Margins should be 1.5 inches on the top, bottom, and sides.</li>
            <li>Include an abstract of 100 or fewer words.</li> </ol> </p>
        </div>
      </OuterDiv>
    </div>
  );
}
