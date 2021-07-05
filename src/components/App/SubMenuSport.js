// import React from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import SubmenuSportPromoPNG from "../../assets/images/submenu-sport-promo.png";
// // import SubmenuSport633PNG from "../../assets/images/submenu-sport-633.png";
// // import SubmenuSportSabahPNG from "../../assets/images/submenu-sport-sabah.png";
// // import SubmenuSportPinnaclePNG from "../../assets/images/submenu-sport-pinnacle.png";
// import Config from "../../config/config";
// import { GameEnum } from "../../utils/Enum";
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
// `;
// const GameFrame = styled.div`
//   width: auto;
//   float: left;
// `;
// const GameImg = styled.img`
//   float: right;
//   padding-left: 50px;
//   padding-right: 50px;
//   transition: transform 0.6s;

//   &:hover {
//     cursor: pointer;
//     transform: scale(1.1);
//   }
// `;
// const Atag = styled(Link)``;
// function SubMenuSport(props) {
//   return (
//     <MouseOverInner>
//       <ImagePromo src={SubmenuSportPromoPNG} alt=""></ImagePromo>
//       {props.games.map((item, index) => {
//         return (
//           <GameFrame key={index}>
//             <Atag
//               to={
//                 "/" +
//                 i18n.language +
//                 "/sports/play/" +
//                 JSON.stringify(item.params)
//               }
//             >
//               <GameImg
//                 src={`${process.env.PUBLIC_URL}/assets/images/pcHeaderMenu/sports/${item.abbreviation.toLowerCase()}.png`}
//                 alt=""
//               ></GameImg>
//             </Atag>
//           </GameFrame>
//         );
//       })}
//     </MouseOverInner>
//   );
// }

// export default SubMenuSport;
