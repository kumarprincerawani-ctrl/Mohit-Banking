/* =========================================================
   MOHIT BANKING
   COMPLETE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE SIDEBAR
    ===================================================== */

    const sidebar = document.querySelector(".sidebar");

    if (sidebar) {

        const dashboardMain =
            document.querySelector(".dashboard-main");

        // Mobile menu button
        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-button";
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-label", "Open menu");

        document.body.appendChild(menuButton);

        menuButton.addEventListener("click", function () {

            sidebar.classList.toggle("mobile-sidebar");

        });


        // Close sidebar when clicking a link on mobile
        const sideLinks =
            sidebar.querySelectorAll("a");

        sideLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                sidebar.classList.remove(
                    "mobile-sidebar"
                );

            });

        });

    }


    /* =====================================================
       NOTIFICATION BUTTON
    ===================================================== */

    const notification =
        document.querySelector(".notification");

    if (notification) {

        notification.addEventListener("click", function () {

            alert(
                "You have no new notifications."
            );

        });

    }


    /* =====================================================
       DEMO SUPPORT BUTTON
    ===================================================== */

    const supportButton =
        document.querySelector(".help-card button");

    if (supportButton) {

        supportButton.addEventListener(
            "click",
            function () {

                alert(
                    "Mohit Banking Demo Support\n\n" +
                    "This is a demo website. " +
                    "Support chat is not connected yet."
                );

            }
        );

    }


    /* =====================================================
       PASSWORD SHOW / HIDE
    ===================================================== */

    const passwordInputs =
        document.querySelectorAll(
            'input[type="password"]'
        );

    passwordInputs.forEach(function (input) {

        const wrapper = input.parentElement;

        if (!wrapper) {
            return;
        }

        wrapper.style.position = "relative";

        const toggle =
            document.createElement("button");

        toggle.type = "button";

        toggle.innerHTML = "👁";

        toggle.style.position = "absolute";
        toggle.style.right = "10px";
        toggle.style.bottom = "10px";
        toggle.style.border = "none";
        toggle.style.background = "transparent";
        toggle.style.cursor = "pointer";

        wrapper.appendChild(toggle);

        toggle.addEventListener(
            "click",
            function () {

                if (input.type === "password") {

                    input.type = "text";
                    toggle.innerHTML = "🙈";

                } else {

                    input.type = "password";
                    toggle.innerHTML = "👁";

                }

            }
        );

    });


    /* =====================================================
       REGISTER PASSWORD CHECK
    ===================================================== */

    const registerForm =
        document.querySelector(
            'form[action*="register"]'
        );

    if (registerForm) {

        registerForm.addEventListener(
            "submit",
            function (event) {

                const password =
                    registerForm.querySelector(
                        'input[name="password"]'
                    );

                const confirmPassword =
                    registerForm.querySelector(
                        'input[name="confirm_password"]'
                    );

                if (
                    password &&
                    confirmPassword &&
                    password.value !==
                    confirmPassword.value
                ) {

                    event.preventDefault();

                    alert(
                        "Passwords do not match."
                    );

                    confirmPassword.focus();

                }

            }
        );

    }


    /* =====================================================
       TRANSFER FORM CONFIRMATION
    ===================================================== */

    const transferForm =
        document.querySelector(
            'form[method="POST"]'
        );

    if (
        transferForm &&
        window.location.pathname.includes("transfer")
    ) {

        transferForm.addEventListener(
            "submit",
            function (event) {

                const recipient =
                    transferForm.querySelector(
                        'input[name="recipient"]'
                    );

                const amount =
                    transferForm.querySelector(
                        'input[name="amount"]'
                    );

                if (!recipient || !amount) {
                    return;
                }

                const amountValue =
                    parseFloat(amount.value);

                if (
                    !recipient.value.trim() ||
                    isNaN(amountValue) ||
                    amountValue <= 0
                ) {

                    event.preventDefault();

                    alert(
                        "Please enter valid transfer details."
                    );

                    return;

                }

                const confirmed =
                    confirm(
                        "Demo Transfer\n\n" +
                        "Recipient: " +
                        recipient.value +
                        "\nAmount: ₹" +
                        amountValue.toFixed(2) +
                        "\n\nContinue?"
                    );

                if (!confirmed) {

                    event.preventDefault();

                }

            }
        );

    }


    /* =====================================================
       AMOUNT INPUT
    ===================================================== */

    const amountInputs =
        document.querySelectorAll(
            'input[name="amount"]'
        );

    amountInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                if (parseFloat(input.value) < 0) {

                    input.value = "";

                }

            }
        );

    });


    /* =====================================================
       SETTINGS CHECKBOXES
    ===================================================== */

    const settingsCheckboxes =
        document.querySelectorAll(
            'input[type="checkbox"]'
        );

    settingsCheckboxes.forEach(function (checkbox) {

        checkbox.addEventListener(
            "change",
            function () {

                if (checkbox.checked) {

                    console.log(
                        "Demo setting enabled"
                    );

                } else {

                    console.log(
                        "Demo setting disabled"
                    );

                }

            }
        );

    });


    /* =====================================================
       ADMIN VIEW BUTTONS
    ===================================================== */

    const viewButtons =
        document.querySelectorAll(".view-btn");

    viewButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const row =
                    button.closest("tr");

                if (!row) {
                    return;
                }

                const userName =
                    row.querySelector(
                        ".table-user strong"
                    );

                if (userName) {

                    alert(
                        "Demo User\n\n" +
                        "Name: " +
                        userName.textContent.trim()
                    );

                }

            }
        );

    });


    /* =====================================================
       SIMPLE PAGE FADE-IN
    ===================================================== */

    document.body.style.opacity = "0";

    setTimeout(function () {

        document.body.style.transition =
            "opacity 0.3s ease";

        document.body.style.opacity = "1";

    }, 50);


    /* =====================================================
       CURRENT YEAR
    ===================================================== */

    const yearElements =
        document.querySelectorAll(
            ".current-year"
        );

    yearElements.forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });

});