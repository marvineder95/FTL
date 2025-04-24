document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("kontaktFormular");
    const successMessage = document.getElementById("successMessage");
    const nachricht = document.getElementById("nachricht");
    const zeichenAnzeige = document.getElementById("zeichenAnzeige");
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        });
    });

    document.addEventListener('click', function (event) {
        const isClickInside = navbarCollapse.contains(event.target) || event.target.classList.contains('navbar-toggler');
        const isMenuShown = navbarCollapse.classList.contains('show');

        if (!isClickInside && isMenuShown) {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) {
                bsCollapse.hide();
            }
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const honeypot = form.querySelector('[name="company"]');
        if (honeypot.value) {

            console.warn("Spamverdacht – Formular nicht gesendet.");
            return;
        }
    });

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        emailjs.sendForm(
            "service_4abfind",
            "template_yqtz30q",
            form
        ).then(
            function (response) {
                successMessage.classList.remove("d-none");
                form.reset();

                setTimeout(() => {
                    successMessage.classList.add("d-none");
                }, 5000); // Versteckt das Banner nach 5 Sekunden
            },
            function (error) {
                alert("Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut.");
                console.error("EmailJS Fehler:", error);
            }
        );
    });

    nachricht.addEventListener("input", function () {
        const aktuelleLaenge = nachricht.value.length;
        zeichenAnzeige.textContent = `${aktuelleLaenge} / 500 Zeichen`;
    });
});