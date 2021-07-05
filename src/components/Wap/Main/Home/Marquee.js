import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { UiService } from "@Inwoker/tgs-api";
import i18n from "../../../../utils/i18n";
const AnnounceContainer = styled.div`
  width: 1280px;
  height: 38px;
  margin: 0 auto;
`;

const MarqueeContainer = styled.div`
  width: 890px;
  white-space: nowrap;

  font-size: 18px;
  color: #ffffff;
  float: left;
  line-hight: 26px;
`;

function Marquee(props) {
  const [loaded, setLoaded] = useState(false);

  const [announcement, setAnnouncement] = useState([]);

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
      <MarqueeContainer>
        <marquee style={{ marginTop: "5px" }}>
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
