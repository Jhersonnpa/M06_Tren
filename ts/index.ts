let users:any []= [];
let tren:any []=[];
let carts:any []=[];
let modal:any = document.getElementById("modal");

function login(e: Event): void {
    e.preventDefault();
    let username:any = document.getElementById("username");
    let password:any = document.getElementById("password");

    users.map((user) => {
        if (user.username == username.value && user.password == password.value) {
            localStorage.setItem("logged", JSON.stringify(username.value));
            window.location.href="./pages/home.html";
        } 
    });
    modal.click()
    let infoModal:any = document.getElementById("info-modal");
    infoModal.innerText = "Credenciales incorrectas";
}

function register(e: Event): void {
    e.preventDefault();
    let ok:boolean = true;
    
    let username:any = document.getElementById("username");
    let password:any = document.getElementById("password");
    let cPassword:any = document.getElementById("cPassword");

    users.map((user) => {
        if (user.username == username.value) ok = false; 
    })

    if (password.value == cPassword.value && ok) {
        users.push({username: username.value, password: password.value});
        carts.push({owner: username.value, items: []});
        localStorage.setItem("users",JSON.stringify(users));
        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("logged", JSON.stringify(username.value));
        modal.click();
        let closeModal: any = document.getElementById("my-modal-6");
        closeModal.addEventListener("change",() => window.location.href = "./home.html")
    }
    else {
        modal.click();
        let infoModal:any = document.getElementById("info-modal");
        infoModal.innerText = "El usuario ya existe o las contraseñas no coinciden";
    }
}

function logout() {
    localStorage.setItem("logged","");
}

function verifyLogged() {
    if (!localStorage.getItem("logged")) return;
    if (localStorage.getItem("logged") != ""){
        if (document.title == "Login") window.location.href = "./pages/home.html";
        if (document.title == "Register") window.location.href = "./home.html";
        let username:any = document.getElementById("username");
        username.innerText = JSON.parse(localStorage.getItem("logged"));
    }
    else {
        if (document.title != "Login" && document.title != "Register") window.location.href = "../index.html";
    }
}

function inicializarTren() {
    for (let i = 0; i < 10; i++) {
        let array:any[] = [];
        tren[i] = array;
        for (let j = 0; j < 20; j++) {
            tren[i][j]="1";
        }
    }
    localStorage.setItem("tren", JSON.stringify(tren));
}

if (localStorage.getItem("users")) {
    let storage:any = localStorage.getItem("users");
    users = JSON.parse(storage);  
}
if (localStorage.getItem("carts")) {
    let storage:any = localStorage.getItem("carts");
    carts = JSON.parse(storage);  
}
if (localStorage.getItem("tren")) {
    let storage:any = localStorage.getItem("tren");
    tren = JSON.parse(storage);
}else {
    inicializarTren();
}