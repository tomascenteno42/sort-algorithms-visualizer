const divsContainer = document.getElementById("divs_container");
const items = document.getElementById("samples");
const button = document.getElementById("button");
const algorithm = document.getElementById("algorithms").children;
const form = document.getElementById("form");

const divsLength = [];
let divs = [];

let totalDivs = 0;

const render = (e) => {
  e.preventDefault();

  totalDivs = items.value;

  let sortedLengths = [];

  createDivs();

  sortedLengths = bubbleSortDivs(divsLength);
}

const styleDiv = (div, width) => {
  div.style.marginBottom = "5px"
  div.style.padding = "15px";
  div.style.backgroundColor = "orange";
  div.style.width = width + "%";
}

const createDivs = () => {
  let divWidth = 0;


  for (let i = 0; i < totalDivs; i++) {
    let div = document.createElement("div");
    divsContainer.append(div);

    divWidth = randomWidth();

    styleDiv(div, divWidth.toString());

    divs.push(div);
    divsLength[i] = divWidth;
  }
}

const bubbleSortDivs = async (divsLength) => {
  let len = divsLength.length;
  let k = len - 1;
  let swap;

  for (let i = 0; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      await sleep(200);
      swap = false;
      if (divsLength[j] > divsLength[j + 1]) {
        swap = true;

        let tmp = divsLength[j];
        divsLength[j] = divsLength[j + 1];
        divsLength[j + 1] = tmp;

        updateDivwidth(j);

        updateDivColor(j + 1, "red")
        updateDivColor(j, "orange");
      }

      if (!swap && j < len - 1) {
        updateDivColor(j + 1, "red");
        updateDivColor(j, "orange");
      }
    }
    updateDivColor(k, "green");
    k--;
  }
};

const updateDivwidth = (index) => {
  const aux = divs[index].style.width;
  divs[index].style.width = divs[index + 1].style.width
  divs[index + 1].style.width = aux;
}


const updateDivColor = (index, color) => {
  divs[index].style.backgroundColor = color;
}

form.addEventListener("submit", render);

const randomWidth = () => { return Math.floor(Math.random() * 101) }

const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
}