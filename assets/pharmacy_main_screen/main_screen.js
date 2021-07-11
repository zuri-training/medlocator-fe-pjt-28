window.onload = () => {
const pharm_name = document.getElementById("pharmacy_name");
const pharm_phone = document.getElementById("pharmacy_phone");
const store = JSON.parse(sessionStorage.getItem("store"));
pharm_name.innerText = store.store.name;
pharm_phone.innerText = store.store.contact.phone || "N/A";}