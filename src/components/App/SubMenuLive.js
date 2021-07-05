// import React from "react";
// import styled from "styled-components";
// import { GameTypeEnum, GameEnum } from "../../utils/Enum";
// import SubmenuLivePromoPNG from "../../assets/images/submenu-live-promo.png";
// // import SubmenuLiveAGPNG from "../../assets/images/submenu-live-ag.png";
// // import SubmenuLiveBBINPNG from "../../assets/images/submenu-live-dg.png";
// // import SubmenuLiveDGPNG from "../../assets/images/submenu-live-dg.png";
// // import SubmenuLiveMGPNG from "../../assets/images/submenu-live-mgv2.png";
// import SubmenuLiveGDPNG from "../../assets/images/submenu-live-gdv2.png";
// import Config from "../../config/config";
// import i18n from "../../utils/i18n";
// const MouseOverInner = styled.div`
//   width: 1410px;
//   height: 161px;
//   margin: 0 auto;
// `;
// const ImagePromo = styled.img`
//   width: 160px;
//   float: left;
//   margin-top: 12px;
// `;
// const GameFrame = styled.div`
//   width: 250px;
//   float: left;
//   height: 160px;
//   position: relative;
// `;
// const GameImg = styled.img`
//   float: right;
//   position: absolute;
//   padding-left: 30px;
//   padding-right: 30px;
//   transition: transform 0.6s;
//   bottom: 0;
//   transform-origin: bottom center;
//   &:hover {
//     cursor: pointer;
//     transform: scale(1.1);
//   }
// `;

// function SubMenuLive(props) {
//   return (
//     <MouseOverInner>
//       <ImagePromo src={SubmenuLivePromoPNG} alt=""></ImagePromo>
//       {props.games.map((item, index) => {
//         return (
//           <GameFrame key={index}>
//             <GameImg
//               src={`${process.env.PUBLIC_URL}/assets/images/pcHeaderMenu/live/${item.abbreviation.toLowerCase()}.png`}
//               alt=""
//               onClick={() =>
//                 props.onJoinGameClick(
//                   "/" +
//                     i18n.language +
//                     "/joingame/" +
//                     GameTypeEnum.LIVE +
//                     "/" +
//                     JSON.stringify(item.params)
//                 )
//               }
//             ></GameImg>
//           </GameFrame>
//         );
//       })}
//     </MouseOverInner>
//   );
// }

// export default SubMenuLive;
