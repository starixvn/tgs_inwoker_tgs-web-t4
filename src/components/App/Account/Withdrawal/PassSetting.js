// import React from "react";
// import { connect } from "react-redux";
// import styled from "styled-components";
// import TextField from "../../../Share/TextField";
// import Button from "../../../Share/Button";
// const Container = styled.div`
//   width: 100%;
// `;
// const SubTitle = styled.div`
//   font-size: 22px;
//   font-weight: bold;
//   text-align: center;
//   color: #16242a;
//   margin-top: 40px;
// `;
// const SubTitleDesc = styled.div`
//   text-align: center;
//   font-size: 14px;
//   margin-top: 10px;
//   margin-bottom: 40px;
//   color: #818181;
// `;
// const TextFieldLabel = styled.div`
//   font-size: 16px;
//   text-align: center;

//   color: #818181;
//   margin: 10px 0 0 0;
// `;
// const TextFieldContainer = styled.div`
//   margin: 0 auto;
//   display: table;
// `;
// let local_props = {
//   password1: "",
//   password2: ""
// };
// const onhandlePassword1Change = e => {
//   local_props.password1 = e.target.value;
// };
// const onhandlePassword2Change = e => {
//   local_props.password2 = e.target.value;
// };
// function PassSetting(props) {
//   return (
//     <Container>
//       <SubTitle>提款密码设置</SubTitle>
//       <SubTitleDesc> {""}</SubTitleDesc>
//       <TextFieldLabel>提款密码</TextFieldLabel>
//       <TextFieldContainer>
//         <TextField
//           marginTop={10}
//           placeholder={"请输入提款密码，由8-20码数字和字母所组成"}
//           width={395}
//           height={38}
//           float={"none"}
//           value={props.name}
//           handleTextFieldChange={onhandlePassword1Change}
//           type={"password"}
//         ></TextField>
//       </TextFieldContainer>
//       <TextFieldLabel>确认提款密码</TextFieldLabel>
//       <TextFieldContainer>
//         <TextField
//           marginTop={10}
//           placeholder={"请再次输入提款密码"}
//           width={395}
//           height={38}
//           float={"none"}
//           value={props.name}
//           type={"password"}
//           handleTextFieldChange={onhandlePassword2Change}
//         ></TextField>
//       </TextFieldContainer>
//       <TextFieldContainer>
//         <Button
//           name="下一步"
//           width={255}
//           handleClick={() =>
//             props.onhandleNextClick(
//               local_props.password1,
//               local_props.password2
//             )
//           }
//         ></Button>
//       </TextFieldContainer>
//     </Container>
//   );
// }

// export default connect(null, null)(PassSetting);
