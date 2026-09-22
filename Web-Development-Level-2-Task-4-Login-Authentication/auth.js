/* ==========================================
   OASIS INFOBYTE
   Level 2 - Task 4
   Login Authentication System
========================================== */


/* ==========================================
   PASSWORD HASHING
========================================== */

async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    return hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");
}


/* ==========================================
   GET USERS
========================================== */

function getUsers() {

    const users = localStorage.getItem("authUsers");

    return users ? JSON.parse(users) : [];
}


/* ==========================================
   SAVE USERS
========================================== */

function saveUsers(users) {

    localStorage.setItem(
        "authUsers",
        JSON.stringify(users)
    );
}


/* ==========================================
   REGISTER
========================================== */

const registerForm = document.getElementById("register-form");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const username =
            document.getElementById("register-username")
                .value
                .trim();

        const email =
            document.getElementById("register-email")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("register-password")
                .value;

        const message =
            document.getElementById("register-message");


        /* Username validation */

        if (username.length < 3) {

            message.textContent =
                "Username must contain at least 3 characters.";

            message.className = "message error";

            return;
        }


        /* Password validation */

        const passwordPattern =
            /^(?=.*\d).{8,}$/;

        if (!passwordPattern.test(password)) {

            message.textContent =
                "Password must be at least 8 characters and contain at least 1 number.";

            message.className = "message error";

            return;
        }


        /* Get existing users */

        const users = getUsers();


        /* Duplicate email check */

        const existingUser =
            users.find(user => user.email === email);

        if (existingUser) {

            message.textContent =
                "An account with this email already exists.";

            message.className = "message error";

            return;
        }


        /* Hash password */

        const hashedPassword =
            await hashPassword(password);


        /* Create user */

        const newUser = {

            id: Date.now(),

            username: username,

            email: email,

            password: hashedPassword,

            createdAt: new Date().toISOString()

        };


        users.push(newUser);

        saveUsers(users);


        message.textContent =
            "Account created successfully! Redirecting to login...";

        message.className = "message success";


        registerForm.reset();


        setTimeout(function () {

            window.location.href = "index.html";

        }, 1500);

    });
}


/* ==========================================
   LOGIN
========================================== */

const loginForm = document.getElementById("login-form");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const email =
            document.getElementById("login-email")
                .value
                .trim()
                .toLowerCase();

        const password =
            document.getElementById("login-password")
                .value;

        const message =
            document.getElementById("login-message");


        /* Get users */

        const users = getUsers();


        /* Hash entered password */

        const hashedPassword =
            await hashPassword(password);


        /* Find matching user */

        const user = users.find(function (user) {

            return (
                user.email === email &&
                user.password === hashedPassword
            );

        });


        /* Login failed */

        if (!user) {

            message.textContent =
                "Invalid email or password.";

            message.className = "message error";

            return;
        }


        /* Create session */

        const session = {

            id: user.id,

            username: user.username,

            email: user.email,

            loginTime: new Date().toISOString()

        };


        localStorage.setItem(
            "currentUser",
            JSON.stringify(session)
        );


        message.textContent =
            "Login successful! Redirecting...";

        message.className = "message success";


        setTimeout(function () {

            window.location.href = "dashboard.html";

        }, 800);

    });
}


/* ==========================================
   PROTECTED DASHBOARD
========================================== */

if (window.location.pathname.endsWith("dashboard.html")) {

    const currentUser =
        localStorage.getItem("currentUser");


    /* No logged-in user */

    if (!currentUser) {

        window.location.href = "index.html";

    } else {

        const user =
            JSON.parse(currentUser);


        const dashboardUsername =
            document.getElementById("dashboard-username");

        const userName =
            document.getElementById("user-name");

        const userEmail =
            document.getElementById("user-email");


        if (dashboardUsername) {

            dashboardUsername.textContent =
                user.username;
        }


        if (userName) {

            userName.textContent =
                user.username;
        }


        if (userEmail) {

            userEmail.textContent =
                user.email;
        }

    }
}


const logoutButton =
    document.getElementById("logout-btn");

if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        localStorage.removeItem("currentUser");

        window.location.href = "index.html";

    });
}