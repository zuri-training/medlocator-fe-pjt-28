window.onload = () => {
const pharm_details = document.getElementById("pharmacy_details");
const store = JSON.parse(sessionStorage.getItem("store"));
const {name, contact} = store;
if(name && contact){
    pharm_details.innerHTML = `${name} <br> ${contact.phone}`;
}
else{
    pharm_details.innerHTML = name;
}
};