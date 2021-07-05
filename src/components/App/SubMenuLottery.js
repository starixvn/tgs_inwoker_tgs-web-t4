// import React from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import SubmenuLotteryPromoPNG from "../../assets/images/submenu-lottery-promo.png";
// import SubmenuLottery1PNG from "../../assets/images/submenu-lottery-1-new.png";
// import SubmenuLottery2PNG from "../../assets/images/submenu-lottery-2-new.png";
// import SubmenuLottery3PNG from "../../assets/images/submenu-lottery-3-new.png";
// import SubmenuLottery4PNG from "../../assets/images/submenu-lottery-4-new.png";
// import SubmenuLottery5PNG from "../../assets/images/submenu-lottery-5-new.png";
// // import _633 from "../../assets/images/lottery/submenu/633.png";
// // import IG from "../../assets/images/lottery/submenu/ig.png";
// // import QQ from "../../assets/images/lottery/submenu/qq.png";
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
// `;
// const GameFrame = styled.div`
//   width: auto;
//   float: left;
//   position: relative;
//   &:hover {
//   }
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

// const LotteryName = styled.div`
//   position: absolute;
//   width: 100%;
//   text-align: center;
//   color: white;
//   bottom: 10px;
// `;
// const Atag = styled(Link)``;
// function SubMenuLottery(props) {
//   return (
//     <MouseOverInner>
//       <ImagePromo src={SubmenuLotteryPromoPNG} alt=""></ImagePromo>
//       {props.games.map((item, index) => {
//         return (
//           <GameFrame key={index}>
//             <Atag
//               to={
//                 "/" +
//                 i18n.language +
//                 "/lottery/play/" +
//                 JSON.stringify(item.params)
//               }
//             >
//               <GameImg
//                 src={`${process.env.PUBLIC_URL}/assets/images/pcHeaderMenu/lottery/${item.abbreviation.toLowerCase()}.png`}
//                 alt=""
//               ></GameImg>
//             </Atag>
//           </GameFrame>
//         );
//       })}

//       {
//         //    <GameFrame>
//         //    <Atag to={"/" + i18n.language + "/lottery/play/ig"}>
//         //      <GameImg
//         //        src={
//         //          IG
//         //          //Config.sourceUrl + "/static/image/submenu-lottery-ig.png"
//         //        }
//         //        alt=""
//         //      ></GameImg>
//         //    </Atag>
//         //  </GameFrame>
//         //
//         //  <GameFrame>
//         //    <Atag to={"/" + i18n.language + "/lottery/play/qq"}>
//         //      <GameImg
//         //        src={
//         //          QQ
//         //          //Config.sourceUrl + "/static/image/submenu-lottery-qq.png"
//         //        }
//         //        alt=""
//         //      ></GameImg>
//         //    </Atag>
//         //  </GameFrame>
//       }
//     </MouseOverInner>
//   );
// }

// export default SubMenuLottery;
