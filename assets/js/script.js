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

/**
 * Helper function for POSTing data as JSON with fetch.
 *
 * @param {Object} options
 * @param {string} options.url - URL to POST data to
 * @param {FormData} options.formData - `FormData` instance
 * @return {Object} - Response body from URL that was POSTed to
 */
 async function postFormDataAsJson({ url, formData }) {
	const plainFormData = Object.fromEntries(formData.entries());
	const formDataJsonString = JSON.stringify(plainFormData);

	const fetchOptions = {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
		body: formDataJsonString,
	};

	const response = await fetch(url, fetchOptions);

	if (!response.ok) {
		const errorMessage = await response.text();
		throw new Error(errorMessage);
	}

	return response.json();
}

/**
 * Event handler for a form submit event.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event
 *
 * @param {SubmitEvent} event
 */
async function handleFormSubmit(event) {
	await event.preventDefault();

	const form = event.currentTarget;
	const url = form.action;

	try {
		const formData = new FormData(form);
		const responseData = await postFormDataAsJson({ url, formData });

		if((responseData) && (signUpPage)){
            alert(`Form submitted Successfully! Click Ok to go to the Login Page.
			After verifying your email, you can then log into your Dashboard`);
			responseData => responseData.text();
			console.log(responseData);			
			document.location = "login.html";
        }
		if((responseData) && (loginPage)){
			console.log(responseData);			
			document.location = "main-screen.html";
			const name = document.getElementById("pharmacy_name");
			const phone = document.getElementById("pharmacy_phone");
			name.innerText = responseData.store.name;
			phone.innerText = responseData.store.contact.phone || "N/A";
        }
		if((responseData) && (searchPage)){
			responseData => responseData.text();
			console.log(responseData);
			alert("Success");
		}

		if((responseData) && (resetPage)){
			responseData => responseData.text();
			console.log(responseData);
			document.location = "reset-confirmation.html";
		}

		if((responseData) && (contactPage)){
			responseData => responseData.text();
			console.log(responseData);
			document.location = "contactUs-sent.html";
		}
	} catch (error) {
		console.error(error);
		alert("An error occurred.");
	}
}

const signUpPage = document.getElementById("registerForm");
if(signUpPage){
	signUpPage.addEventListener('submit',handleFormSubmit);
}


const loginPage = document.getElementById("login");
if(loginPage){
	loginPage.addEventListener('submit',handleFormSubmit);
}

const searchPage = document.getElementById("search");
if(searchPage){
	searchPage.addEventListener('submit',handleFormSubmit);
}

const geoButton = document.getElementById("geolocator");
if(geoButton){
	geoButton.addEventListener("click",geoLocate);
}

function geoLocate(){
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(changeLocation,null,{enableHighAccuracy:true});
	}
}

function changeLocation(pos){
	const long = pos.coords.longitude;
	const lat = pos.coords.latitude;
	const location = document.getElementById("location");
	location.value = [long,lat];
}

const resetPage = document.getElementById("reset");
if(resetPage){
	resetPage.addEventListener("submit",handleFormSubmit);
}

const contactPage = document.getElementById("contact");
if(contactPage){
	contactPage.addEventListener("submit",handleFormSubmit);
}