// M   M  AAAAA  X   X  L      W   W  AAAAA  RRRR   EEEEE
// MM MM  A   A   X X   L      W   W  A   A  R   R  E
// M M M  AAAAA    X    L      W W W  AAAAA  RRRR   EEE
// M   M  A   A   X X   L      WW WW  A   A  R  R   E
// M   M  A   A  X   X  LLLLL  W   W  A   A  R   R  EEEEE

document.addEventListener('DOMContentLoaded', function() {
      const elements = document.querySelectorAll('.typewriter');
      elements.forEach(el => {
        const text = el.textContent;
        let i = 0;
        el.textContent = '';
        const typing = setInterval(function() {
          if (i < text.length) {
            el.textContent += text.charAt(i);
            i++;
          } else {
            clearInterval(typing);
          }
        }, 100);
      });
    });

  const partenaires = [
    { logo: "assets/logo_iptron.png", lien: "https://iptron.xyz" },
    { logo: "assets/logo_cloud.png", lien: "https://cryptdev.fr" },
    { logo: "assets/logo_mxlw_dev.png" , lien: "https://dev.maxlware.fr" }
  ];

  const img = document.querySelector(".diapo img");
  const lien = document.querySelector(".diapo a");
  let index = 0;

  function nextLogo() {
    index = (index + 1) % partenaires.length;
    img.style.opacity = "0";
    setTimeout(() => {
      img.src = partenaires[index].logo;
      lien.href = partenaires[index].lien;
      img.style.opacity = "1";
    }, 400);
  }

  setInterval(nextLogo, 3000);


(() => {
  const secret = ['a', 'd', 'a', 'm'];
  let pos = 0;

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new (AudioContext)();

  function playKeyClick() {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(2400, now);
    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  function activateEasterEgg() {
    document.documentElement.style.setProperty('--dark', '#ff66b2');
    const title = document.querySelector('.title');
    if (title) title.textContent = 'Adam <3';
  }

  window.addEventListener('keydown', async (e) => {
    if (audioCtx.state === 'suspended') await audioCtx.resume();

    const key = e.key.toLowerCase();
    if (key.length !== 1) return;

    playKeyClick();

    if (key === secret[pos]) {
      pos++;
      if (pos === secret.length) {
        activateEasterEgg();
        pos = 0;
      }
    } else {
      pos = 0;
    }
  });
})();
