document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("kontaktFormular");
    const successMessage = document.getElementById("successMessage");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const honeypot = form.querySelector('[name="company"]');
        if (honeypot.value) {
            // Bot detected – don't send the form
            console.warn("Spamverdacht – Formular nicht gesendet.");
            return;
        }

        // ... dein EmailJS-Code
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

    const nachricht = document.getElementById("nachricht");
    const zeichenAnzeige = document.getElementById("zeichenAnzeige");

    nachricht.addEventListener("input", function () {
        const aktuelleLaenge = nachricht.value.length;
        zeichenAnzeige.textContent = `${aktuelleLaenge} / 500 Zeichen`;
    });
});