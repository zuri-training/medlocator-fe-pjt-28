// TOGGLE MENU

const menu = document.querySelector(".menu-list");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");

menuBtn.onclick = ()=> {
    menu.classList.add("active");
    menuBtn.classList.add("hide");
}

cancelBtn.onclick = ()=> {
    menu.classList.remove("active");
    menuBtn.classList.remove("hide");
}

// CLOSE THE NAV WHEN NAVLNKS ARE CLICKED
let navLinks = document.querySelectorAll('.nav-list a');

navLinks.forEach(function (navLink) {
    navLink.addEventListener('click', function () {
    myList.classList.remove('show');
    })
})