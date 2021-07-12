window.onload = () => {
    // seed data
    /* const abc = [
        {
            "name": "Paracetamol",
            "price": 500,
            "store": {
                "name": "Pharmacy 1"
            }
        },
        {
            "name": "Paracetamol",
            "price": 450,
            "store": {
                "name": "Pharmacy 2"
            }
        },
        {
            "name": "Paracetamol",
            "price": 480,
            "store": {
                "name": "Pharmacy 3"
            }
        },
        {
            "name": "Paracetamol",
            "price": 460,
            "store": {
                "name": "Pharmacy 4"
            }
        },
        {
            "name": "Paracetamol",
            "price": 510,
            "store": {
                "name": "Pharmacy 5"
            }
        },
        {
            "name": "Paracetamol",
            "price": 490,
            "store": {
                "name": "Pharmacy 6"
            }
        },
        {
            "name": "Paracetamol",
            "price": 420,
            "store": {
                "name": "Pharmacy 7"
            }
        },
        {
            "name": "Paracetamol",
            "price": 400,
            "store": {
                "name": "Pharmacy 8"
            }
        },
        {
            "name": "Paracetamol",
            "price": 350,
            "store": {
                "name": "Pharmacy 9"
            }
        },
        {
            "name": "Paracetamol",
            "price": 380,
            "store": {
                "name": "Pharmacy 10"
            }
        },
        {
            "name": "Paracetamol",
            "price": 390,
            "store": {
                "name": "Pharmacy 11"
            }
        },
        {
            "name": "Paracetamol",
            "price": 440,
            "store": {
                "name": "MedPlus Pharmacy 1"
            }
        },
        {
            "name": "Paracetamol",
            "price": 470,
            "store": {
                "name": "MedPlus Pharmacy 2"
            }
        },
        {
            "name": "Paracetamol",
            "price": 500,
            "store": {
                "name": "MedPlus Pharmacy 3"
            }
        }
    ];*/
     //sessionStorage.setItem("drugSearchResults",JSON.stringify(abc));
    //sessionStorage.removeItem("drugSearchResults");
    const sortedDrugStores = JSON.parse(sessionStorage.getItem("drugSearchResults"));
    if(sortedDrugStores){
        const resultLength = sortedDrugStores.length;
        // Function to change index
        function changeIndex(marker){
            let markerText = marker.innerText;
            const numberRegex = /\d+/;
            markerText = markerText
            .trim()
            .split(" ")
            .map((component,index)=>{
                console.log(component);
                if(index == 2){
                    return component.replace(numberRegex,resultLength);
                }
                else{
                    return component;
                }
            })
            .join(" ");
            marker.innerText = markerText;
        }
        // Change index of search results
        const searchMarker = document.getElementById("searchResultNumber");
        changeIndex(searchMarker);
        
        // Change index of pharmacies
        const pharmacyMarker = document.getElementById("pharmacyResultNumber");
        changeIndex(pharmacyMarker);

        // Dynamically render the drugs and stores
        const productCardSection = document.getElementById("product_cards");
        const numberOfSections = Math.ceil(resultLength/3);

        // product_cards > section
        let counter = parseInt(`${resultLength}`);
        for(let i=0;i<numberOfSections;i++){
            // section > cards > card
            const section = document.createElement("section");
            const cards = document.createElement("div");
            section.appendChild(cards);
            productCardSection.appendChild(section);
            cards.classList.add("cards");

            for(let j=0;j<3;j++){
                if(counter == 0){
                    break;
                }
                else{
                    // card > img + div >> h3 + p + a
                    const card = document.createElement("div");
                    cards.appendChild(card);
                    card.classList.add("card");

                    const img = document.createElement("img");
                    card.appendChild(img);
                    img.src = "assets/img/Product  image.png";
                    img.alt = "";
                    const content = document.createElement("div");
                    card.appendChild(content);
                    content.classList.add("content");

                    const drugNameAndPrice = document.createElement("h3");
                    const pharmacyName = document.createElement("p");
                    const pharmacyLink = document.createElement("a");
                    content.appendChild(drugNameAndPrice);
                    content.appendChild(pharmacyName);
                    content.appendChild(pharmacyLink);

                    const drugName = sortedDrugStores[resultLength-counter].name;
                    const drugPrice = sortedDrugStores[resultLength-counter].price;
                    const storeName = sortedDrugStores[resultLength-counter].store.name;
                    drugNameAndPrice.innerHTML = `${drugName} <br> #${drugPrice}`;
                    pharmacyName.innerText = `${storeName}`;
                    pharmacyLink.innerText = "Get Directions";
                    pharmacyLink.classList.add("pharmacy-direction-button");
                    pharmacyLink.href = `user-map-direction.html?s=${resultLength-counter}`;
                    function checkOutStore(){
                        //in progress
                    }
                    counter -= 1;
                }
            }
        }
        

    }
    
}