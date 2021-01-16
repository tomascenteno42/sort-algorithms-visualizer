import { divs, divsCopy } from "../index";
// TODO: UNIFY swap and updateDivHeight
export const swap = (i, j) => {
  let temp = divs[i].style.height;
  divs[i].style.height = divs[j].style.height;
  divs[j].style.height = temp;
};

export const updateDivHeight = (index) => {
  const aux = divs[index].style.height;
  divs[index].style.height = divs[index + 1].style.height;
  divs[index + 1].style.height = aux;
};

export const updateDivColor = (div, color) => {
  div.style.backgroundColor = color;
};

export const getDivByValue = (value) => {
  for (let i = 0; i < divs.length; i++) {
    if (parseInt(divsCopy[i].style.height) === value) {
      console.log(value);
      return divsCopy[i];
    }
  }
};

export const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};
