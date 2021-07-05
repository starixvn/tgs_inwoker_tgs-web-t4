import React, { useEffect, useState } from "react";

import styled from "styled-components";
import i18n from "../../../utils/i18n";
import { UiService } from "@Inwoker/tgs-api";
const AnnounceContainer = styled.div`
  width: 1280px;
  height: 38px;
  margin: 0 auto;
`;
const AnnounceText = styled.div`
  float: left;

  color: #fde73f;
  font-size: 14px;
  margin-top: 9px;
  margin-left: 160px;
`;
const MarqueeContainer = styled.div`
  width: 890px;
  white-space: nowrap;

  font-size: 14px;
  color: #ffffff;
  float: left;
  line-hight: 26px;
`;

function Marquee(props) {
  const [loaded, setLoaded] = useState(false);

  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    setLoaded(true);
  });

  useEffect(() => {
    if (loaded) {
      UiService.GetMarquee().then((result) => {
        setAnnouncement(result.data);
      });
    }
  }, [loaded]);

  useEffect(() => {});

  return (
    <AnnounceContainer>
      <AnnounceText>{i18n.t("web.marquee.latestNews")}</AnnounceText>
      <MarqueeContainer>
        <marquee style={{ marginTop: "10px" }}>
          {announcement
            ? announcement.map((row, index) => {
                return (
                  <div
                    key={index}
                    style={{
                      display: "inline",
                      whiteSpace: "nowrap",
                      wordBreak: "keep-all",
                      overflow: "visible",
                    }}
                  >
                    {row.content}
                  </div>
                );
              })
            : ""}
        </marquee>
      </MarqueeContainer>
    </AnnounceContainer>
  );
}
export default Marquee;
