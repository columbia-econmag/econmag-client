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
            United States, the Columbia Economic Review (CER) aims to promote
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
              <p>
            <b>The Columbia Economic Review is not currently taking submissions. Journal submissions must meet the following requirements:</b>
            <ol type="1">
            <li>The content of the paper (not including the bibliography and extra data tables) must not exceed 40 pages. It is the author’s responsibility to trim down their work prior to submitting it.</li>
            <li>Include the author’s name and university, acknowledgements (if relevant), and image files of all graphics or tables used in the paper. All images should be included in the paper and separate files (e.g., jpeg) should be submitted alongside the paper.</li>
            <li>Any spreadsheets used should also have relevant data linked.</li>
            <li>Not have already been published in other journals. By submitting, you give CER the sole right to publish the paper and make any edits that we see fit. Please do not submit to other academic journals.</li>
            <li>All manuscripts should be submitted in PDF format with 1.5 line spacing. We strongly recommend manuscripts not exceed 40 pages (not including the bibliography and extra data tables). The suggested length includes reference lists, figures, and tables. Submit the .tex file if LaTeX was used). It is the author’s responsibility to condense the thesis prior to submitting the documents.</li>
            <li>Please use 12-point Times New Roman or similar font. Margins should be 1.5 inches on the top, bottom, and sides.</li>
            <li>Include an abstract of 100 or fewer words.</li> </ol> </p>
        </div>
        <Header id="contactUs">Contact Us</Header>
        <a id="contactUs" />
        <div className="uglyJournal">
          <p>
            For comments, questions and submission inquiries please email us at{" "}
            <a href="mailto:econreview@columbia.edu">econreview@columbia.edu</a>{" "}
            or reach out via our Facebook or Instagram pages. </p>

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
            Columbia Economic Review has concluded recruiting for the Fall 2022 application 
            cycle. Check back for more updates regarding Spring 2022 recruitment.
          </p>
          <p>
            We require all potential staff members to be current undergraduate
            students at Columbia University. Students who are interested in CER
            are recommended to attend our events through the year and follow our
            social media accounts to learn more about recruitment each semester.
          </p>
        </div>
        <a id="managingBoard"></a>
        <Header>2022–2023 Managing Board</Header>
        <div className="uglyJournal">
          <p><b>Jacob Kim-Sherman</b>, Editor-In-Chief </p>
          <img src="/Jacob.jpg" alt="Jacob"/>
          <p>Jacob Kim-Sherman (CC ’23) is a Laidlaw Scholar studying Economics and Mathematics. He is originally
          from Santa Barbara, California, and hopes to pursue a career in Economics academia. Outside of CER and
          Economics, he enjoys learning the keyboard works of Johann Sebastian Bach. After graduation, Jacob will
          work as a Research Analyst at the Federal Reserve Bank of New York. </p>

          <p><b>Alqaim Lalani</b>, President </p>
          <img src="/Alqaim.png" alt="Alqaim"/>

          <p>Alqaim Lalani (CC ‘23) is a John W. Kluge Scholar double majoring in Economics and History. He is
          originally from Dar es Salaam, Tanzania. Alqaim has also studied at Pembroke College, University of
          Cambridge. He previously served as a Contributing Writer and later as the Executive Editor. Outside
          of CER, Alqaim is the Chair of the Columbia College Senior Fund, Executive Board Member of the Columbia
          Economics Society, and a Columbia College Student-Alumni Ambassador. He is a graduate of the Aga Khan
          Academy in Mombasa, Kenya. </p>
          <p><b>Jessica Li</b>, Managing Editor—Journal </p>
          <img src="/Jessica.jpg" alt="Jessica"/>
          <p>Jessica Li is a senior (SEAS ‘23) majoring in applied math and minoring in economics. She currently
          serves as the Managing Editor of Journal for CER, and has previously served as the graphics editor for
          the Columbia Daily Spectator’s 145th Managing Board. Her hobbies include swimming, sending voice
          messages, and trying not to burn down her (very combustible) building while cooking. After graduation,
          Jessica will work as a research analyst at the Federal Reserve Bank of New York. </p>
          <p><b>Zac Narimanian</b>, Managing Editor—Online </p>
          <img src="/Zac.png" alt="Zac"/>
          <p>Zac Narimanian (CC ‘24) is a junior in Columbia College double majoring in Economics and Computer
          Science, originally from Wilmington, Delaware. He currently serves as Managing Editor of the CER Online
          Journal, and has previously served as a Deputy Executive Editor and Contributor for the publication.
          Outside of CER, he serves as an editor for the Columbia Undergraduate Law Review, senior equity analyst
          for Mongo Fund, and a legal researcher for the New York Small Claims Advisory Service. His interests in
          economics primarily lie at the intersection of public policy and sustainability. </p>
          <p><b>Amina Isayeva</b>, Managing Editor—Operations </p>
          <img src="/Amina.jpg" alt="Amina"/>
          <p>Amina Isayeva (CC ‘25) is a sophomore in Columbia College double majoring in Economics and Computer
          Science, originally from Baku, Azerbaijan. She currently serves as Head of Operations at CER. Outside of
          CER, she serves as Director of Consulting at Columbia Economics Society, Operational Committee Leader at
          Columbia Organization of Rising Entrepreneurs, Managing Board member at Consilience Sustainability
          Journal, and Business Development Intern at AvoMD. Her hobbies include swimming, learning new languages,
          trying out every salad combo at Milano Market, and going to escape rooms. </p>
        </div>
      </OuterDiv>
    </div>
  );
}
