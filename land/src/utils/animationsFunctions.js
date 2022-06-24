// anim 1 ------------
export function bordersOutOnScroll(element, width) {
  if (!element || width < 815) return;

  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;

  let durationInPx = 0.3 * height;

  if (bottom < height + durationInPx) {
    let durationInPx = height * 0.1;
    let passedPx = bottom - height;
    let percentsPassed = (passedPx * 100) / (durationInPx * 5);

    let newVh = durationInPx - (durationInPx * percentsPassed) / 100;
    element.style.top = `-${newVh}px`;
  }
}

// anim 2 ------------
export function zoomIn(element) {
  if (!element) {
    return;
  }

  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;
  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;

  let bottom = scrollTop + height;
  var initScale = 0.92;
  var initOpacity = 0.3;
  if (bottom > distanceToTop) {
    let passedPixels = bottom - distanceToTop;
    let percentsPassed = (100 * passedPixels) / (elementHeight * 2);
    if (percentsPassed < 101) {
      let newVal = initScale + ((1 - initScale) * percentsPassed) / 100;
      let newOpac = initOpacity + ((1 - initOpacity) * percentsPassed) / 100;
      element.style.transform = `scale(${newVal})`;
      element.style.opacity = newOpac;
    }
  }
}
// anim 3 ------------
export function translateX1(element, card1Bot) {
  if (!element) {
    return;
  }

  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;

  if (bottom > card1Bot) {
    let passedPx = bottom - card1Bot;
    if (passedPx > 0 && passedPx < 560) {
      let percentsPassed = (100 * passedPx) / 560;
      if (percentsPassed < 101) {
        let turn = (0.25 * percentsPassed) / 100;
        let opac = 1 - (1 * percentsPassed) / 100;
        element.style.transform = `rotate(-${turn}turn)`;
        element.style.opacity = opac;
      }
    } else {
      element.style.transform = "rotate(0)";
      element.style.opacity = 0;
    }
  } else {
    element.style.transform = "rotate(0)";
    element.style.opacity = 1;
  }
}

export function translateX2(element, card1Bot) {
  if (!element) {
    return;
  }

  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;

  let startPx = card1Bot + elementHeight;
  if (bottom > startPx) {
    let passedPx = bottom - startPx;
    if (passedPx > 0 && passedPx < 400 * 2) {
      let percentsPassed = (100 * passedPx) / (300 * 2);
      if (percentsPassed < 50) {
        let turn = (0.25 * percentsPassed) / 100;
        let opac = ((1 * percentsPassed) / 100) * 2;

        element.style.transform = `rotate(-${turn}turn)`;
        element.style.opacity = opac;
      } else if (percentsPassed > 50 && percentsPassed < 60) {
        element.style.transform = `rotate(-45deg)`;
        element.style.opacity = 1;
      } else if (percentsPassed > 60 && percentsPassed < 110) {
        percentsPassed -= 10;
        let turn = (0.25 * percentsPassed) / 100;
        let opac =
          1 - (1 * percentsPassed) / 100 + (1 - (1 * percentsPassed) / 100);
        element.style.transform = `rotate(-${turn}turn)`;
        element.style.opacity = opac;
      }
    } else {
      element.style.transform = "rotate(45deg)";
      element.style.opacity = 0;
    }
  } else {
    element.style.transform = "rotate(45deg)";
    element.style.opacity = 0;
  }
}

export function translateX3(element, card1Bot) {
  if (!element) {
    return;
  }

  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;

  let startPx = card1Bot + elementHeight * 2.5;

  if (bottom > startPx) {
    let passedPx = bottom - startPx;
    if (passedPx > 0 && passedPx < 400 * 3) {
      let percentsPassed = (100 * passedPx) / (300 * 3);
      if (percentsPassed < 50) {
        let turn = (0.25 * percentsPassed) / 100;
        // console.log("turn: ", turn);
        let opac = ((1 * percentsPassed) / 100) * 2;
        element.style.transform = `rotate(-${turn * 2}turn)`;
        element.style.opacity = opac;
      } else if (percentsPassed > 50 && percentsPassed < 60) {
        element.style.transform = `rotate(-90deg)`;
        element.style.opacity = 1;
      }
    } else {
      element.style.transform = "rotate(-90deg)";
      element.style.opacity = 1;
    }
  } else {
    element.style.transform = "rotate(90deg)";
    element.style.opacity = 0;
  }
}

// anim 4 ------------
export function zIndexMoving1(element, refCard1Bot) {
  if (!element) {
    return;
  }

  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;

  let startPx = refCard1Bot;

  if (startPx < 3000) {
    return;
  }

  if (bottom > startPx) {
    // start if passed

    let passedPx = bottom - startPx;

    if (passedPx < elementHeight * 2) {
      // appearence
      let percentsPassed = (100 * passedPx) / elementHeight / 2;
      if (percentsPassed > 100) {
        return;
      }
      let opac = (1 * percentsPassed) / 100;
      let topPx = 200 - (200 * percentsPassed) / 100;
      let scale = 1 + (0.3 - (0.3 * percentsPassed) / 100);

      element.style.opacity = opac;
      element.style.top = `${topPx}px`;
      element.style.transform = `scale(${scale})`;
    } else if (passedPx > elementHeight * 2 && passedPx < elementHeight * 4) {
      // scale out
      let percentsPassed = ((100 * passedPx) / elementHeight) * 2;
      if (percentsPassed > 400 && percentsPassed < 800) {
        let temp = (percentsPassed - 400) / 4;
        let scale = 1 - (0.15 * temp) / 100;
        element.style.transform = `scale(${scale})`;
      }
    }
  } else {
    element.style.opacity = 0;
  }
}

export function zIndexMoving2(element, refCard1Bot) {
  if (!element) {
    return;
  }

  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;

  let startPx = refCard1Bot + elementHeight * 1.5;
  if (startPx < 3000) {
    return;
  }
  if (bottom > startPx) {
    let passedPx = bottom - startPx;
    if (passedPx < elementHeight * 3) {
      let percentsPassed = (100 * passedPx) / elementHeight / 2;
      if (percentsPassed > 100) {
        // scale out
        let percentsPassed = (100 * passedPx) / elementHeight;
        let temp = (percentsPassed - 100) / 4;
        let scale = 1 - (0.15 * temp) / 100;
        element.style.transform = `scale(${scale})`;

        return;
      }
      let opac = (1 * percentsPassed) / 100;
      let topPx = 400 - (300 * percentsPassed) / 100;
      let scale = 1 + (0.2 - (0.2 * percentsPassed) / 100);

      element.style.opacity = opac;
      element.style.top = `${topPx}px`;
      element.style.transform = `scale(${scale})`;
    }
  } else {
    element.style.opacity = 0;
  }
}

export function zIndexMoving3(element, refCard1Bot) {
  if (!element) {
    return;
  }

  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;

  let startPx = refCard1Bot + elementHeight * 3;
  if (startPx < 3000) {
    return;
  }
  if (bottom > startPx) {
    let passedPx = bottom - startPx;
    if (passedPx < elementHeight * 3) {
      let percentsPassed = (100 * passedPx) / elementHeight / 2;
      if (percentsPassed > 100) {
        // scale out
        let percentsPassed = (100 * passedPx) / elementHeight;
        let temp = (percentsPassed - 100) / 4;
        let scale = 1 - (0.1 * temp) / 100;
        element.style.transform = `scale(${scale})`;

        return;
      }
      let opac = (1 * percentsPassed) / 100;
      let topPx = 600 - (400 * percentsPassed) / 100;
      let scale = 1 + (0.2 - (0.2 * percentsPassed) / 100);

      element.style.opacity = opac;
      element.style.top = `${topPx}px`;
      element.style.transform = `scale(${scale})`;
    }
  } else {
    element.style.opacity = 0;
  }
}

export function zIndexMoving4(element, refCard1Bot) {
  if (!element) {
    return;
  }

  var elementHeight = element.offsetHeight;
  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;

  let startPx = refCard1Bot + elementHeight * 4.5;
  if (startPx < 3000) {
    return;
  }

  if (bottom > startPx) {
    let passedPx = bottom - startPx;
    if (passedPx < elementHeight * 3) {
      // appearence
      let percentsPassed = (100 * passedPx) / elementHeight / 2;
      if (percentsPassed > 100) {
        return;
      }
      let opac = (1 * percentsPassed) / 100;
      let topPx = 800 - (500 * percentsPassed) / 100;
      let scale = 1 + (0.2 - (0.2 * percentsPassed) / 100);

      element.style.opacity = opac;
      element.style.top = `${topPx}px`;
      element.style.transform = `scale(${scale})`;
    }
  } else {
    element.style.opacity = 0;
  }
}

// anim 5 -------------
export function hideTimeLine(element) {
  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;
  var distanceToTop = window.pageYOffset + element.getBoundingClientRect().top;

  if (bottom > distanceToTop + height / 2) {
    element.style.opacity = 1;
  } else {
    element.style.opacity = 0;
  }
}

// anim 6 -------------
export function zoomBubble(bub1, bub2, bub3, width) {
  // get center of the screen
  if (!bub1 || !bub2 || !bub3 || width > 815) return;

  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;
  let centerS = bottom - height / 2;
  var dt1 = window.pageYOffset + bub1.getBoundingClientRect().top;
  var dt2 = window.pageYOffset + bub2.getBoundingClientRect().top;
  var dt3 = window.pageYOffset + bub3.getBoundingClientRect().top;

  let dt3H = bub3.offsetHeight;

  if (centerS > dt1 && centerS < dt2) {
    bub1.classList.add("steps-centered");
  } else {
    bub1.classList.remove("steps-centered");
  }

  if (centerS > dt2 && centerS < dt3) {
    bub2.classList.add("steps-centered");
  } else {
    bub2.classList.remove("steps-centered");
  }

  if (centerS > dt3 && centerS < dt3 + dt3H) {
    bub3.classList.add("steps-centered");
  } else {
    bub3.classList.remove("steps-centered");
  }
}

// anim 7 -------------
export function zoomBubble2(bub1, bub2, bub3, bub4, width) {
  // get center of the screen
  if (!bub1 || !bub2 || !bub3 || !bub4 || width > 815) return;

  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;
  let centerS = bottom - height / 2;
  var dt1 = window.pageYOffset + bub1.getBoundingClientRect().top;
  var dt2 = window.pageYOffset + bub2.getBoundingClientRect().top;
  var dt3 = window.pageYOffset + bub3.getBoundingClientRect().top;
  var dt4 = window.pageYOffset + bub4.getBoundingClientRect().top;

  let dt4H = bub4.offsetHeight;

  if (centerS > dt1 && centerS < dt2) {
    bub1.classList.add("point-card-centered");
  } else {
    bub1.classList.remove("point-card-centered");
  }

  if (centerS > dt2 && centerS < dt3) {
    bub2.classList.add("point-card-centered");
  } else {
    bub2.classList.remove("point-card-centered");
  }

  if (centerS > dt3 && centerS < dt4) {
    bub3.classList.add("point-card-centered");
  } else {
    bub3.classList.remove("point-card-centered");
  }

  if (centerS > dt4 && centerS < dt4 + dt4H) {
    bub4.classList.add("point-card-centered");
  } else {
    bub4.classList.remove("point-card-centered");
  }
}

// anim 8 -------------
export function fadeInCard(bub1, bub2, bub3, bub4, width) {
  // get center of the screen
  if (!bub1 || !bub2 || !bub3 || !bub4 || width > 815) return;

  var scrollTop = document.documentElement.scrollTop;
  let height = window.innerHeight;
  let bottom = scrollTop + height;

  var dt1 = window.pageYOffset + bub1.getBoundingClientRect().top;
  var dt2 = window.pageYOffset + bub2.getBoundingClientRect().top;
  var dt3 = window.pageYOffset + bub3.getBoundingClientRect().top;
  var dt4 = window.pageYOffset + bub4.getBoundingClientRect().top;

  if (bottom > dt1 && bub1.style.opacity !== 1) {
    bub1.style.opacity = 1;
  } else if (bottom < dt1) {
    bub1.style.opacity = 0;
  }

  if (bottom > dt2 && bub2.style.opacity !== 1) {
    bub2.style.opacity = 1;
  } else if (bottom < dt1) {
    bub2.style.opacity = 0;
  }
  if (bottom > dt3 && bub3.style.opacity !== 1) {
    bub3.style.opacity = 1;
  } else if (bottom < dt1) {
    bub3.style.opacity = 0;
  }
  if (bottom > dt4 && bub4.style.opacity !== 1) {
    bub4.style.opacity = 1;
  } else if (bottom < dt1) {
    bub4.style.opacity = 0;
  }
}

export function scrollHandler4(card1Bot, refCard1Bot, width) {
  bordersOutOnScroll(document.getElementById("slide1-bg"), width);

  zoomIn(document.getElementById("bonus"));
  zoomIn(document.getElementById("slide2-first"));
  zoomIn(document.getElementById("slide2-second"));
  zoomIn(document.getElementById("roi"));

  zoomBubble(
    document.getElementById("bub1"),
    document.getElementById("bub2"),
    document.getElementById("bub3"),
    width
  );

  zoomBubble2(
    document.getElementById("point1"),
    document.getElementById("point2"),
    document.getElementById("point3"),
    document.getElementById("point4"),
    width
  );

  fadeInCard(
    document.getElementById("ref-card-1-2"),
    document.getElementById("ref-card-2-2"),
    document.getElementById("ref-card-3-2"),
    document.getElementById("ref-card-4-2"),
    width
  );

  hideTimeLine(document.getElementById("timel"));

  if (width < 815) {
    return;
  }

  translateX1(document.getElementById("card1"), card1Bot);
  translateX2(document.getElementById("card2"), card1Bot);
  translateX3(document.getElementById("card3"), card1Bot);

  zIndexMoving1(document.getElementById("ref-card1"), refCard1Bot);
  zIndexMoving2(document.getElementById("ref-card2"), refCard1Bot);
  zIndexMoving3(document.getElementById("ref-card3"), refCard1Bot);
  zIndexMoving4(document.getElementById("ref-card4"), refCard1Bot);
}
