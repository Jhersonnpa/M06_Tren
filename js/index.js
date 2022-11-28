"use strict";
let users = [];
function login(e) {
    e.preventDefault();
}
function register(e) {
    e.preventDefault();
    let modal = document.getElementById("modal");
    let username = document.getElementById("username");
    let password = document.getElementById("password");
    let cPassword = document.getElementById("cPassword");
    if (password.value == cPassword.value) {
        users.push({ username: username.value, password: password.value });
        localStorage.setItem("users", JSON.stringify(users));
        modal.click();
    }
}
if (localStorage.getItem("users")) {
    let usersStorage = localStorage.getItem("users");
    users = JSON.parse(usersStorage);
}
console.log(users);
