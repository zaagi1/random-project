/* ==========================================================
   1. SHARED VALIDATION
   ========================================================== */
function isValidName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
}

function isValidPassword(pass) {
    return pass.length >= 6;
}

/* ==========================================================
   2. SIGNUP LOGIC (To Random Picker)
   ========================================================== */
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameInput = document.getElementById('regName');
        const emailInput = document.getElementById('regEmail');
        const passInput = document.getElementById('regPass');

        if (!isValidName(nameInput.value)) {
            alert("Cillad: Magaca waa inuu xarfo kaliya ahaadaa!");
            return;
        }
        if (!isValidPassword(passInput.value)) {
            alert("Cillad: Password-ku waa inuu 6 nambar ka badnaadaa!");
            return;
        }

        const userObj = { fullName: nameInput.value, userEmail: emailInput.value, userPass: passInput.value };
        localStorage.setItem('userAccount', JSON.stringify(userObj));
        alert("Signup waa lagu guulaystay!");
        signupForm.reset();
        window.location.href = "parking.html"; // Redirection to Picker
    });
}

/* ==========================================================
   3. LOGIN LOGIC (To Home Page)
   ========================================================== */
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const emailInput = document.getElementById('logEmail');
        const passInput = document.getElementById('logPass');
        const storedUser = JSON.parse(localStorage.getItem('userAccount'));

        if (storedUser && storedUser.userEmail === emailInput.value && storedUser.userPass === passInput.value) {
            alert("Login Guul ah! Kusoo dhawaaw " + storedUser.fullName);
            loginForm.reset();
            window.location.href = "index.html"; // Redirection to Home
        } else {
            alert("Email ama Password waa khalad!");
        }
    });
}

/* ==========================================================
   4. RANDOM NAME PICKER (Saxa Winner-ka)
   ========================================================== */
let namesArray = [];
const pickerForm = document.getElementById('pickerForm');

if (pickerForm) {
    pickerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const nameInput = document.getElementById('personName');
        const tableBody = document.getElementById('namesBody');

        if (!isValidName(nameInput.value)) {
            alert("Cillad: Geli magac sax ah!");
            return;
        }

        // Ku dar Array-ga
        namesArray.push(nameInput.value);

        // Ku dar Table-ka
        const row = `<tr><td>${namesArray.length}</td><td>${nameInput.value}</td></tr>`;
        tableBody.innerHTML += row;

        // Nadiifi Input-ka
        nameInput.value = "";
    });
}

// SHAQADA PICK WINNER (Hubi inay magacyo jiraan)
function pickWinner() {
    const display = document.getElementById('winnerResult');

    if (namesArray.length === 0) {
        alert("Fadlan marka hore magacyo ku dar liiska!");
        return;
    }

    // Xulashada Bakhtiyaa-nasiibka
    const randomIndex = Math.floor(Math.random() * namesArray.length);
    const winner = namesArray[randomIndex];

    // Soo saarista Winner-ka oo qurxoon
    display.innerHTML = "🏆 Guulaystuhu waa: <span>" + winner + "</span> 🏆";
}

//    5. CONTACT LOGIC (With Validation)
//    ========================================================== */
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameInput = document.getElementById('contactName');
        const emailInput = document.getElementById('contactEmail');
        const messageInput = document.getElementById('contactMessage');

        // Validation
        if (nameInput.value.trim() === "" ||
            emailInput.value.trim() === "" ||
            messageInput.value.trim() === "") {

            alert("Fadlan buuxi dhammaan meelaha bannaan!");
            return;
        }

        // Name validation
        if (!isValidName(nameInput.value)) {
            alert("Magaca waa inuu xarfo kaliya ahaadaa!");
            return;
        }

        alert("Mahadsanid! Fariintaada waa la diray.");
        contactForm.reset();
        window.location.href = "index.html";
    });
}
