const userStorageKey = "harbor-parts-co-user";
const legacyUserStorageKey = "lumacart-user";
const loginForm = document.getElementById("loginForm");
const loginName = document.getElementById("loginName");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");
const loginMessage = document.getElementById("loginMessage");
const sessionName = document.getElementById("sessionName");
const sessionEmail = document.getElementById("sessionEmail");
const sessionStatus = document.getElementById("sessionStatus");
const logoutButton = document.getElementById("logoutButton");
const loginAccountStatus = document.getElementById("loginAccountStatus");

function safeStorage() {
    try {
        return typeof localStorage === "undefined" ? null : localStorage;
    } catch {
        return null;
    }
}

function sanitizePlainText(value) {
    return String(value).replace(/[<>&]/g, "").trim();
}

function setLoginMessage(message, state = "") {
    loginMessage.textContent = message;
    loginMessage.className = `auth-message${state ? ` ${state}` : ""}`;
}

function readStoredUser() {
    const storage = safeStorage();
    if (!storage) {
        return null;
    }

    try {
        const value = storage.getItem(userStorageKey);
        if (value) {
            return JSON.parse(value);
        }

        const legacyValue = storage.getItem(legacyUserStorageKey);
        if (legacyValue) {
            storage.setItem(userStorageKey, legacyValue);
            storage.removeItem(legacyUserStorageKey);
            return JSON.parse(legacyValue);
        }

        return null;
    } catch {
        return null;
    }
}

function writeStoredUser(user) {
    const storage = safeStorage();
    if (!storage) {
        return;
    }

    storage.setItem(userStorageKey, JSON.stringify(user));
    storage.removeItem(legacyUserStorageKey);
}

function clearStoredUser() {
    const storage = safeStorage();
    if (!storage) {
        return;
    }

    storage.removeItem(userStorageKey);
    storage.removeItem(legacyUserStorageKey);
}

function renderUser() {
    const user = readStoredUser();
    if (!user || !user.email) {
        sessionName.textContent = "Guest shopper";
        sessionEmail.textContent = "No email saved";
        sessionStatus.textContent = "Sign in to link checkout details to your account.";
        loginAccountStatus.textContent = "Guest";
        logoutButton.disabled = true;
        return;
    }

    const name = sanitizePlainText(user.name || "") || user.email.split("@")[0];
    sessionName.textContent = name;
    sessionEmail.textContent = user.email;
    sessionStatus.textContent = "Signed in and ready to use saved account details in checkout.";
    loginAccountStatus.textContent = `Hi, ${name}`;
    loginName.value = name;
    loginEmail.value = user.email;
    logoutButton.disabled = false;
}

function handleLoginSubmit(event) {
    event.preventDefault();

    const email = loginEmail.value.trim();
    const password = loginPassword.value.trim();
    const name = sanitizePlainText(loginName.value) || email.split("@")[0];

    if (!email || !password) {
        setLoginMessage("Enter both email and password to sign in.", "error");
        return;
    }

    writeStoredUser({ name, email });
    loginPassword.value = "";
    setLoginMessage("Signed in successfully. Redirecting you to the boat-parts catalog.", "success");
    renderUser();

    if (typeof window !== "undefined" && window.location) {
        window.setTimeout(() => {
            window.location.href = "/index.html";
        }, 700);
    }
}

function handleLogout() {
    clearStoredUser();
    loginForm.reset();
    setLoginMessage("Signed out of the demo account.", "success");
    renderUser();
}

loginForm.addEventListener("submit", handleLoginSubmit);
logoutButton.addEventListener("click", handleLogout);
loginForm.addEventListener("input", () => setLoginMessage(""));
renderUser();
