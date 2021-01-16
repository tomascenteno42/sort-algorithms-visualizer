import "./css/styles.css";

import { selectionSortDivs, bubbleSortDivs } from "./algorithms/index";

const divsContainer = document.getElementById("divs_container");
const inputContainer = document.getElementById("input_container");
const items = document.getElementById("samples");
const button = document.getElementById("button");
const selectedOption = document.getElementById("options");
const speedInput = document.getElementById("speed");

export let divs = [];
export let divsLength = [];

export let divsCopy = [];
let totalDivs = 0;

export const color = {
  pink: "#ed64a6",
  orange: "#f6ad55",
  blue: "#90cdf4",
  red: "red",
  white: "white",
};

const renderDom = async () => {
  const option = selectedOption.selectedIndex;
  const speed = speedInput.value;
  divsContainer.style.height = `${
    window.innerHeight - inputContainer.offsetHeight
  }px`;

  button.style.visibility = "hidden";

  if (totalDivs != 0) {
    deleteDivs(divs, totalDivs);
    divs = [];
    divsLength = [];
  }
  totalDivs = items.value;

  createDivs();
  divsCopy = [...divs];
  divsLength = divsLength.sort((a, b) => a - b);
  await renderAlgorithm(option, speed);
  button.style.visibility = "visible";
};

const styleDiv = (div, height) => {
  div.style.width = `${window.innerWidth / items.value / 2}px`;
  div.style.backgroundColor = color.pink;
  div.style.height = height + "%";
};

const createDivs = () => {
  let divHeight = 0;
  for (let i = 0; i < totalDivs; i++) {
    let div = document.createElement("div");
    divsContainer.append(div);

    divHeight = randomHeight();

    styleDiv(div, divHeight.toString());

    divs.push(div);
    divsLength[i] = divHeight;
  }
};

const deleteDivs = (divs, totalDivs) => {
  for (let i = 0; i < totalDivs; i++) {
    divs[i].remove();
  }
};

const randomHeight = () => {
  return Math.floor(Math.random() * 101);
};

const renderAlgorithm = async (option, speed) => {
  switch (option) {
    case 0:
      await bubbleSortDivs(speed);
      break;
    case 1:
      await selectionSortDivs(speed);
      break;
    default:
      break;
  }
};

button.addEventListener("click", renderDom);
