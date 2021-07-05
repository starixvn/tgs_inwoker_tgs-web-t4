import React from "react";
import Header from "../../Wap/Share/Header";

import { AppHistory } from "../../../history/History";

import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    padding: "10px",
    fontSize: theme.typography.pxToRem(30),
  },
  content: {
    fontSize: theme.typography.pxToRem(28),
  },
}));

export default function AboutUs() {
  const data = [
    {
      header: "一、会员有年龄限制吗？",
      content:
        "您在注册开户前必须确认是否已满18周岁或者符合所在国家地区的规定。",
    },
    {
      header: "二、如何保障我账号里的资金安全？",
      content:
        "会员账号注册成功后，请牢记密码，切勿透露给他人，建议不要在网吧等公共场所登录游戏。会员取款时，我们只允许将钱汇入您开户时绑定的银行账号上。千万不要对要求您提供个人资料及更改密码的电子邮件作出回应。环亚娱乐不会要求客户在电邮上提供私人资料及账户密码，如您有任何疑问或怀疑，请立即联络我们的客服查询。",
    },
    {
      header: "三、网站推荐使用的浏览器有哪些？",
      content:
        "推荐的浏览器包括：  <br/>- 微软IE9或以上  <br/>- 火狐Firefox 10或以上  <br/>- 苹果Safari 5或以上  <br/>- 谷歌Chrome 17或以上  <br/>如果您使用的是其他浏览器而并不是上述列出的其中一种和在使用我们的网站服务时遇到问题的话，请联络我们的客服。我们将会给您最佳的建议。 ",
    },
    {
      header: "四、如果忘记自己的账户密码怎么办？",
      content: "您可以联系24小时在线客服人员或是通过绑定手机找回账号密码。",
    },
    {
      header: "五、单笔存款最低、最高限制是多少？",
      content: "单笔最低存款为人民币 ¥50，最高存款无上限。",
    },
    {
      header: "六、为什么我存款后在账户内还是看不到该款项？",
      content:
        "如您确认已扣款成功，即实时到账至您的账户，请您重新刷新额度，确认是否已充值至额度里。如尚未到账，请立即联系客服或在线客服，我们将立即为您处理。",
    },
    {
      header: "七、 取款时长需要多久？",
      content:
        "单日提款限额内的取款申请：银行工作时间(周一至五9:00-17:00）1小时内到账；其它非银行工作时间，600万内的取款2小时内到账，如高于600万的部分，最晚于次日11:00前到账，单日取款无上限封顶。单日取款次数是没有限制，您可在一天内无限次取款，不收取任何手续费用。",
    },
    {
      header: "八、存款未投注可以提款吗？",
      content:
        "您存款不投注是无法申请取款的,提款前只需您的有效投注额达到存款金额的1倍流水即可提款。",
    },
    {
      header: "九、如何证明游戏结果是实时、公平公正的？",
      content:
        "您好，我们的网站坚持公平公正的原则，受法律监管并接受监管。所有开奖结果绝对安全公平，所以请您放心。黄金城娱乐场是把赌场实景通过视频直接传输的，100%与现场同步，是完全公平、公正、公开的。",
    },
  ];
  const classes = useStyles();

  return (
    <>
      <Header
        token={null}
        balance={0}
        background={true}
        onBackClick={() => AppHistory.goBack()}
        title={"常见问题"}
      ></Header>
      <div className={classes.root}>
        {data.map((row) => {
          return (
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography className={classes.heading}>
                  {row.header}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.content}>
                  <div dangerouslySetInnerHTML={{ __html: row.content }}></div>
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        })}
      </div>
    </>
  );
}
