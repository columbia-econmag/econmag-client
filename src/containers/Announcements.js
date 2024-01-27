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
            <div className={`uglyJournal`}>
                <h3 className={`font-weight-bold text-xl-center`}>CER High School Essay Competition</h3>
                <p>
                    <ul>
                        <li><b>Prompt 1: Microeconomics</b>. Recently, the UK has considered implementing a ban
                            that would prevent anyone born after 2008 to ever buy products containing tobacco, modeled
                            after a similar ban in New Zealand. This is an example of governments making a choice for
                            consumers to curb the effects of
                            negative externalities. Examine the feasibility and effectiveness of implementing a similar
                            ban in the US by comparing and contrasting this strategy with another feasible alternative.

                        </li>
                        <li><b>Prompt 2: Macroeconomics</b>. Market research firm QuestionPro has estimated that
                            Taylor Swift's tour could
                            contribute $5 billion to the worldwide economy. Assuming that the tour has led to an
                            increase in short-run productivity, consider the possible economic
                            consequences of this "Swiftie fiscal policy" and evaluate the long-run effects of this tour.
                        </li>
                        <li>
                            <b>Prompt 3: Finance</b>. FTX Founder Sam Bankman-Fried has been convicted of seven counts
                            of fraud and conspiracy by a jury. Cryptocurrency no longer remains on the fringe of
                            financial theory with its growing relevance. Therefore, consider exploring the historical
                            context of cryptocurrency and the impact of major currencies like
                            Bitcoin and Ethereum as well as their benefits and risks in order to address
                            regulatory challenges governments face.
                        </li>
                        <li><b>Prompt 4: Create Your Own Prompt</b>. Feel free to write on any other topic in
                            the field of economics, and discuss how
                            your topic of interest connects to real life
                        </li>
                    </ul>
                    <h5 className={`text-decoration-underline font-weight-bold`}>Details</h5>
                    <p>

                        <b>Email questions to:</b> <a
                        href="mailto:columbiaeconreview1754@gmail.com">columbiaeconreview1754@gmail.com</a><br/>
                        <b>Submission via email</b> to <a
                        href="mailto:columbiaeconreview1754@gmail.com">columbiaeconreview1754@gmail.com</a><br/>
                        <b>Word count:</b> recommendation is <u>1500 words</u> (3 pages double spaced)<br/>
                        <b>Font:</b> Times New Roman, 12, standard margins<br/>
                        <b>Deadline:</b> February 16th, 11:59 EST
                    </p>
                </p>
            </div>

        </OuterDiv>
    </div>
  );
}
