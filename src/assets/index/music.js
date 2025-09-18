// M   M  AAAAA  X   X  L      W   W  AAAAA  RRRR   EEEEE
// MM MM  A   A   X X   L      W   W  A   A  R   R  E
// M M M  AAAAA    X    L      W W W  AAAAA  RRRR   EEE
// M   M  A   A   X X   L      WW WW  A   A  R  R   E
// M   M  A   A  X   X  LLLLL  W   W  A   A  R   R  EEEEE

const clickSound = document.getElementById('click-sound');
    let lastClickTime = 0;
    const maxDelay = 500;

    document.addEventListener('click', () => {
      const now = Date.now();
      if (now - lastClickTime <= maxDelay) {
        clickSound.currentTime = 0;
        clickSound.play();
      }
      lastClickTime = now;
    });
