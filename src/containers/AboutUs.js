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
        <Header>2023–2024 Managing Board</Header>
        <div className="uglyJournal">
          <p><b>Zac Narimanian</b>, Editor-In-Chief </p>
          <img src="/Zac.png" alt="Zac Narimanian" width="200px"/>
          <p>Zac Narimanian (CC ‘24) is a rising senior in Columbia College double majoring in Economics and Computer Science,
            originally from Wilmington, Delaware. He currently serves as the Chief Executive Editor, and has previously
            served as Managing Editor, Deputy Executive Editor, and Contributor for the Online Journal. Outside of CER,
            he serves as an editor for the Columbia Undergraduate Law Review, senior equity analyst for Mongo Fund,
            and a legal researcher for the New York Small Claims Advisory Service. His interests in economics primarily
            lie at the intersection of public policy and sustainability.
          </p>


          <p><b>Alex Zhang</b>, President </p>
          <img src="/alex-zhang.png" alt="Alex Zhang" width="200px"/>
          <p>Alex Zhang (GS ’24) is a rising senior from the Columbia-Sciences Po Dual BA Program majoring in
            Economics-Mathematics, originally from Guangzhou, China and Cupertino, California. He is currently the
            President of Columbia Economic Review, and has previously served as Deputy Editor. Outside of CER, he is an
            economic analyst intern at the United Nations, a research assistant at Columbia’s Economics Department, and
            has served as the Vice President of Vanguard Think Tank for Trans-Pacific Relations. His research interests
            include international trade, international monetary and political economics, as well as economic growth and
            development.
          </p>

          <p><b>Rizwan Kazi</b>, Managing Editor—Journal </p>
          <img src="/rizwan-kazi.png" alt="Rizwan Kazi" width="200px"/>
          <p>Rizwan Kazi (CC ‘24) is a rising senior double majoring in Mathematics and Economics, born and raised in
            the Bronx, New York. Having served as Deputy Editor, he is currently the Managing Editor for the Journal
            division. Outside of CER, he has worked as a research assistant at Columbia’s Economics Department, Yale’s
            Research Initiative on Scale and Innovation, and the University of Chicago’s Energy & Environment Lab.
            His research interests include probability theory, dynamical systems theory, game theory, and economic
            growth and development.
          </p>

          <p><b>Sam Barnett</b>, Managing Editor—Online </p>
          <img src="/sam-barnett.png" alt="Sam Barnett" width="200px"/>
          <p>Sam Barnett (CC ’24) is originally from Seattle. An Economics-Mathematics major, he is currently the
            Managing Editor for the Online division. Previously, he served as Deputy Executive Editor. Outside of CER,
            he has worked as a reporter for the Puget Sound Business Journal through the Dow Jones News Fund and as a
            research assistant at Harvard Business School. His research interests include wealth and income inequality,
            education, behavioral economics, and market design.
          </p>

          <p><b>Anna Bezhanishvili</b>, Chief of Programming </p>
          <img src="/anna-bezhanishvili.png" alt="Anna Bezhanishvili" width="200px"/>
          <p>Anna Bezhanishvili (BC '25) is a rising junior majoring in Economics with a minor in Psychology. Born and
            raised in Baltimore, Maryland, she is originally from Tbilisi, Georgia. She currently serves as the Chief
            of Programming, and previously started as a podcaster in its launch. Outside of CER, she serves as the
            Director-General of CMUNNY, a intercollegiate MUN conference hosted by CIRCA, and works at Amity Hall! Her
            research interests are mainly within applied micro theory and behavioral economics, as she focuses on
            consumer decision making.
          </p>

          <p><b>Emma Liu</b>, Director of Technology, Podcast Director </p>
          <img src="/emma-liu.png" alt="Emma Liu" width="200px"/>
          <p>Emma Liu (CC ‘25) attended high school at an international school in Beijing. At the College, she is
            majoring in Economics-Math and concentrating in Physics. She has contributed to CER as a staff writer and
            podcast producer in previous semesters. Outside of the journal, she is also VP initiatives in CWAVE and an
            avid baker 🍞
          </p>
        </div>
      </OuterDiv>
    </div>
  );
}
