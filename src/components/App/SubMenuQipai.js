// import React from "react";
// import styled from "styled-components";

// import SubmenuQipaiPromoPNG from "../../assets/images/submenu-qipai-promo.png";
// // import SubmenuQipaiKYPNG from "../../assets/images/submenu-qipai-kyv3.png";
// // import SubmenuQipaiAPPNG from "../../assets/images/submenu-qipai-apv3.png";
// // import SubmenuQipaiASPNG from "../../assets/images/submenu-qipai-asv3.png";
// // import SubmenuQipai633PNG from "../../assets/images/submenu-qipai-633v3.png";
// // import SubmenuQipaiLegPNG from "../../assets/images/submenu-qipai-legv3.png";
// import { GameTypeEnum, GameEnum } from "../../utils/Enum";
// import Config from "../../config/config";
// import i18n from "../../utils/i18n";
// const MouseOverInner = styled.div`
//   width: 1280px;
//   height: 161px;
//   margin: 0 auto;
// `;
// const ImagePromo = styled.img`
//   width: 160px;
//   float: left;
//   margin-top: 12px;
//   margin-right: 40px;
// `;
// const GameFrame = styled.div`
//   width: 200px;
//   float: left;
//   height: 160px;
//   position: relative;
// `;
// const GameImg = styled.img`
//   float: right;
//   position: absolute;

//   transition: transform 0.6s;
//   bottom: 0;
//   transform-origin: bottom center;
//   &:hover {
//     cursor: pointer;
//     transform: scale(1.1);
//   }
// `;

// function SubMenuQipai(props) {
//   return (
//     <MouseOverInner>
//       <ImagePromo src={SubmenuQipaiPromoPNG} alt=""></ImagePromo>
//       {props.games.map((item, index) => {
//         return (
//           <GameFrame key={index}>
//             <GameImg
//               src={`${process.env.PUBLIC_URL}/assets/images/pcHeaderMenu/qipai/${item.abbreviation.toLowerCase()}.png`}
//               alt=""
//               onClick={() =>
//                 props.onJoinGameClick(
//                   "/" +
//                     i18n.language +
//                     "/joingame/" +
//                     GameTypeEnum.QIPAI +
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

// export default SubMenuQipai;
