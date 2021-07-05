// import React from "react";
// import styled from "styled-components";
// import { Link } from "react-router-dom";
// import SubmenuSlotPromoPNG from "../../assets/images/submenu-slot-promo.png";
// import SubmenuSlotMGPNG from "../../assets/images/submenu-slot-mg.png";
// import SubmenuSlotJDBPNG from "../../assets/images/submenu-slot-jdb.png";
// import SubmenuSlotBBINPNG from "../../assets/images/submenu-slot-bbin.png";
// import { SlotGameParentId } from "../../utils/Enum";
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
// function SubMenuSlot(props) {
//   return (
//     <MouseOverInner>
//       <ImagePromo src={SubmenuSlotPromoPNG} alt=""></ImagePromo>
//       <GameFrame>
//         <Atag
//           to={
//             "/" +
//             i18n.language +
//             "/slots/" +
//             props.type +
//             "/" +
//             SlotGameParentId.MG
//           }
//         >
//           <GameImg src={SubmenuSlotMGPNG} alt=""></GameImg>
//         </Atag>
//       </GameFrame>
//       <GameFrame>
//         <Atag
//           to={
//             "/" +
//             i18n.language +
//             "/slots/" +
//             props.type +
//             "/" +
//             SlotGameParentId.JDB
//           }
//         >
//           <GameImg src={SubmenuSlotJDBPNG} alt=""></GameImg>
//         </Atag>
//       </GameFrame>
//       <GameFrame>
//         <Atag
//           to={
//             "/" +
//             i18n.language +
//             "/slots/" +
//             props.type +
//             "/" +
//             SlotGameParentId.BBIN
//           }
//         >
//           <GameImg src={SubmenuSlotBBINPNG} alt=""></GameImg>
//         </Atag>
//       </GameFrame>
//     </MouseOverInner>
//   );
// }

// export default SubMenuSlot;
