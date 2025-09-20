document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const themeToggle = document.getElementById("theme-toggle");
    const body = document.body;

    // Contact form validation
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let request = document.getElementById("request").value.trim();

        if (!name || !phone || !request) {
            alert("Please fill in all fields.");
        } else {
            alert("Form submitted successfully.");
            this.reset();
        }
    });

    // Dark mode toggle
    themeToggle.addEventListener("click", () => {
        body.classList.toggle("dark-mode");

        // optional: change button icon
        if (body.classList.contains("dark-mode")) {
            themeToggle.textContent = "☀️";
        } else {
            themeToggle.textContent = "🌙";
        }
    });
});
