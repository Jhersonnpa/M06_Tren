let users:any []= [];

function login(e: Event): void {
    e.preventDefault();
}

function register(e: Event): void {
    e.preventDefault();
    let modal:any = document.getElementById("modal");
    let username:any = document.getElementById("username");
    let password:any = document.getElementById("password");
    let cPassword:any = document.getElementById("cPassword");

    if (password.value == cPassword.value) {
        users.push({username: username.value, password: password.value});
        localStorage.setItem("users",JSON.stringify(users));
        modal.click();
    }
}

if (localStorage.getItem("users")) {
    let usersStorage:any = localStorage.getItem("users");
    users = JSON.parse(usersStorage);
    
}

console.log(users);