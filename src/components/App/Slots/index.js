import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { AppHistory } from "../../../history/History";

import { GameService } from "@Inwoker/tgs-api";

import SlotAllPNG from "../../../assets/images/slot-all.png";
import SlotAllInactivePNG from "../../../assets/images/slot-all-inactive.png";

import SlotAllGamePNG from "../../../assets/images/slot-allgame.png";
import SlotAllGameInactivePNG from "../../../assets/images/slot-allgame-inactive.png";
import SlotHotGamePNG from "../../../assets/images/slot-hotgame.png";
import SlotHotGameActivePNG from "../../../assets/images/slot-hotgame-active.png";
import SlotNewGamePNG from "../../../assets/images/slot-newgame.png";
import SlotNewGameActivePNG from "../../../assets/images/slot-newgame-active.png";
import SlotBookmarkPNG from "../../../assets/images/slot-bookmark.png";
import SlotBookmarkActivePNG from "../../../assets/images/slot-bookmark-active.png";
import SlotFishGamePNG from "../../../assets/images/slot-fishgame.png";
import SlotFishGameActivePNG from "../../../assets/images/slot-fishgame-active.png";
import SlotHistoryGamePNG from "../../../assets/images/slot-history.png";
import SlotHistoryGameActivePNG from "../../../assets/images/slot-history-active.png";
import SlotSearchPNG from "../../../assets/images/slot-search.png";

import SlotBookmark1PNG from "../../../assets/images/slot-bookmark-1.png";
import SlotBookmark2PNG from "../../../assets/images/slot-bookmark-2.png";

import SlotMoreGamePNG from "../../../assets/images/slot-moregame.png";
import { SHOW_LOGIN, GameTypeEnum, SlotFilterType } from "@Inwoker/tgs-api";
import Loading from "../../../components/App/Loading";

import i18n from "../../../utils/i18n";
import config from "../../../config/config";
import Common from "../../../utils/Common";

const Container = styled.div`
  width: 100%;
  height: auto;
  min-height: 770px;
  padding: 70px 0px;
  position: relative;
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      `/assets/images/pcGamePage/slots/background-` +
      Common.getCDNLanguagePrefix() +
      `.jpg`})
    no-repeat center top;
  background-color: #171b36;
`;

const InnerWrap = styled.div`
  width: 1007px;
  min-height: 580px;
  border-radius: 30px;

  background: rgba(255, 255, 255, 0.8);

  margin: 410px auto 50px auto;
  padding: 16px 46px;
  box-sizing: border-box;
  overflow-y: auto;
`;
const GameTabContainer = styled.div``;

const GameTab = styled.div`
  background: url(${(props) =>
      process.env.PUBLIC_URL +
      `/assets/images/pcGamePage/slots/` +
      props.img +
      (props.active === true ? `-white` : `-black`) +
      `.png`})
    no-repeat;
  background-position: center;
  background-size: contain;
  height: 60px;
  width: 100px;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
`;
const GameTabButton = styled.div`
  width: 141px;
  height: 76px;
  border-radius: 10px;
  background-color: #eeeeee;
  margin-left: 5px;
  margin-top: 5px;
  position: relative;
  float: left;

  &:hover {
    cursor: pointer;
    background-color: #1a1a1a;
  }
  &:hover ${GameTab} {
    background: url(${(props) =>
        process.env.PUBLIC_URL +
        `/assets/images/pcGamePage/slots/` +
        props.img +
        `-white.png`})
      no-repeat;
    background-position: center;
    background-size: 100%;
    height: 60px;
    width: 100px;
  }
  ${(props) =>
    props.active
      ? `  background-image: linear-gradient(to top, ` +
        props.theme.primaryGradient +
        `, ` +
        props.theme.primary +
        `);`
      : `  background-color: #EEEEEE;`};
`;

const GameTabAll = styled(GameTabButton)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotAllPNG}) , #1A1A1A;`
      : `  background: url(${SlotAllInactivePNG}) , rgb(238, 238, 238);`};
  background-repeat: no-repeat;
  background-size: 120ox auto;
  background-position: center;
  &:hover {
    cursor: pointer;
    background-color: url(${SlotAllPNG}), #1a1a1a;
  }
`;

const GameSubFilterContainer = styled.div`
  padding-left: 20px;
  width: 908px;
  height: 42px;
  border-top: 1px solid #36437d;
  border-bottom: 1px solid #36437d;
  margin: 25px 0 15px 0;
`;

const CategoryContainer = styled.div`
  height: 30px;
  box-sizing: border-box;


  font-size: 16px;
  float: left;
  margin-right: 40px
margin-top: 6px
&:hover {
    cursor: pointer;
  }

   
  ${(props) =>
    props.active
      ? ` color:  ${({ theme }) => theme.primary};`
      : ` color: ` + props.theme.secondary + `;`};
`;
const CategoryText = styled.div`
  float: left;
  margin-top: 2px;
`;
const FilterItem = styled.div`
  background-repeat: no-repeat;
  background-position: center;
  margin: 3px 5px 0 0;
  height: 19px;
  width: 19px;
  float: left;
`;

const AllGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotAllGamePNG}) no-repeat;`
      : `  background: url(${SlotAllGameInactivePNG}) no-repeat;`};
`;
const HotGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotHotGameActivePNG}) no-repeat;`
      : `  background: url(${SlotHotGamePNG}) no-repeat;`};
`;
const NewGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotNewGameActivePNG}) no-repeat;`
      : `  background: url(${SlotNewGamePNG}) no-repeat;`};
`;
const BookmarkFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotBookmarkActivePNG}) no-repeat;`
      : `  background: url(${SlotBookmarkPNG}) no-repeat;`};
`;
const FishGameFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotFishGameActivePNG}) no-repeat;`
      : `  background: url(${SlotFishGamePNG}) no-repeat;`};
`;
const HistoryFilterItem = styled(FilterItem)`
  ${(props) =>
    props.active
      ? `  background: url(${SlotHistoryGameActivePNG}) no-repeat;`
      : `  background: url(${SlotHistoryGamePNG}) no-repeat;`};
`;

const SearchFilterItemContainer = styled.div`
  width: 141px;
  height: 30px;
  border-radius: 15px;
  background-color: #d3d3d3;

  margin-top: 5px;
  float: right;
`;
const SearchFilterItemInput = styled.input`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.secondary};
  font-size: 15px;
  margin: 5px 0 0 5px;
  width: 100px;
  ::placeholder,
  ::-webkit-input-placeholder {
    color: #9e9e9e;
  }
  :-ms-input-placeholder {
    color: #9e9e9e;
  }
`;
const SearchButton = styled.div`
  background: url(${SlotSearchPNG}) no-repeat center;
  width: 20px;
  height: 20px;
  float: right;
  margin: 4px 8px 0 0;
  &:hover {
    cursor: pointer;
  }
`;

const GameListContainer = styled.div`
  width: 908px;
  padding: 6px;
  background-color: #eaeaea;
`;
const ButtonMore = styled.div`
  background: url(${SlotMoreGamePNG}) center no-repeat;
  background-color: #3a4754;
  border: solid 2px #34434f;
  color: #fff;
  border-radius: 33px;
  font-weight: bold;
  width: 179px;
  height: 45px;
  margin: 80px auto;
  font-size: 20px;
  padding-top: 16px;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
`;

const GameHoverSelection = styled.div`
  width: 165px;
  height: 205px;
  position: absolute;
  left: 0;
  top: 0;
  display: none;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 2;
  color: #fff;
  font-size: 65px;
  text-align: center;
  padding-top: 55px;
`;
const ItemContainer = styled.div`
  width: 165px;
  border: solid 1px #fde73f;
  position: relative;
  float: left;
  margin: 7px;
  &:hover {
    cursor: pointer;
  }
  &:hover ${GameHoverSelection} {
    display: block;
  }
  ${(props) =>
    `
  background-image:url(` +
    props.img +
    `)`};
  background-size: 165px 165px;
  background-repeat: no-repeat;
  background-position: center top;
`;
const GameDesc = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  height: 28px;
  float: right;
  background-color: rgba(0, 0, 0, 0.8);
  position: absolute;
  right: 0;
  top: 0;
  z-index: 3;
`;
const Namecontainer = styled.div`
  width: 165px;
  height: 40px;
  box-shadow: 0px 4px 6px 0 rgba(0, 0, 0, 0.8);
  border-top: solid 1px #fde73f;
  background-image: linear-gradient(
    to top,
    ${({ theme }) => theme.primaryGradient},
    ${({ theme }) => theme.primary}
  );

  color: #ffffff;
  font-size: 14px;
  padding: 10px 10px 0 10px;
  box-sizing: border-box;
  margin-top: 165px;
  float: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const GameProvider = styled.div`
  float: left;
  font-size: 14px;
  color: #ffffff;

  margin-top: 4px;
  text-align: center;
`;
const Bookmark = styled.div`
  float: right;

  width: 30px;
  height: 28px;
  background-repeat: no-repeat;
  background-position: 8px center;

  ${(props) =>
    props.bookmark
      ? ` background-image:  url(${SlotBookmark1PNG})`
      : `  background-image:  url(${SlotBookmark2PNG})`};
`;

const Spliter = styled.div`
  background-color: #515151;
  width: 1px;
  float: left;
  height: 14px;
  margin: 7px 0 10px 0;
`;

class Slots extends Component {
  constructor(props) {
    super(props);

    const type = this.getType();
    this.state = {
      firstLoad: true,
      filterGame: 0,
      keyword: "",
      gameList: [],
      page: 1,
      limit: 25,
      total: 0,
      type: type,
      platformList: [],
      loading: true,
      platform: this.props.match.params.platform
        ? this.props.match.params.platform
        : "",
    };
  }
  language = null;
  componentDidMount() {
    this.getGameList();
  }
  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.type !== this.state.type ||
      prevProps.match.params.platform !== this.props.match.params.platform ||
      prevProps.match.url !== this.props.match.url
    ) {
      if (prevProps.match.url !== this.props.match.url) {
        window.scrollTo({ top: 0, behavior: "smooth" });

        var platform = this.props.match.params.platform
          ? this.props.match.params.platform
          : "";

        this.getGameList(1, platform, this.getType());
      } else if (
        prevProps.match.params.platform !== this.props.match.params.platform
      ) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        this.setState({
          ...this.state,
          platform: this.props.match.params.platform
            ? this.props.match.params.platform
            : "",
        });
      } else {
        this.getGameList();
      }
    }
  }
  getType() {
    const type =
      this.props.match.url.indexOf("electron") >= 0
        ? GameTypeEnum.TABLEGAME
        : this.props.match.url.indexOf("slots") >= 0
        ? GameTypeEnum.SLOT
        : GameTypeEnum.TIGERSLOT;
    return type;
  }
  getGameList(
    page = this.state.page,
    platform = this.state.platform,
    type = this.state.type
  ) {
    this.setState({
      ...this.state,

      loading: true,
    });

    var result = GameService.GetGameList(platform, type);
    result.then((response) => {
      if (response.IsSuccess) {
        var data = response.data;

        if (page === 1) {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: data,
            loading: false,
          });
        } else {
          this.setState({
            ...this.state,
            page: page,
            platform: platform,
            type: type,
            gameList: this.state.gameList.concat(response.data),
            loading: false,
          });
        }
      } else {
        this.setState({
          ...this.state,
          gameList: [],
          platform: platform,
          type: type,
          loading: false,
        });
      }
    });
  }
  handleParentClick = (platform) => {
    const type =
      this.props.match.url.indexOf("fish") >= 0
        ? "fish"
        : this.props.match.url.indexOf("slots") >= 0
        ? "slots"
        : "electron";
    AppHistory.push(`/${i18n.language}/${type}/${platform}`);
  };
  handleFilterGameClick = (filterType) => {
    this.setState({ ...this.state, filterGame: filterType, page: 1 });
  };
  handleKeywordChange = (e) => {
    this.setState({ ...this.state, keyword: e.target.value });
  };
  // handleSearchClick = (e) => {
  //   this.getGameList(1);
  // };
  // handleMoreClick = () => {
  //   this.setState({ ...this.state, page: this.state.page + 1 });
  // };
  // handleBookmarkClick = (id, collect_id) => {
  //   if (this.props.token) {
  //     if (collect_id > 0) {
  //       GameService.DeleteBookmarkSlotGame(collect_id).then((response) => {
  //         if (response.IsSuccess) {
  //           this.setState((preState) => {
  //             let newList = [];
  //             for (let k in this.state.gameList) {
  //               var item = this.state.gameList[k];
  //               if (item.id === id) {
  //                 item.collect_id = 0;
  //                 if (this.state.filterGame !== SlotFilterType.Bookmark) {
  //                   newList.push(item);
  //                 }
  //               } else {
  //                 newList.push(item);
  //               }
  //             }
  //             return { ...preState, gameList: newList };
  //           });
  //         }
  //       });
  //     } else {
  //       GameService.BookmarkSlotGame(this.props.token, id).then((response) => {
  //         if (response.IsSuccess) {
  //           var collect_id = response.data;
  //           this.setState((preState) => {
  //             let newList = [];
  //             for (let k in this.state.gameList) {
  //               var item = this.state.gameList[k];
  //               if (item.id === id) {
  //                 item.collect_id = collect_id;
  //               }
  //               newList.push(item);
  //             }
  //             return { ...preState, gameList: newList };
  //           });
  //           // this.state.gameList.filter((row) => row.id === id);
  //         }
  //       });
  //     }
  //   }
  // };
  handleJoinGameClick = (gpcode, gpid) => {
    if (this.props.token) {
      this.props.history.push(`/${i18n.language}/slots/play/${gpcode}/${gpid}`);
    } else {
      this.props.showLogin(true);
    }
  };

  genCategoryItem(category, text) {
    if (this.props.token == null && category === 3) {
      return null;
    }
    return (
      <CategoryContainer
        onClick={() => this.handleFilterGameClick(category)}
        active={this.state.filterGame === category}
      >
        {(() => {
          switch (category) {
            case SlotFilterType.All:
              return (
                <AllGameFilterItem
                  active={this.state.filterGame === category}
                ></AllGameFilterItem>
              );
            case SlotFilterType.Hot:
              return (
                <HotGameFilterItem
                  active={this.state.filterGame === category}
                ></HotGameFilterItem>
              );
            case SlotFilterType.New:
              return (
                <NewGameFilterItem
                  active={this.state.filterGame === category}
                ></NewGameFilterItem>
              );
            case SlotFilterType.Bookmark:
              return (
                <BookmarkFilterItem
                  active={this.state.filterGame === category}
                ></BookmarkFilterItem>
              );

            case SlotFilterType.Fish:
              return (
                <FishGameFilterItem
                  active={this.state.filterGame === category}
                ></FishGameFilterItem>
              );
            case SlotFilterType.History:
              return (
                <HistoryFilterItem
                  active={this.state.filterGame === category}
                ></HistoryFilterItem>
              );
            case SlotFilterType.Recommend:
              return (
                <HistoryFilterItem
                  active={this.state.filterGame === category}
                ></HistoryFilterItem>
              );
            default:
              return null;
          }
        })()}

        <CategoryText>{text}</CategoryText>
      </CategoryContainer>
    );
  }
  render() {
    let list = null;
    if (this.state.gameList.length > 0) {
      list = this.state.gameList
        .filter((a) => {
          if (this.state.filterGame === SlotFilterType.All) return true;
          else {
            if (this.state.filterGame === SlotFilterType.Hot) {
              return a.tag.hot === true;
            } else if (this.state.filterGame === SlotFilterType.New) {
              return a.tag.new === true;
            } else if (this.state.filterGame === SlotFilterType.Recommend) {
              return a.tag.recommend === true;
            }
          }

          return false;
        })
        .filter((a) => {
          if (this.state.keyword === "") return true;
          else
            return a.name
              .toUpperCase()
              .includes(this.state.keyword.toUpperCase());
        })
        .map((el, i) => (
          <ItemContainer
            key={i}
            img={`${config.sourceUrl}${el.gpcode.toUpperCase()}${
              this.state.type === GameTypeEnum.FISH
                ? `/${i18n.language}`
                : `/${Common.getCDNLanguagePrefix()}`
            }/${el.code}.jpg`}
          >
            <GameDesc>
              <GameProvider>{el.gpcode}</GameProvider>
              <Spliter></Spliter>
              {/* <Bookmark
                bookmark={el.collect_id > 0}
                // onClick={() => this.handleBookmarkClick(el.id, el.collect_id)}
              ></Bookmark> */}
            </GameDesc>
            <GameHoverSelection
              onClick={() => this.handleJoinGameClick(el.gpcode, el.id)}
            >
              GO
            </GameHoverSelection>
            <Namecontainer>{el.name}</Namecontainer>
          </ItemContainer>
        ));
    }

    return (
      <Container>
        <InnerWrap>
          <GameTabContainer>
            <GameTabAll
              active={this.state.platform == ""}
              onClick={() => this.handleParentClick("")}
            ></GameTabAll>

            {this.props.game.homePageGameList

              .filter((ele) => {
                return ele.type === this.state.type; //check for only SLOT enum.
              })

              .map((row, index) => {
                return (
                  <GameTabButton
                    key={index}
                    img={row.abbreviation.toLowerCase()}
                    active={this.state.platform == row.abbreviation}
                    onClick={() => this.handleParentClick(row.abbreviation)}
                  >
                    <GameTab
                      img={row.abbreviation.toLowerCase()}
                      active={this.state.platform == row.abbreviation}
                    ></GameTab>
                  </GameTabButton>
                );
              })}
          </GameTabContainer>
          <GameSubFilterContainer>
            {this.genCategoryItem(SlotFilterType.All, i18n.t("slot.allGame"))}
            {this.genCategoryItem(SlotFilterType.Hot, i18n.t("slot.hotGame"))}
            {this.genCategoryItem(SlotFilterType.New, i18n.t("slot.newGame"))}
            {this.genCategoryItem(
              SlotFilterType.Recommend,
              i18n.t("slot.recommendGame")
            )}
            {/* {this.genCategoryItem(
              SlotFilterType.Bookmark,
              i18n.t("slot.bookmarkGame")
            )}
            {this.genCategoryItem(
              SlotFilterType.History,
              i18n.t("slot.historyGame")
            )} */}
            <SearchFilterItemContainer>
              <SearchFilterItemInput
                type="text"
                maxLength="15"
                autocomplete="off"
                placeholder={i18n.t("slot.search")}
                onChange={this.handleKeywordChange}
              ></SearchFilterItemInput>
            </SearchFilterItemContainer>
          </GameSubFilterContainer>
          <GameListContainer>{list}</GameListContainer>
          {/* <ButtonMore
            onClick={this.handleMoreClick}
            style={{
              visibility:
                this.state.gameList.length < this.state.total
                  ? "visible"
                  : "hidden",
            }}
          >

          </ButtonMore> */}
        </InnerWrap>
        <Loading show={this.state.loading}></Loading>
      </Container>
    );
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    showLogin: (payload) => {
      dispatch({ type: SHOW_LOGIN, payload });
    },
  };
};
const mapStateToProps = (state) => {
  return {
    token: state.account.token,
    // jackpotAmount: state.ui.jackpotAmount,
    game: state.game,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Slots);
