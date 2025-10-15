        const TARGET_DATE = new Date('2025-10-19T13:00:00').getTime();

        function formatTargetDate(date) {
            return date.toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        function updateCountdown() {
            const now = new Date().getTime();
            const distance = TARGET_DATE - now;

            document.getElementById('targetDateDisplay').textContent = 
                `Se termine le ${formatTargetDate(new Date(TARGET_DATE))}`;

            if (distance < 0) {
                document.getElementById('countdownActive').style.display = 'none';
                document.getElementById('countdownExpired').style.display = 'block';
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(2, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }

        function showPopup() {
            const popup = document.getElementById('popup');
            popup.style.display = 'flex';
            
            updateCountdown();
            
            setInterval(updateCountdown, 1000);
        }

        function closePopup() {
            const popup = document.getElementById('popup');
            popup.style.display = 'none';
        }

        window.addEventListener('load', function() {
            setTimeout(showPopup, 1000);
        });

        document.getElementById('popup').addEventListener('click', function(e) {
            if (e.target === this) {
                closePopup();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closePopup();
            }
        });