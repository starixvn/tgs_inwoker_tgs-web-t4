// import React, { Component } from "react";
// import styled from "styled-components";
// import TextField from "@material-ui/core/TextField";
// import CustomButton from "../../Share/Button";
// import { withStyles } from "@material-ui/core/styles";
// import FormControl from "@material-ui/core/FormControl";
// import Select from "@material-ui/core/Select";

// const Container = styled.div`
//   width: 360px;
// `;
// const Desc = styled.div`
//   text-align: center;

//   height: 40px;

//   font-size: 14px;
//   margin-top: 22px;
//   color: #16242a;
// `;
// const CustomFormControl = withStyles((theme) => ({
//   root: {
//     width: "350px",
//     height: "46px",

//     marginRight: "5px",
//     float: "left",
//     marginTop: "10px",
//     padding: 0,
//     "& label.Mui-focused": {
//       color: "#b6b6b6",
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "#b6b6b6",
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "#b6b6b6",
//         marginTop: "1px",
//       },
//       "&:hover fieldset": {
//         borderColor: "#b6b6b6",
//         marginTop: "1px",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#b6b6b6",
//         marginTop: "1px",
//       },
//     },
//   },
// }))(FormControl);
// const CustomSelect = withStyles((theme) => ({
//   root: {
//     fontSize: "14px",
//     background: "white",

//     color: "#818181",
//     "&:focus": {
//       background: "white",
//     },
//   },
// }))(Select);
// const CustomText = withStyles({
//   root: {
//     marginTop: "10px",
//     background: "white",
//     float: "left",
//     "& .MuiOutlinedInput-input": {
//       fontSize: "14px",
//     },
//     "& .MuiOutlinedInput-input[readonly]": {
//       backgroundColor: "transparent",
//       color: "#b6b6b6",
//     },
//     "& label.Mui-focused": {
//       color: "#b6b6b6",
//     },
//     "& .MuiInput-underline:after": {
//       borderBottomColor: "#b6b6b6",
//     },
//     "& .MuiOutlinedInput-root": {
//       "& fieldset": {
//         borderColor: "#b6b6b6",
//       },
//       "&:hover fieldset": {
//         borderColor: "#b6b6b6",
//       },
//       "&.Mui-focused fieldset": {
//         borderColor: "#b6b6b6",
//       },
//     },
//   },
// })(TextField);
// class CSGuest extends Component {
//   state = {
//     name: "",
//     selected: "存款事宜",
//   };
//   handleClick = () => {
//     this.props.onhandleSubmit(this.state.name, this.state.selected);
//   };
//   render() {
//     return (
//       <Container>
//         <Desc>
//           亲爱的访客您好，欢迎咨询WG永高在线客服，
//           <br />
//           请选择您要咨询的内容：
//         </Desc>
//         <CustomText
//           style={{
//             width: "350px",
//             height: "46px",
//           }}
//           onChange={(e) =>
//             this.setState({ ...this.state, name: e.target.value })
//           }
//           value={this.state.name}
//           placeholder={"请输入您的访客名"}
//           variant="outlined"
//           autoComplete="off"
//           type={"text"}
//           inputProps={{
//             maxLength: 30,
//           }}
//         />
//         <CustomFormControl>
//           <CustomSelect
//             variant="outlined"
//             value={this.state.selected}
//             displayEmpty
//             onChange={(e) =>
//               this.setState({ ...this.state, selected: e.target.value })
//             }
//             native
//           >
//             <option value="存款事宜">存款事宜</option>
//             <option value="提款事宜">提款事宜</option>
//             <option value="账户问题">账户问题</option>
//             <option value="网站登录异常">网站登录异常</option>
//             <option value="红利优惠">红利优惠</option>
//             <option value="结算查询">结算查询</option>
//             <option value="代理业务">代理业务</option>
//             <option value="投诉与建议">投诉与建议</option>
//             <option value="开户谘询">开户谘询</option>
//           </CustomSelect>
//         </CustomFormControl>
//         <CustomButton
//           name="开始交谈"
//           handleClick={this.handleClick}
//         ></CustomButton>
//       </Container>
//     );
//   }
// }

// export default CSGuest;
