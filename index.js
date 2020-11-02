const divsContainer = document.getElementById("divs_container");
const inputContainer = document.getElementById("input_container");
const items = document.getElementById("samples");
const button = document.getElementById("button");
const selectedOption = document.getElementById("options");
const speedInput = document.getElementById("speed");

let divs = [];
let divsLength = [];
let totalDivs = 0;

const color = {
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

const bubbleSortDivs = async (speed) => {
  let len = divs.length;
  let k = len - 1;
  let swap;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      await sleep(speed);
      swap = false;
      if (parseInt(divs[j].style.height) > parseInt(divs[j + 1].style.height)) {
        swap = true;
        updateDivHeight(j);
        updateDivColor(divs[j + 1], color.orange);
        updateDivColor(divs[j], color.pink);
      }

      if (!swap && j < len - 1) {
        updateDivColor(divs[j + 1], color.orange);
        updateDivColor(divs[j], color.pink);
      }
    }
    updateDivColor(divs[k], color.blue);
    k--;
  }
};

const swap = (divs, leftIndex, rightIndex) => {
  let temp = divs[leftIndex].style.height;
  divs[leftIndex].style.height = divs[rightIndex].style.height;
  divs[rightIndex].style.height = temp;
};

const partition = async (divs, left, right, speed) => {
  let pivotIndex = Math.floor((right + left) / 2);
  let pivot = parseInt(divs[Math.floor((right + left) / 2)].style.height); //middle element

  i = left; //left pointer
  j = right; //right pointer
  while (i <= j) {
    while (parseInt(divs[i].style.height) < pivot) {
      updateDivColor(divs[pivotIndex], color.red);
      await sleep(speed);
      updateDivColor(divs[i], color.pink);
      i++;
      updateDivColor(divs[i], color.orange);
    }
    while (parseInt(divs[j].style.height) > pivot) {
      updateDivColor(divs[pivotIndex], color.red);
      await sleep(speed);
      updateDivColor(divs[j], color.pink);
      j--;
      updateDivColor(divs[j], color.orange);
    }
    if (i <= j) {
      updateDivColor(divs[i], color.white);
      updateDivColor(divs[j], color.white);
      await sleep(speed);
      swap(divs, i, j); //sawpping two elements
      updateDivColor(divs[i], color.pink);
      updateDivColor(divs[j], color.pink);
      i++;
      j--;
    }
  }

  return i;
};

const quickSortDivs = async (divs, left, right, speed) => {
  let index;
  if (divs.length > 1) {
    index = await partition(divs, left, right, speed); //index returned from partition
    updateDivColor(divs[index], color.pink);
    await sleep(speed);
    if (left < index - 1) {
      await quickSortDivs(divs, left, index - 1, speed);
    }
    if (index < right) {
      await quickSortDivs(divs, index, right, speed);
    }
  }
};

const updateDivHeight = (index) => {
  const aux = divs[index].style.height;
  divs[index].style.height = divs[index + 1].style.height;
  divs[index + 1].style.height = aux;
};

const updateDivColor = (div, color) => {
  div.style.backgroundColor = color;
};

const deleteDivs = (divs, totalDivs) => {
  for (let i = 0; i < totalDivs; i++) {
    divs[i].remove();
  }
};

const randomHeight = () => {
  return Math.floor(Math.random() * 101);
};

const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const renderAlgorithm = async (option, speed) => {
  switch (option) {
    case 0:
      await bubbleSortDivs(speed);
      break;
    case 1:
      await quickSortDivs(divs, 0, divs.length - 1, speed);
      break;

    default:
      break;
  }
};

button.addEventListener("click", renderDom);
