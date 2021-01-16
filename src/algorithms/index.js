import {
  swap,
  updateDivHeight,
  updateDivColor,
  getDivByValue,
  sleep,
} from "../utils/index";

import { divs, divsLength, color } from "../index";

export const selectionSortDivs = async (speed) => {
  let len = divs.length;

  for (let i = 0; i < len; i++) {
    let min = i;
    await sleep(speed);
    for (let j = i + 1; j < len; j++) {
      if (parseInt(divs[min].style.height) > parseInt(divs[j].style.height)) {
        min = j;
      }
    }
    if (min !== i) {
      updateDivColor(divs[min], color.white);
      updateDivColor(divs[i], color.blue);
      await sleep(speed);

      swap(i, min);
      updateDivColor(divs[min], color.pink);
      updateDivColor(divs[i], color.pink);
    }
    updateDivColor(divs[i], color.orange);
  }
};

export const bubbleSortDivs = async (speed) => {
  let len = divs.length;
  let k = len - 1;
  let swap;

  for (let i = 0; i < len - 1; i++) {
    updateDivColor(getDivByValue(divsLength[k]), color.white);
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
