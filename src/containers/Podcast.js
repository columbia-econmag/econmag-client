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

const Episode = styled.div`
  margin-bottom: 20px;
`;

export default function Podcast() {
  window.scroll({
    top: 0,
    left: 0,
    behavior: "auto",
  });

  const episodeUrls = [
      "7rVLgbrVdsTN5D8tTfMuwp",
      "6V4R7H8LN0zH2eBux5r5Qa",
      // Add more episode URLs as needed
  ];
  const episodeData = [
      {
          url: "7rVLgbrVdsTN5D8tTfMuwp",
          name: "Money, Money, Money: The Columbia Endowment Edition",
          description: "In this podcast episode, we delve into the world of university endowments, with a focus on " +
              "Columbia's massive endowment fund. We explore how the endowment is used to support the university's " +
              "operations and academic programs, and compare it to other Ivy League institutions. Additionally, we take" +
              " a closer look at the history of Columbia's endowment, how it has grown over time, and what investments " +
              "have contributed to its success."
      },
      {
          url: "6V4R7H8LN0zH2eBux5r5Qa",
          name: "Episode 1: Are we entering a recession?",
          description: "The impending recession has been all the buzz recently, but what exactly does this mean? " +
              "Anna, Zach, and Zane investigate the recent economic trends in fields that are important to Columbia " +
              "students: the labor market, the New York metro system, and the housing market."
      },
      // Add more episode data as needed
  ];

  return (
    <div className="Articles">
      <OuterDiv className="margins">
        <Header id="aboutBlurb" className="uglyJournal">
          Podcast
        </Header>
        <div className="uglyJournal">
              <p>
            <b>The official podcast for the Columbia Economics Review. Join us to investigate student-interest topics through an economic framework.</b>
             </p>
            <hr/>
        </div>

        <div className="uglyJournal">
            {episodeData.map((episode, index) => (
                <Episode key={index}>
                    <h3>{episode.name}</h3>
                    <p>{episode.description}</p>
                    <iframe
                        src={`https://open.spotify.com/embed/episode/${episode.url}`}
                        width="100%"
                        height="232"
                        frameBorder="0"
                        allowtransparency="true"
                        allow="encrypted-media"
                    ></iframe>
                </Episode>
            ))}
        </div>
      </OuterDiv>
    </div>
  );
}
