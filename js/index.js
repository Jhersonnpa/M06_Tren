"use strict";
let users = [];
let tren = [];
let carts = [];
let modal = document.getElementById("modal");
function login(e) {
    e.preventDefault();
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    users.map((user) => {
        if (user.username == username.value && user.password == password.value) {
            localStorage.setItem("logged", JSON.stringify(username.value));
            window.location.href = "./pages/home.html";
        }
    });
    modal.click();
    let infoModal = document.getElementById("info-modal");
    infoModal.innerText = "Credenciales incorrectas";
}
function register(e) {
    e.preventDefault();
    let ok = true;
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let cPassword = document.getElementById("cPassword");
    users.map((user) => {
        if (user.username == username.value)
            ok = false;
    });
    if (password.value == cPassword.value && ok) {
        users.push({ username: username.value, password: password.value });
        carts.push({ owner: username.value, items: [] });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("logged", JSON.stringify(username.value));
        modal.click();
        let closeModal = document.getElementById("my-modal-6");
        closeModal.addEventListener("change", () => window.location.href = "./home.html");
    }
    else {
        modal.click();
        let infoModal = document.getElementById("info-modal");
        infoModal.innerText = "El usuario ya existe o las contraseñas no coinciden";
    }
}
function logout() {
    localStorage.setItem("logged", "");
}
function verifyLogged() {
    if (!localStorage.getItem("logged"))
        return;
    if (localStorage.getItem("logged") != "") {
        if (document.title == "Login")
            window.location.href = "./pages/home.html";
        if (document.title == "Register")
            window.location.href = "./home.html";
        let username = document.getElementById("username");
        username.innerText = JSON.parse(localStorage.getItem("logged"));
    }
    else {
        if (document.title != "Login" && document.title != "Register")
            window.location.href = "../index.html";
    }
}
function inicializarTren() {
    for (let i = 0; i < 10; i++) {
        let array = [];
        tren[i] = array;
        for (let j = 0; j < 20; j++) {
            tren[i][j] = "1";
        }
    }
    localStorage.setItem("tren", JSON.stringify(tren));
}
if (localStorage.getItem("users")) {
    let storage = localStorage.getItem("users");
    users = JSON.parse(storage);
}
if (localStorage.getItem("carts")) {
    let storage = localStorage.getItem("carts");
    carts = JSON.parse(storage);
}
if (localStorage.getItem("tren")) {
    let storage = localStorage.getItem("tren");
    tren = JSON.parse(storage);
}
else {
    inicializarTren();
}
