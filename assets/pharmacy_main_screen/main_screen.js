window.onload = () => {
const store = JSON.parse(sessionStorage.getItem("store"));
if(!store){
    alert("Login required!");
    document.location = "login.html";
}
else{
    const pharm_details = document.getElementById("pharmacy_details");
    const {name, contact} = store;
    if(name && contact){
    pharm_details.innerHTML = `${name} <br> ${contact.phone}`;
    }
    else{
    pharm_details.innerHTML = name;
    }
}

};