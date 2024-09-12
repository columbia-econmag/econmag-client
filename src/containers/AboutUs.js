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
            <a href="mailto:columbiaeconreview1754@gmail.com">columbiaeconreview1754@gmail.com</a>{" "}
            or reach out via our Facebook or Instagram pages. </p>

          <a href="https://www.facebook.com/ColumbiaEconomicsReview">
            <FB />
          </a>
          <a href="https://www.instagram.com/columbiaeconomicreview?igsh=NGN4eTIzOTFqMG00">
            <Insta />
          </a>
        </div>
        <Header>Join Us</Header>
        <a id="joinUs"></a>

        <div className="uglyJournal">
          
          <p>
            Columbia Economic Review has concluded recruiting for the Fall 2023 application
            cycle. Check back for more updates regarding Spring 2024 recruitment.
          </p>
          <p>
            We require all potential staff members to be current undergraduate
            students at Columbia University. Students who are interested in CER
            are recommended to attend our events through the year and follow our
            social media accounts to learn more about recruitment each semester.
          </p>
        </div>

        <a id="managingBoard"></a>
        <Header>2024–2025 Managing Board</Header>
        <div className="uglyJournal">
          <p><b>Alex Zhang</b>, Editor-In-Chief </p>
          <img src="/alex-zhang.png" alt="Alex" width="200px"/>
          <p>Alex H. Zhang (GS ’25) is a rising senior from the Columbia-Sciences Po
            Dual BA Program majoring in Economics-Mathematics, originally from Guangzhou, China and
            Cupertino, California. He is currently the Editor-in-Chief of Columbia Economic Review,
            and has previously served as Deputy Editor and President. Outside of CER, he is a research
            assistant at Columbia’s Economics Department, and has served as an economic analyst intern
            at the United Nations and as the Vice President of Vanguard Think Tank for Trans-Pacific Relations.
            His research interests include behavioral macroeconomics, international political economics
            and monetary economics.
          </p>


          <p><b>Anna Bezhanishvili</b>, Co-President </p>
          <img src="/anna.png" alt="Anna Bezhanishvili" width="200px"/>
          <p>Anna Bezhanishvili (Bez) is a rising senior at Barnard College studying Economics,
            with minors in Psychology and Mathematics. She is originally from The Republic of
            Georgia, but grew up in Baltimore Maryland (go Ravens). She is currently the
            Co-President and has previously served as the Chief of Programming and a podcast
            producer. Outside of CER, Anna is a research assistant at Columbia Business School,
            SIPA, and Columbia University Economics Department. Her research interests include
            applied microeconomic theory, behavioral economics, labor, and development.
          </p>

          <p><b>Emma Liu</b>, Co-President </p>
          <img src="/emma.png" alt="Emma Liu" width="200px"/>
          <p>Emma Liu is studying Economics-Math and concentrating in Physics.
            She attended high school in Beijing. She has served a number of roles
            throughout her time in CER beginning in freshman year, including Staff Writer,
            Podcast Producer, and Director of Technology.
          </p>

          <p><b>Devon Hunter</b>, Managing Editor—Online </p>
          <img src="/devon.png" alt="Devon Hunter" width="200px"/>
          <p>Devon is a senior studying economics and American studies, and is currently
            serving as Managing Editor of the Journal. He has also previously been a deputy
            editor in the division. He intends to pursue a career in law, and is researching
            decision-making in small-scale voting for his thesis. Outside of CER, he is
            also involved in the Columbia Undergraduate Law Review, where he serves as the
            Executive Editor of the Online division.
          </p>

          <p><b>Zaheer Abbas</b>, Managing Editor – Journal </p>
          <img src="/zaheer.png" alt="Zaheer Abbas" width="200px"/>
          <p>Zaheer Abbas (GS ‘25) is a senior from the Columbia-SciencesPo Dual BA, majoring
            in Economics. He was born and raised in Dhaka, Bangladesh. He is currently
            Managing Editor for the Online division. Beyond CER, he has been a part of
            e-boards for Columbia Economics Society, as well as Club Bangla. He works for
            Youth Policy Forum, a policy organization back in Bangladesh, and has worked
            as a research assistant for Columbia Business School. His research interests
            include economic development, macroeconomics, and public policy.
          </p>
        </div>
      </OuterDiv>
    </div>
  );
}
