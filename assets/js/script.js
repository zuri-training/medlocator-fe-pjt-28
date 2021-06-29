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
			You can then log into your Dashboard`);
			responseData => responseData.text();
			console.log(responseData);			
			document.location = "login.html"
        }
		if((responseData) && (loginPage)){
			responseData => responseData.text();
			console.log(responseData);			
			document.location = "dashboard.html"
        }
	} catch (error) {
		console.error(error);
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
