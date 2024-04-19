import React from "react";
import { SlotMachine } from "@lucky-canvas/react";
import { item as products } from "./product";

export default class SlotDemo extends React.Component {
  constructor() {
    super();
    this.myLucky = React.createRef();

    const prizes = products.map((item, index) => ({
      item,
      index,
      title: item.name,
      x: 0,
      y: index,
      imgs: [{ src: item.picture, width: "100%", top: "0%" }],
    }));

    this.state = {
      blocks: [{ padding: "10px", background: "#ffc27a" }],
      slots: [
        { speed: 8, direction: 1 },
        { speed: 10, direction: -1 },
        { speed: 9, direction: -1 },
      ],
      prizes: prizes,
      defaultStyle: {
        borderRadius: 15,
        fontColor: "#DF424B",
        fontSize: "14px",
        textAlign: "center",
        background: "#fff",
        shadow: "0 5 1 #ebf1f4",
      },
      prizeResult: null, // 存储抽到的奖品
    };
  }

  playGame = () => {
    this.myLucky.current.play();

    // 随机选择一种结果
    const resultIndex = Math.floor(Math.random() * this.state.prizes.length);
    // 停止抽奖
    this.myLucky.current.stop(resultIndex);
  };

  handleEnd = (prize) => {
    clearTimeout(this.stopTimeout);
    console.log("抽到的产品名称:", prize.item);
    this.setState({ prizeResult: prize.item });
  };

  render() {
    let title = this.state.prizeResult && this.state.prizeResult.name;
    let res = this.state.prizeResult && this.state.prizeResult;
    console.log(res);
    return (
      <div>
        <SlotMachine
          ref={this.myLucky}
          width="30vw"
          height="30vw"
          blocks={this.state.blocks}
          prizes={this.state.prizes}
          slots={this.state.slots}
          defaultStyle={this.state.defaultStyle}
          onStart={this.playGame}
          onEnd={this.handleEnd}
        ></SlotMachine>
        <button
          onClick={this.playGame}
          class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Play
        </button>
        <div>Congratulations, you won the lottery {title}</div>
      </div>
    );
  }
}
