import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { accountAction } from "@Inwoker/tgs-api";
import styled from "styled-components";
import { withStyles } from "@material-ui/core/styles";
import LoginBGPNG from "../../assets/images/login-bg.png";
import clsx from "clsx";

import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import UserIconPNG from "../../assets/images/user-icon.png";
import Password1IconPNG from "../../assets/images/password1-icon.png";
import Password2IconPNG from "../../assets/images/password2-icon.png";
import IconInboxSelectedPNG from "../../assets/images/icon-inbox-selected.png";

import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import BlowFishEncryption from "../../utils/BlowFishEncryption";
import { withSnackbar } from "notistack";

import IconLoginClosePNG from "../../assets/images/icon-login-close.png";
import i18n from "../../utils/i18n";
const Container = styled.div`
  width: 506px;
  background: url(${LoginBGPNG});
  background-attachment: fixed;
  background-position: center;
  display: table;
`;
const CloseIconContainer = styled.div`
  background: url(${IconLoginClosePNG}) no-repeat;
  width: 28px;
  height: 28px;
  float: right;
  margin: 10px 10px 0 0;
  &:hover {
    cursor: pointer;
  }
`;
const TitleContainer = styled.div`
  text-align: center;

  font-size: 42px;

  color: ${({ theme }) => theme.secondary};
`;
const SubTitleContainer = styled.div`
  text-align: center;

  font-size: 18px;

  color: ${({ theme }) => theme.secondary};
`;
const FormContainer = styled.div`
  margin: 10px 78px 0 78px;
  padding: 0 3px;
`;
const CustomText = withStyles({
  root: {
    width: "350px",
    height: "51px",
    borderRadius: "6px",
    border: "none",
    boxShadow: "0px 3px 8px -2px rgba(0,0,0,0.75)",
    margin: 0,
    marginTop: "13px",
    background: "white",

    "& .MuiOutlinedInput-input": {
      fontSize: "14px",
    },
    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "none",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.Mui-focused fieldset": {
        border: "none",
      },
    },
  },
})(TextField);

const ButtonLogin = styled.div`
  margin-top: 24px;
  margin-bottom: 35px;
  color: #fff;
  font-size: 20px;
  width: 350px;
  height: 51px;
  border-radius: 6px;

  border: solid 1px #ffffff;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );

  &:hover {
    cursor: pointer;

    box-shadow: inset 1px 1px 9px 0 rgba(255, 255, 255, 0.75);
  }
`;
const ButtonLoginLabel = styled.span`
  text-align: center;
  display: block;
  margin-top: 10px;
`;

const DescriptionContainer = styled.div`
  padding: 12px 0 0 8px;
`;
const Description = styled.div`
  float: left;
  width: 310px;
  margin-left: 5px;
  font-size: 14px;

  line-height: 1.43;

  color: ${({ theme }) => theme.secondary};
`;

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: "2px",
    border: "solid #404040 1px",
  },
  formControl: {
    width: "78px",
    height: "46px",
    marginTop: "14px",
    marginRight: "10px",

    broder: "solid 2px #000",

    "& label.Mui-focused": {
      color: "#b6b6b6",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#b6b6b6",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&:hover fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#b6b6b6",
        marginTop: "1px",
      },
    },
  },
  input: {
    fontSize: "14px",
  },
  checkboxRoot: {
    padding: "0",
    margin: "0",
    float: "left",
    "& .MuiIconButton-label": {
      borderRadius: "6px",
      border: "solid 1px #000",
    },
  },
  icon: {
    width: 20,
    height: 20,

    borderRadius: "5px",
    backgroundColor: "#fff",
    "$root.Mui-focusVisible &": {},
    "input:hover ~ &": {},
    "input:disabled ~ &": {},
  },
  checkedIcon: {
    backgroundImage: "url(" + IconInboxSelectedPNG + ")",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundColor: "#fff",
    borderRadius: "5px",
    "&:before": {
      display: "block",
      width: 20,
      height: 20,
      backgroundImage: "url(" + IconInboxSelectedPNG + ")",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      borderRadius: "5px",
      content: '""',
    },
    "input:hover ~ &": {},
  },
}));

function Register(props) {
  const [username, setUsername] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [password2, setPassword2] = React.useState("");

  const [withPromo, setWithPromo] = React.useState(
    localStorage.getItem("promotionId") === "" ? false : true
  );
  const [promotionId, setPromotionId] = React.useState(
    localStorage.getItem("promotionId")
  );

  const [tnc, setTnc] = React.useState(true);
  const handleRegisterClick = async () => {
    var expr = /^[a-zA-Z0-9]{6,32}$/;
    if (!expr.test(username)) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterUserNameInvalid"), {
        variant: "warning",
      });
      return;
    }
    var expr = /^.{6,20}$/;
    if (!expr.test(password)) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassInvalid"), {
        variant: "warning",
      });
      return;
    }
    if (password !== password2) {
      props.enqueueSnackbar(i18n.t("common.msgRegisterPassMatchInvalid"), {
        variant: "warning",
      });
      return;
    }

    if (tnc) {
      // user_account,
      // user_password,
      // pay_password,
      // mobile,
      // recommend_code,
      // mobile_code_id
      props
        .register(
          username,
          password,
          password2,

          promotionId
        )
        .then(async (response) => {
          if (response.IsSuccess && response.data.isnew === false) {
            props.enqueueSnackbar(i18n.t("common.msgAlreadyExist"), {
              variant: "warning",
            });
          } else if (response.IsSuccess) {
            let urlParams = new URLSearchParams(props.location.search);
            if (urlParams.has("return_url")) {
              const returnValue = urlParams.get("return_url");
              if (returnValue) {
                window.location.href =
                  returnValue +
                  "?token=" +
                  BlowFishEncryption.Encrypt(response.data);
              }
            }
            props.doLogin(username, password);
            // await props.getAccountInfo(response.data);
            // await props.getAccountProfile(response.data);
            props.history.push(
              "/" + i18n.language + "/registersuccess/" + username
            );
          } else {
            if (response.code === 206) {
              props.enqueueSnackbar(i18n.t("common.msgInvalidInvitationCode"), {
                variant: "warning",
              });
            } else {
              props.enqueueSnackbar(response.info, {
                variant: "warning",
              });
            }
          }
        });
    } else {
      props.enqueueSnackbar(i18n.t("common.msgRegisterTermAndCondition"), {
        variant: "warning",
      });
      return;
    }
  };
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePassword2Change = (e) => {
    setPassword2(e.target.value);
  };
  const handlePromoChange = (e) => {
    setPromotionId(e.target.value);
  };
  const handleTncClick = (e) => {
    setTnc(!tnc);
  };
  const classes = useStyles();
  return (
    <Container>
      <CloseIconContainer
        viewBox="4 4 16 16"
        onClick={props.onhandleClose}
      ></CloseIconContainer>
      <div className="clear"></div>
      <TitleContainer>{i18n.t("web.register.registerTitle")}</TitleContainer>
      <SubTitleContainer>
        {i18n.t("web.register.registerTitleLine2")}
      </SubTitleContainer>
      <FormContainer>
        <CustomText
          onChange={handleUsernameChange}
          id="username"
          value={username}
          placeholder={i18n.t("web.register.username")}
          variant="outlined"
          autoComplete="off"
          inputProps={{
            maxLength: 32,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                style={{ height: "24px", width: "30px" }}
              >
                <img src={UserIconPNG} alt=""></img>
              </InputAdornment>
            ),
          }}
        />

        <CustomText
          onChange={handlePasswordChange}
          id="password"
          value={password}
          placeholder={i18n.t("web.register.password")}
          variant="outlined"
          type="password"
          autoComplete="off"
          inputProps={{
            maxLength: 20,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                style={{ height: "26px", width: "30px" }}
              >
                <img src={Password1IconPNG} alt=""></img>
              </InputAdornment>
            ),
          }}
        />
        <CustomText
          onChange={handlePassword2Change}
          id="password2"
          value={password2}
          placeholder={i18n.t("web.register.confirmPassword")}
          variant="outlined"
          type="password"
          autoComplete="off"
          inputProps={{
            maxLength: 20,
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                style={{ height: "30px", width: "32px" }}
              >
                <img src={Password2IconPNG} alt=""></img>
              </InputAdornment>
            ),
          }}
        />

        <CustomText
          onChange={handlePromoChange}
          value={promotionId}
          id="code"
          placeholder={i18n.t("web.register.promoteCode")}
          variant="outlined"
          inputProps={{ disabled: withPromo ? true : false }}
        />
        <DescriptionContainer>
          <Checkbox
            checked={tnc}
            className={classes.checkboxRoot}
            onClick={handleTncClick}
            checkedIcon={
              <span className={clsx(classes.icon, classes.checkedIcon)} />
            }
            icon={<span className={classes.icon} />}
          />
          <Description>{i18n.t("web.register.contract")}</Description>
        </DescriptionContainer>

        <ButtonLogin onClick={handleRegisterClick}>
          <ButtonLoginLabel>{i18n.t("web.register.btn")}</ButtonLoginLabel>
        </ButtonLogin>
      </FormContainer>
    </Container>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    dispatchFunction: (json) => dispatch(json),
    getAccountInfo: (token) => dispatch(accountAction.getAccountInfo(token)),
    getAccountProfile: (token) =>
      dispatch(accountAction.getAccountProfile(token, true)),
    register: (username, pwd, confirmpwd, invitationcode) =>
      dispatch(
        accountAction.registerAccount(username, pwd, confirmpwd, invitationcode)
      ),
  };
};
export default withRouter(
  connect(null, mapDispatchToProps)(withSnackbar(Register))
);
