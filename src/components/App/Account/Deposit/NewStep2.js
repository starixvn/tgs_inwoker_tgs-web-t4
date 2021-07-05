import React from "react";
import { Component } from "react";
import styled from "styled-components";
import i18n from "../../../../utils/i18n";
import CustomButton from "../../../Share/Button";
import { withSnackbar } from "notistack";
const Container = styled.div`
  font-size: 14px;
  color: #818181;
`;

const CustomTable = styled.table`
  width: 870px;
  margin: 20px auto;
  border: solid 1px #d9d9d9;
`;
const TitleTD = styled.td`
  width: 112px;
  height: 55px;
  background-color: #f7f7f7;
  padding-left: 15px;
  border: solid 1px #d9d9d9;
`;
const ValueTD = styled.td`
  width: 209px;
  height: 55px;
  background-color: #ffffff;
  padding-left: 15px;
  border: solid 1px #d9d9d9;
`;
const ButtonContainer = styled.div`
  margin: 0 auto;
  width: 530px;
`;
const CustomInput = styled.input`
  color: #000;
  font-size: 14px;
  text-align: right;
  margin: 12px 0 12px 10px;
  font-weight: 500;
  border: 0;

  padding: 0;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #c3c3c3;
  }
  &:disabled {
    background: #fff;
    -webkit-text-fill-color: #000;
    opacity: 1;
  }
`;

class NewStepTwo extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();

    this.state = {
      upload: "",
      uploaded: false,
      files: [],
    };

    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage = (e) => {
    this.setState({
      ...this.state,
      upload: e.target.files[0],
    });
  };
  handleFileChange = (e) => {
    var files = e.target.files;
    var fileName = e.target.value.toLowerCase();
    if (files.length > 0) {
      if (
        !fileName.endsWith(".jpg") &&
        !fileName.endsWith(".jpeg") &&
        !fileName.endsWith(".png") &&
        !fileName.endsWith(".tiff")
      ) {
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileType"), {
          variant: "error",
        });
        e.target.value = null;
        return false;
      }
      const fileSize = Math.round(files[0].size / 1024);
      if (fileSize > 2048) {
        this.props.enqueueSnackbar(i18n.t("deposit.msgInvalidFileSize"), {
          variant: "error",
        });
        e.target.value = null;
      } else {
        this.setState({ ...this.state, files: files });
      }
    }
  };
  handleUploadClick = () => {
    this.props.performUploadImage(this.state.files[0]);
  };
  render() {
    const {
      extended,
      depositResult,
      amount,
      performUploadImage,
      handleRestartClick,
    } = this.props;

    return (
      <Container>
        <CustomTable cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <TitleTD>{i18n.t("deposit.depositMethod")}</TitleTD>
              <ValueTD>{i18n.t(this.props.methodcode)}</ValueTD>
            </tr>
            <tr>
              <TitleTD>{i18n.t("deposit.depositTunnel")}</TitleTD>
              <ValueTD>{this.props.channelname}</ValueTD>
            </tr>
            <tr>
              <TitleTD>{i18n.t("deposit.receiverBank")}</TitleTD>
              <ValueTD>{extended.name}</ValueTD>
            </tr>
            <tr>
              <TitleTD>{i18n.t("deposit.receiverAccount")}</TitleTD>
              <ValueTD>{extended.bankAccount}</ValueTD>
            </tr>
            <tr>
              <TitleTD>{i18n.t("deposit.orderNumber")}</TitleTD>
              <ValueTD>{depositResult.data}</ValueTD>
            </tr>
            <tr>
              <TitleTD>{i18n.t("deposit.depositAmount")}</TitleTD>
              <ValueTD>{amount}</ValueTD>
            </tr>
            <tr>
              <TitleTD>{i18n.t("deposit.uploadReceipt")}</TitleTD>
              <ValueTD>
                <CustomInput
                  type="file"
                  accept="image/jpg, image/jpeg, image/png, image/tiff"
                  onChange={this.handleFileChange}
                ></CustomInput>
              </ValueTD>
            </tr>
            <tr></tr>
          </tbody>
        </CustomTable>
        <ButtonContainer>
          <CustomButton
            name={i18n.t("deposit.uploadReceipt")}
            width={257}
            marginTop={1}
            marginLeft={0}
            handleClick={() => this.handleUploadClick()}
            disabled={this.state.files.length <= 0}
          ></CustomButton>
          <CustomButton
            name={i18n.t("common.back")}
            width={257}
            marginTop={1}
            float="right"
            marginLeft={0}
            handleClick={() => this.props.handleRestartClick()}
            grayMode={true}
          ></CustomButton>
        </ButtonContainer>
      </Container>
    );
  }
}

export default withSnackbar(NewStepTwo);
