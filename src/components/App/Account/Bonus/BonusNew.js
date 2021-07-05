import React from "react";
import styled from "styled-components";
import config from "../../../../config/config";
import IconClockPNG from "../../../../assets/images/icon-clock.png";
import Common from "../../../../utils/Common";
const Container = styled.div`
  padding: 24px 0 0 32px;
`;
const BonusContainer = styled.div`
  width: 870px;
  height: 133px;
  margin-bottom: 22px;
  background-color: #16242a;
  background-repeat: no-repeat;
  background-size: contain;
  box-shadow: 4.5px 7.8px 5px 0 rgba(109, 109, 109, 0.59);
  border: solid 3px #e83a3a;
  border-radius: 3px;
  padding: 15px 15px 0 0;
`;
const ContentLeft = styled.div`
  margin-left: 180px;
  float: left;
  width: 400px;
`;
const GameType = styled.div`
  padding: 1px 8px;
  height: 22px;
  background-color: #c0252d;
  float: left;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin: 3px 0 0 0;
`;
const Title = styled.div`
  font-size: 20px;
  font-weight: bold;

  color: #ffffff;
  float: left;
  margin-left: 15px;
`;

const Limit = styled.div`
  font-size: 14px;
  margin-top: 6px;
  color: #fde73f;
`;
const ExpiredDate = styled.div`
  font-size: 14px;
  margin-top: 6px;
  color: #fafeff;
  background: url(${IconClockPNG}) no-repeat left 4px;
  padding-left: 20px;
`;

const ContentRight = styled.div`
  margin-left: 25px;
  float: left;
  width: 238px;
`;
const BonusAmount = styled.div`
  font-family: Arial;
  font-size: 30px;
  color: #fde73f;

  float: right;
`;
const BonusAmountLabel = styled.div`
  font-size: 12px;
  color: #eaeaea;
  float: right;
  margin: 8px 6px 0px 0;
`;
const RedemButton = styled.div`
  width: 144px;
  height: 47px;
  background: #c0252d;
  &:hover {
    background: #dc4048;
    cursor: pointer;
  }
  border-radius: 23px;
  margin: 12px auto;
  float: right;
`;
const RedemButtonLabel = styled.div`
  font-size: 16px;
  text-align: center;
  color: #ffffff;
  margin-top: 5px;
  margin-top: 11px;
`;
function BonusNew(props) {
  let bonus = null;
  if (props.list.length > 0)
    bonus = props.list.map((el, i) => (
      <BonusContainer
        key={i}
        style={{
          backgroundImage: "url(" + config.sourceUrl + el.image_url + ")"
        }}
      >
        <ContentLeft>
          <GameType>{Common.GetBonusCategory(el.type_id)}</GameType>
          <Title>{el.type_id === 5 ? el.subtitle : el.title}</Title>
          <div className="clear"></div>
          <Limit>限制平台 : {el.turnover_limit}</Limit>
          <div className="clear"></div>
          <Limit>红利限额 : {el.turnover_num}</Limit>
          <div className="clear"></div>
          <ExpiredDate>有效期限：{el.expired_time}</ExpiredDate>
          {/* <ProgressBarFrame>
            <ProgressBar></ProgressBar>
          </ProgressBarFrame>
          <Min>{el.turnover_from}</Min>
          <CurrentProgress>目前流水 {el.current_turnover}</CurrentProgress>
          <Max>{el.turnover_to}</Max> */}
        </ContentLeft>
        <ContentRight>
          <BonusAmount>${el.amount}</BonusAmount>
          <BonusAmountLabel>红利金额</BonusAmountLabel>
          <div className="clear"></div>
          <RedemButton
            onClick={() => props.onhandleReceiveBonus(el.bore_id, el.type_id)}
          >
            <RedemButtonLabel>立即领取</RedemButtonLabel>
          </RedemButton>
        </ContentRight>
      </BonusContainer>
    ));

  return <Container>{bonus}</Container>;
}

export default BonusNew;
