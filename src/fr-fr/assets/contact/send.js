document.addEventListener('DOMContentLoaded', function() {
    const proLink = document.getElementById('proLink');
    const contactGrid = document.getElementById('contactGrid');
    const contactForm = document.getElementById('contactForm');
    const backButton = document.getElementById('backToGrid');
    const form = document.getElementById('proForm');
    const formMessage = document.getElementById('formMessage');
    const subtitle = document.getElementById('subtitle');
    
    const submitBtn = document.getElementById('submitBtn');
    const backBtn = document.getElementById('backToGrid');
    const formActions = document.getElementById('formActions');
    const progressContainer = document.getElementById('progressContainer');

    let isRedirecting = false;

    proLink.addEventListener('click', function(e) {
        e.preventDefault();
        contactGrid.style.display = 'none';
        contactForm.style.display = 'block';
        subtitle.innerHTML = 'Formulaire de contact professionnel<br><a href="https://maxlware.com/fr-fr.html">Retour</a>';
    });

    backButton.addEventListener('click', function() {
        contactForm.style.display = 'none';
        contactGrid.style.display = 'grid';
        subtitle.innerHTML = 'Sélectionnez le canal qui correspond à votre demande.<br><a href="https://maxlware.com/fr-fr.html">Retour</a>';
        form.reset();
        formMessage.style.display = 'none';
        formMessage.className = 'form-message';
        formActions.style.display = 'flex';
        progressContainer.style.display = 'none';
        submitBtn.disabled = false;
        backBtn.disabled = false;
        isRedirecting = false;
    });

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const email = document.getElementById('email').value.trim();
        const objet = document.getElementById('objet').value.trim();
        const contenu = document.getElementById('contenu').value.trim();

        if (!email || !objet || !contenu) {
            showMessage('Tous les champs sont requis.', 'error');
            return;
        }

        formActions.style.display = 'none';
        progressContainer.style.display = 'block';
        submitBtn.disabled = true;
        backBtn.disabled = true;
        formMessage.style.display = 'none';

        try {
            const response = await fetch('https://api.maxlware.com/v1/com/contact/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, objet, contenu })
            });

            const data = await response.json();

            if (response.ok) {
                showMessage('Votre message a été envoyé avec succès. Vous allez recevoir un email de confirmation.', 'success');
                form.reset();
                isRedirecting = true;
                setTimeout(() => {
                    backButton.click();
                }, 3000);
            } else {
                showMessage(data.detail || 'Une erreur est survenue. Veuillez réessayer.', 'error');
                formActions.style.display = 'flex';
                progressContainer.style.display = 'none';
                submitBtn.disabled = false;
                backBtn.disabled = false;
            }
        } catch (error) {
            showMessage('Erreur réseau. Vérifiez votre connexion.', 'error');
            formActions.style.display = 'flex';
            progressContainer.style.display = 'none';
            submitBtn.disabled = false;
            backBtn.disabled = false;
        }
    });

    function showMessage(msg, type) {
        formMessage.textContent = msg;
        formMessage.className = 'form-message ' + type;
        formMessage.style.display = 'block';
    }
});
