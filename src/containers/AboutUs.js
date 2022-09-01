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

export default function AboutUs() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "auto",
  });

  return (
    <div className="Articles">
      <OuterDiv className="margins">
        <Header id="aboutBlurb" className="uglyJournal">
          About Us
        </Header>
        <div className="uglyJournal">
          <p>
            Founded in 2009 as the first undergraduate economics journal in the
            United States, the Columbia Economics Review (CER) aims to promote
            economics discourse and research at the intersection of business,
            politics, society and moreby publishing a rigorous selection of
            student essays, opinions and research papers in a print journal
            released each semester. CER also maintains an online magazine
            featuring original content by staff and other featured authors aimed
            at general audience on and off-campus. We also engage with our
            community through speaker series, symposia, competitions and other
            events dedicated to fostering and enriching economics discourse on
            campus. CER is sponsored by the{" "}
            <a href="https://econ.columbia.edu/per/">
              Program for Economic Research at Columbia University
            </a>{" "}
            and the{" "}
            <a href="http://iserp.columbia.edu/">
              Institute for Social and Economic Research and Policy
            </a>
            . CER is led, organized and operated entirely by undergraduate
            students at Columbia across a diverse array of academic disciplines.
          </p>
        </div>
        <Header id="contactUs">Contact Us</Header>
        <a id="contactUs" />
        <div className="uglyJournal">
          <p>
            For comments, questions and submission inquiries please email us at{" "}
            <a href="mailto:econreview@columbia.edu">econreview@columbia.edu</a>{" "}
            or reach out via our Facebook or Instagram pages
          </p>
          <a href="https://www.facebook.com/ColumbiaEconomicsReview">
            <FB />
          </a>
          <a href="https://www.instagram.com/columbiaeconreview/">
            <Insta />
          </a>
        </div>
        <Header>Join Us</Header>
        <a id="joinUs"></a>

        <div className="uglyJournal">
          <p>
            We require all potential staff members to be current undergraduate
            students at Columbia University. Students who are interested in CER
            are recommended to attend our events through the year and follow our
            social media accounts to learn more about recruitment each semester.
          </p>
        </div>
        <a id="managingBoard"></a>
        <Header>Managing Board</Header>
        <div className="uglyJournal">
          <p>Editor in Chief: Jacob Kim-Sherman</p>
          <p>President: Alqaim Lalani</p>
          <p>Managing Editor—Journal: Jessica Li</p>
          <p>Managing Editor—Online: Zac Narimanian</p>
          <p>Managing Editor—Operations: Amina Isayeva</p>
        </div>
      </OuterDiv>
    </div>
  );
}
