import { Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import i18n from "../../utils/i18n";
import QRCode from "qrcode.react";
import MaintenancePNG from "../../assets/images/maintenance-blank.png";
import { Dialog } from "@material-ui/core";
const Container = styled.div`
  width: 100%;
  background: url(${MaintenancePNG}) no-repeat center;
  background-size: cover;
  position: relative;
  height: calc(100vh - 45px);
`;

const MaintenanceTextContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 25%;
`;

const Text = styled.div`
  color: white;
  font-size: 30px;
  text-align: center;
  padding: 20px 0px;
`;

const Hyperlink = styled.span`
  :focus,
  :active {
    text-decoration: underline;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const Button = styled.div`
  color: white;
  font-size: 30px;
  background: #ff8e39;
  color: #fff;
  padding: 10px;
  border-radius: 4px;
  min-width: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;
  cursor: pointer;
`;

const AnotherButton = styled(Button)`
  color: #ff8e39;
  background: none;
  border: solid 1px #ff8e39;
`;

const CustomModal = styled(Dialog)`
  .MuiBackdrop-root {
    background: transparent;
  }

  .MuiDialog-paper {
    min-width: 900px;

    border-radius: 16px;
    background: #f6f8f7;
    min-height: 200px;
  }
`;

const DialogTitle = styled.div`
  background: #f6f8f7;
  min-height: 50px;
  display: flex;
  align-items: center;
  padding: 0px 30px;
  font-size: 20px;
  font-weight: bold;
  justify-content: space-between;
`;

const DialogTitle2 = styled(DialogTitle)`
  background: ${({ theme }) => theme.primary};
  color: white;
`;

const CloseButton = styled.div`
  cursor: pointer;
  position: absolute;
  right: 30px;
`;

const Icons = styled.img`
  margin-bottom: 10px;
`;

const QRCodeContainer = styled.div`
  min-height: 300px;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
  padding: 30px;
`;

const QRCodeHolder = styled.div`
  display: flex;
  padding: 20px;
`;

const QRCodeTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0px 20px;
  align-items: center;
`;

const QRCodeText = styled.div`
  padding: 5px 0px;
  font-weight: bold;
  font-size: 20px;
`;

const Maintenance = (props) => {
  const [open, setOpen] = useState(false);
  const [imList, setIMList] = useState([]);

  useEffect(() => {
    props.brandComm().then((e) => {
      if (e.IsSuccess) {
        setIMList(e.data);
      }
    });
  }, []);

  function copyText(text) {
    navigator.clipboard.writeText(text);
  }
  return (
    <Container>
      <MaintenanceTextContainer>
        <Text>我们现正维护中，请稍后再试。 </Text>
        <Text>
          如您有任何问题，请
          <Hyperlink>联系客服</Hyperlink>。
        </Text>
        <Text>We are currently under maintenance, please try again later.</Text>
        <Text>
          If you have any questions, please contact our{" "}
          <Hyperlink>customer service</Hyperlink>.
        </Text>
        <ButtonContainer>
          <AnotherButton onClick={props.onhandleCSClick}>
            {i18n.t("support.online")}
          </AnotherButton>
          <Button
            onClick={() => {
              setOpen(true);
            }}
          >
            {i18n.t("panel.im")}
          </Button>
        </ButtonContainer>

        <CustomModal open={open}>
          <DialogTitle2>
            <div>{i18n.t("panel.imLong")}</div>
            <CloseButton
              onClick={() => {
                setOpen(false);
              }}
            >
              ✖
            </CloseButton>
          </DialogTitle2>
          <QRCodeContainer>
            {imList.map((data, index) => {
              return (
                <QRCodeHolder
                  onClick={() => {
                    copyText(data.appid ? data.appid : data.phone);
                    props.alert(i18n.t("affiliate.copied"), {
                      variant: "success",
                    });
                  }}
                >
                  {data.qrcodeurl ? (
                    <QRCodeTextContainer>
                      <QRCode value={data.qrcodeurl} bgColor={"#f6f8f7"} />
                      <QRCodeText>{data.type}</QRCodeText>
                    </QRCodeTextContainer>
                  ) : (
                    <QRCodeTextContainer>
                      <Icons
                        src={
                          process.env.PUBLIC_URL +
                          `/assets/images/icon/${data.type}.png`
                        }
                      />
                      <div>ID: {data.appid}</div>
                      <QRCodeText>{data.type}</QRCodeText>
                    </QRCodeTextContainer>
                  )}
                </QRCodeHolder>
              );
            })}
          </QRCodeContainer>
        </CustomModal>
      </MaintenanceTextContainer>
    </Container>
  );
};

export default Maintenance;
