/*!
 * Portfolio Error page script
 * @author: Vo, Dinh Tue Minh
 * Reference: https://codepen.io/gavra/pen/upHzg
 */

const getStyleValue = (element, styleName) => {
  try {
    const computedStyle = window.getComputedStyle(element);
    return computedStyle.getPropertyValue(styleName);
  }
  catch (error) {
    console.log(error);
  }
};

const setStyleValue = (element, styleName, value) => {
  try {
    element.style[styleName] = value;
  }
  catch (error) {
    console.log(error);
  }
};

const styleNav = () => {
  const tiles = document.querySelectorAll("nav > p > span");
  tiles.forEach(tile => {
    const width = getStyleValue(tile, "width");
    setStyleValue(tile, "height", width);
    setStyleValue(tile, "line-height", width);
  });

  const p = document.querySelector("nav > p");
  const pWidth = getStyleValue(p, "width");
  setStyleValue(p, "height", pWidth);

  const nav = document.querySelector("nav");
  const navWidth = getStyleValue(nav, "width");
  setStyleValue(nav, "height", navWidth);
};

styleNav();

window.addEventListener("resize", styleNav);

const highlightTilePromise = (element, delay) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      element.classList.add("highlighted");
      resolve();
    }
    catch (error) {
      reject(error);
    }
  }, delay);
});

const removeHighlightTilePromise = (element, delay) => new Promise((resolve, reject) => {
  setTimeout(() => {
    try {
      element.classList.remove("highlighted");
      resolve();
    }
    catch (error) {
      reject(error);
    }
  }, delay);
});

const openingEffect = async () => {
  const showDelay = 200, hiddenDelay = 500;
  const nRows = 8, nCols = 8;
  const tiles = document.querySelectorAll("nav > p > span");
  for (let i = 0, n = nCols + nRows; i < n; ++i) {
    const targets = [];
    for (let iR = 0; iR < nRows; ++iR) {
      const iC = i - iR;
      if (iC >= 0 && iC < nCols) {
        const tileIndex = nCols * iR + iC;
        targets.push(tiles[tileIndex]);
      }
    }
    await Promise.all(targets.map(tile => highlightTilePromise(tile, showDelay)));
    setTimeout(() => {
      Promise.all(targets.map(tile => removeHighlightTilePromise(tile, hiddenDelay)));
    }, 200);
  }
};

const setUpRefreshButton = () => {
  const lastSpan = document.querySelector("nav > p > span:last-child")
  lastSpan.innerHTML = "&#x21bb";
  lastSpan.classList.add("clickable");
  lastSpan.addEventListener("click", refreshMatrix);
};

const refreshMatrix = async () => {
  const tiles = document.querySelectorAll(".tile");
  await Promise.all([...tiles].map(tile => removeHighlightTilePromise(tile, 100)));
  const lastSpan = document.querySelector("nav > p > span:last-child")
  lastSpan.innerHTML = "";
  lastSpan.classList.remove("clickable");
  lastSpan.removeEventListener("click", refreshMatrix);
  await start();
};


const highlightTiles = async () => {
  const delay = 250;
  try {
    const tiles = document.querySelectorAll(".tile");
    for (const tile of tiles) {
      await highlightTilePromise(tile, delay);
    };
  }
  catch (error) {
    console.log(error);
  }
};

const start = () => {
  setTimeout(async () => {
    await openingEffect();
    setTimeout(async () => {
      await highlightTiles();
      setTimeout(() => {
        setUpRefreshButton();
      }, 500);
    }, 1000);
  }, 1000);
};

start();