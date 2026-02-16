(function() {
    const errorMessages = {
      400: "Requête incorrecte.",
      401: "Authentification requise.",
      403: "Accès interdit.",
      404: "Page non trouvée.",
      408: "Délai d'attente dépassé.",
      429: "Trop de requêtes.",
      500: "Erreur interne du serveur.",
      502: "Passerelle incorrecte.",
      503: "Service indisponible.",
      504: "Délai d'attente de la passerelle.",
      1000: "I'm a cookie"
    };

    function getURLParams() {
      const params = new URLSearchParams(window.location.search);
      const e = params.get('e');
      const p = params.get('p') || '?';
      return { e, p };
    }

    document.addEventListener('DOMContentLoaded', function() {
      const { e, p } = getURLParams();
      const errorCode = parseInt(e, 10);
      const finalCode = isNaN(errorCode) ? 404 : errorCode;
      const message = errorMessages[finalCode] || "Une erreur inattendue s'est produite.";

      const boldElement = document.querySelector('p b');
      if (boldElement) {
        boldElement.textContent = finalCode + '.';
      }

      const paragraphs = document.querySelectorAll('p');
      if (paragraphs.length >= 2) {
        const secondP = paragraphs[1];
        secondP.childNodes.forEach(node => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.includes('Loading')) {
            node.textContent = ` ${message} La page « ${p} » n'a pas pu être chargée. `;
          }
        });
      }

      document.title = `Erreur ${finalCode} - Maxlware`;
    });
  })();
