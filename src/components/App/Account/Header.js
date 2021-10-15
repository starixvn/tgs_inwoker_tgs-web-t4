import React from "react";
import styled, { keyframes } from "styled-components";
import DynamicFont from "react-dynamic-font";

import IconRefreshPNG from "../../../assets/images/icon-refresh.png";
import AvatarPNG from "../../../assets/images/avatar.png";

import i18n from "../../../utils/i18n";
import Common from "../../../utils/Common";
export const rotateKeyFrame = keyframes`
  0% {
    transform:rotate(0deg)
  }
  100% {
    transform:rotate(-359deg)
  }
`;
const Container = styled.div`
  width: 1205px;
  height: 142px;

  margin: 19px 13px 10px 13px;

  border-radius: 10px;

  background-color: #ededed;

  box-shadow: 0px 3px 16px -3px rgba(0, 0, 0, 0.75);
`;
const AvatarContainer = styled.img`
  width: 88px;
  float: left;
  margin: 30px 15px 0 30px;
`;
const PlayerInfoContainer = styled.div`
  float: left;
  margin: 36px 0;
  width: 210px;
`;
const PlayerName = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.secondary};
  height: 21px;
`;

const MissionContainer = styled.div`
  margin-top: 10px;

  font-size: 12px;

  color: ${({ theme }) => theme.primary};
`;
const SpliterLine = styled.div`
  background-color: #b7c7cc;
  width: 1px;
  height: 85px;
  float: left;
  margin: 30px 0;
`;
const MainWalletContainer = styled.div`
  float: left;
  margin: 24px 17px;
`;
const MainAccountLabel = styled.div`
  font-size: 18px;
  color: ${({ theme }) => theme.secondary};
  height: 21px;
`;
const AmountContainer = styled.div`
  width: 180px;
  float: left;
  font-family: Arial;
  font-size: 40px;
  text-align: right;
  color: ${({ theme }) => theme.secondary};
  margin-top: 15px;
`;
const RefreshButton = styled.div`
  width: 28px;
  height: 29px;
  border-radius: 4.7px;

  float: left;
  margin: 25px 25px 0 15px;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );
  &:hover {
    cursor: pointer;
  }
`;
const RefreshButtonIcon = styled.div`
  width: 28px;
  height: 29px;
  background: url(${IconRefreshPNG}) no-repeat center;

  &:hover {
    animation: ${rotateKeyFrame} 1s linear 0s infinite;
  }
`;
const VIPLabel = styled.div`
  color: ${({ theme }) => theme.primary};
  font-weight: bold;
  font-size: 12px;
`;
function Header(props) {
  var ingame = 0;

  props.game.providerList.map((item) => {
    if (item.transferwallet === true) ingame += parseFloat(item.balance);
  });

  return (
    <Container>
      <AvatarContainer src={AvatarPNG}></AvatarContainer>
      <PlayerInfoContainer>
        <PlayerName>{props.info.member_username}</PlayerName>
        <VIPLabel>
          VIP
          {props.info.member_level_id}
        </VIPLabel>
        {/* <MissionContainer>
          {i18n.t("web.account.header.lastLogin")}:
          {props.info.member_last_login}
        </MissionContainer> */}
      </PlayerInfoContainer>

      <SpliterLine></SpliterLine>
      <MainWalletContainer>
        <MainAccountLabel>
          {i18n.t("web.account.header.mainWallet")}:
        </MainAccountLabel>
        <AmountContainer>
          <DynamicFont
            content={
              props.wallet.mainSymbol +
              Common.formatNumberWithThousand(props.wallet.mainBalance)
            }
          />
        </AmountContainer>
        <RefreshButton onClick={props.onhandleRefreshClick}>
          <RefreshButtonIcon></RefreshButtonIcon>
        </RefreshButton>
      </MainWalletContainer>
      <SpliterLine></SpliterLine>
      <MainWalletContainer>
        <MainAccountLabel>
          {i18n.t("web.account.header.allGameWallet")}:
        </MainAccountLabel>
        <AmountContainer>
          <DynamicFont content={props.wallet.mainSymbol + ingame.toFixed(2)} />
        </AmountContainer>
        <RefreshButton onClick={props.onhandleRefreshClick}>
          <RefreshButtonIcon></RefreshButtonIcon>
        </RefreshButton>
      </MainWalletContainer>
      <SpliterLine></SpliterLine>
      <MainWalletContainer>
        <MainAccountLabel>
          {i18n.t("web.account.header.total")}:
        </MainAccountLabel>
        <AmountContainer>
          <DynamicFont
            content={
              props.wallet.mainSymbol +
              Common.formatNumberWithThousand(props.wallet.mainBalance + ingame)
            }
          />
        </AmountContainer>
        <RefreshButton onClick={props.onhandleRefreshClick}>
          <RefreshButtonIcon></RefreshButtonIcon>
        </RefreshButton>
      </MainWalletContainer>
    </Container>
  );
}
export default Header;
