let users: any[] = [];
let tren: any[] = [];
let carts: any[] = [];
let userCart: number;
let precio: number = 0;
let modal: any = document.getElementById("modal");

function login(e: Event): void {
    e.preventDefault();
    let username: any = document.getElementById("username");
    let password: any = document.getElementById("password");

    users.map((user) => {
        if (user.username == username.value && user.password == password.value) {
            localStorage.setItem("logged", username.value);
            window.location.href = "./pages/home.html";
        }
    });
    modal.click()
    let infoModal: any = document.getElementById("info-modal");
    infoModal.innerText = "Credenciales incorrectas";
}

function register(e: Event): void {
    e.preventDefault();
    let ok: boolean = true;

    let username: any = document.getElementById("username");
    let password: any = document.getElementById("password");
    let cPassword: any = document.getElementById("cPassword");

    users.map((user) => {
        if (user.username == username.value) ok = false;
    })

    if (password.value == cPassword.value && ok) {
        users.push({ username: username.value, password: password.value });
        carts.push({ owner: username.value, items: { basic: [], vip: [], vagones: [] } });
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("logged", username.value);
        modal.click();
        let closeModal: any = document.getElementById("my-modal-6");
        closeModal.addEventListener("change", () => window.location.href = "./home.html")
    }
    else {
        modal.click();
        let infoModal: any = document.getElementById("info-modal");
        infoModal.innerText = "El usuario ya existe o las contraseñas no coinciden";
    }
}

function logout() {
    localStorage.setItem("logged", "");
}

function verifyLogged() {
    if (!localStorage.getItem("logged")) return;
    if (localStorage.getItem("logged") != "") {
        if (document.title == "Login") window.location.href = "./pages/home.html";
        if (document.title == "Register") window.location.href = "./home.html";
        let username: any = document.getElementById("username");
        username.innerText = localStorage.getItem("logged");
        carts.map((cart, i) => {
            if (cart.owner == localStorage.getItem("logged")) {
                userCart = i;
            }
        });
        console.log(carts[userCart]);
    }
    else {
        if (document.title != "Login" && document.title != "Register") window.location.href = "../index.html";
    }
}

function printarTren() {
    let storageVip: any = localStorage.getItem("vip");
    let vip: any = document.getElementById("vip");
    let precioInfo: any = document.getElementById("precio");
    let trenDiv: any = document.getElementById("tren");
    let info: any = '';
    if (storageVip == "false") {
        precio = 60;
        precioInfo.innerText = '60';
        vip.innerText = 'Basico';
        for (let i = 2; i < 10; i++) {
            info += `<span class='font-medium text-2xl text-center'>Vagon ${i + 1}</span>`;
            info += `<div id="vagon${i}" class="w-full h-full p-2 gap-5 bg-contain grid grid-cols-10 border-solid border-2 mx-auto items-center shadow-xl">`;

            for (let j = 0; j < tren[i].length; j++) {
                info += `<div>`;
                if (tren[i][j] == "1") {
                    info += `<p class='text-center'>${j + 1}</p>`;
                    info += `<img src="../img/chairOK.png" alt="chairDisponible" class='cursor-pointer' id='${i}${j}' onclick='clickChair(${i},${j})'>`;
                }
                if (tren[i][j] == "2") {
                    info += `<p class='text-center'>${j + 1}</p>`;
                    info += `<img src="../img/chairReserved.png" alt="chairReservada" class='cursor-pointer' id='${i}${j}' onclick='clickChair(${i},${j})'>`;
                }
                if (tren[i][j] == "0") {
                    info += `<p class='text-center'>${j + 1}</p>`;
                    info += `<img src="../img/chairDisabled.png" alt="chairOcupada" class='cursor-pointer'>`;
                }

                info += `</div>`;
            }
            info += "</div>";
        }
        trenDiv.innerHTML = info;
    }
    else {
        precio = 120;
        precioInfo.innerText = '120';
        vip.innerHTML = 'VIP  <i class="bx bxs-crown text-yellow-600"></i>';
        for (let i = 0; i < 2; i++) {
            info += `<span class='font-medium text-2xl text-center'>Vagon ${i + 1}</span>`;
            info += `<div id="vagon${i}" class="w-full h-full p-2 gap-5 bg-contain grid grid-cols-10 border-solid border-2 mx-auto items-center shadow-xl">`;

            for (let j = 0; j < tren[i].length; j++) {
                info += `<div>`;
                if (tren[i][j] == "1") {
                    info += `<p class='text-center'>${j + 1}</p>`;
                    info += `<img src="../img/chairOK.png" alt="chairDisponible" class='cursor-pointer' id='${i}${j}' onclick='clickChair(${i},${j})'>`;
                }
                if (tren[i][j] == "2") {
                    info += `<p class='text-center'>${j + 1}</p>`;
                    info += `<img src="../img/chairReserved.png" alt="chairReservada" class='cursor-pointer' id='${i}${j}' onclick='clickChair(${i},${j})'>`;
                }
                if (tren[i][j] == "0") {
                    info += `<p class='text-center'>${j + 1}</p>`;
                    info += `<img src="../img/chairDisabled.png" alt="chairOcupada" class='cursor-pointer'>`;
                }
                info += `</div>`;
            }
            info += "</div>";
        }
        trenDiv.innerHTML = info;
    }
}

function printarFactura() {
    let vipsI = carts[userCart].items.vip.map((item: any) => item.i);
    let basicsI = carts[userCart].items.basic.map((item: any) => item.i);
    let vips = carts[userCart].items.vip;
    let basics = carts[userCart].items.basic;
    let data = basicsI.concat(vipsI);
    let vagones = data.filter((item, index) => {
        return data.indexOf(item) == index;
    });
    // Factura Div
    let facturaDiv: any = document.getElementById("factura");
    let info: any = '';
    for (let i = 0; i < vagones.length; i++) {
        info += `<div class='bg-slate-200 p-2 rounded'>`;
        ((i == 0) || (i == 1)) ? info += `<p class='text-xl font-medium'>Vagon ${i + 1} <i class="bx bxs-crown text-yellow-600"></i></p>` : info += `<p class='text-xl font-medium'>Vagon ${i + 1} </p>`;
        info += `<span> Asientos: `;
        vips.map((item) => {
            if (item.i == i) info += `  º${item.j + 1}`;
        });
        basics.map((item) => {
            if (item.i == i) info += `  º${item.j + 1}`;
        });
        info += '</span>'
        info += `</div>`;
        info += '<div class="divider"></div>';
    }
    facturaDiv.innerHTML = info;

    let totalFactura: any = document.getElementById("total-factura");
    totalFactura.innerText = `${(basics.length * 60) + (vips.length * 120)}`;
    carts[userCart].items.vip = [];
    carts[userCart].items.basic = [];
    localStorage.setItem("carts", JSON.stringify(carts));
}

function inicializarTren() {
    for (let i = 0; i < 10; i++) {
        let array: any[] = [];
        tren[i] = array;
        for (let j = 0; j < 20; j++) {
            tren[i][j] = "1";
        }
    }
    localStorage.setItem("tren", JSON.stringify(tren));
}

function clickChair(i: number, j: number) {
    let chair: any = document.getElementById(`${i}${j}`);

    if (tren[i][j] == "1") {
        chair.src = "../img/chairReserved.png";
        chair.alt = "reservada";
        tren[i][j] = "2";
        if (localStorage.getItem("vip") == "true") {
            carts[userCart].items.vip.push({ i, j });
        } else {
            carts[userCart].items.basic.push({ i, j });
        }

        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("tren", JSON.stringify(tren));
        return actualizarCarro();
    }
    if (tren[i][j] == "2") {
        chair.src = "../img/chairOK.png";
        chair.alt = "disponible";
        tren[i][j] = "1";

        if (localStorage.getItem("vip") == "true") {
            let items = carts[userCart].items.vip;
            carts[userCart].items.vip = items.filter((item: any) => {
                if ((item.i != i) || (item.j != j)) {
                    return item;
                }
            });
        } else {
            let items = carts[userCart].items.basic;
            carts[userCart].items.basic = items.filter((item: any) => {
                if ((item.i != i) || (item.j != j)) {
                    return item;
                }
            });
        }
        localStorage.setItem("carts", JSON.stringify(carts));
        localStorage.setItem("tren", JSON.stringify(tren));
        return actualizarCarro();
    }
}

function actualizarCarro() {
    let items: any = document.getElementById("items");
    let infoItems: any = document.getElementById("infoItems");
    let total: any = document.getElementById("total");
    let vipsSpan: any = document.getElementById("vips");
    let basicsSpan: any = document.getElementById("basics");
    let basics: any = carts[userCart].items.basic;
    let vips: any = carts[userCart].items.vip;
    items.innerText = basics.length + vips.length;
    infoItems.innerText = basics.length + vips.length;
    vips.length ? vipsSpan.innerText = `${vips.length} Vips x 120€ = ${vips.length * 120}€` : '';
    basics.length ? basicsSpan.innerText = `${basics.length} Basicos x 60€ = ${basics.length * 60}€` : '';
    total.innerText = `${(basics.length * 60) + (vips.length * 120)}`;
}

function pagar() {
    let basics = carts[userCart].items.basic;
    let vips = carts[userCart].items.vip;
    if ((basics.length == 0) && (vips.length == 0)) {
        let infoModal: any = document.getElementById("info-modal");
        infoModal.innerText = "No tienes asientos reservados.";
        return modal.click();
    }

    if (basics.length > 0) {
        basics.map((item: any) => {
            console.log("basics shop");
            tren[item.i][item.j] = '0';
        });
    }
    if (vips.length > 0) {
        vips.map((item: any) => {
            console.log("vips shop");
            tren[item.i][item.j] = '0';
        });
    }
    localStorage.setItem("tren", JSON.stringify(tren));
    return window.location.href = './factura.html';
}

if (localStorage.getItem("users")) {
    let storage: any = localStorage.getItem("users");
    users = JSON.parse(storage);
}
if (localStorage.getItem("carts")) {
    let storage: any = localStorage.getItem("carts");
    carts = JSON.parse(storage);
}
if (localStorage.getItem("tren")) {
    let storage: any = localStorage.getItem("tren");
    tren = JSON.parse(storage);
} else {
    inicializarTren();
}