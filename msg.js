// M   M  AAAAA  X   X  L      W   W  AAAAA  RRRR   EEEEE
// MM MM  A   A   X X   L      W   W  A   A  R   R  E
// M M M  AAAAA    X    L      W W W  AAAAA  RRRR   EEE
// M   M  A   A   X X   L      WW WW  A   A  R  R   E
// M   M  A   A  X   X  LLLLL  W   W  A   A  R   R  EEEEE

const word = "TRAFICOO";
let index = 0;
let direction = 1;
let displayed = "";
let isErasing = false;

function animateConsole() {
  if (!isErasing) {
    displayed += word[index];
    console.clear();
    console.log(displayed);
    index++;

    if (index === word.length) {
      isErasing = true;
      setTimeout(animateConsole, 1000);
      return;
    }
  } else {
    displayed = displayed.slice(0, -1);
    console.clear();
    console.log(displayed);

    if (displayed.length === 0) {
      isErasing = false;
      index = 0;
      setTimeout(animateConsole, 500);
      return;
    }
  }

  setTimeout(animateConsole, 150);
}

animateConsole();
