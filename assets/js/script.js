// STICKY NAVIGATION 
let nav = document.querySelector(".navbar");
let val;
window.onscroll = function() {
    if(document.documentElement.scrollTop > 20) {
        nav.classList.add("sticky")
    }else {
        nav.classList.remove("sticky")
    }
}