const pharm_name = document.getElementById("pharmacy_name");
const pharm_phone = document.getElementById("pharmacy_phone");
const store = JSON.parse(sessionStorage.getItem("store"));
pharm_name.innerText = responseData.store.name;
pharm_phone.innerText = responseData.store.contact.phone || "N/A";