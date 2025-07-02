// M   M  AAAAA  X   X  L      W   W  AAAAA  RRRR   EEEEE
// MM MM  A   A   X X   L      W   W  A   A  R   R  E
// M M M  AAAAA    X    L      W W W  AAAAA  RRRR   EEE
// M   M  A   A   X X   L      WW WW  A   A  R  R   E
// M   M  A   A  X   X  LLLLL  W   W  A   A  R   R  EEEEE

async function checkIPLocation() {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();

        if (data.country_code !== "FR") {
          window.location.href = "en.html";
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'IP :", error);
      }
    }

    window.onload = checkIPLocation;
