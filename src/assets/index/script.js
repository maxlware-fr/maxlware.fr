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
