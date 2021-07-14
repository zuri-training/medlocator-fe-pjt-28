// PHARMACY DIRECTION TABS SCRIPT 
var tabButtons = document.querySelectorAll(".tab-container .button-container button");
var tabPanels = document.querySelectorAll(".tab-container .tab-panel");

function showPanel(panelIndex, colorCode) {
    tabButtons.forEach(function(node){
        node.style.borderBottom="";
        node.style.color=""; 
    })
    tabButtons[panelIndex].style.borderBottom="2px solid #0cb2b2";
    tabButtons[panelIndex].style.color="#0cb2b2";
    tabPanels.forEach(function(node){
        node.style.display="none";
    })
    tabPanels[panelIndex].style.display="block";
}
showPanel(0);

// Dynamic rendering section
    const sortedDrugStores = JSON.parse(sessionStorage.getItem("drugSearchResults"));
    const searcherLocation = JSON.parse(sessionStorage.getItem("searcherLocation"));
    if(sortedDrugStores){
        const resultLength = sortedDrugStores.length;
        // Function to change index
        function changeIndex(marker){
            const numberRegex = /\d+/;
            marker.innerHTML = marker.innerHTML.replace(numberRegex,resultLength);
        }
        // Change index of search results
        const searchMarker = document.getElementById("searchResultNumber");
        changeIndex(searchMarker);
        
        // Change index of pharmacies
        const pharmacyMarker = document.getElementById("pharmacyResultNumber");
        changeIndex(pharmacyMarker);

        // Dynamically render the drugs and stores
        // Number 3 is used in order to have 3 cards in a row, purely a style choice
        const resultCardsContainer = document.getElementById("product_cards");
        const resultPharmacyList = document.getElementById("pharmacy_list");
        
        sortedDrugStores.forEach((drugStore, index) => {
            // Store Addresses
            const storeLoc = document.createElement("li");
            resultPharmacyList.appendChild(storeLoc);
            
            // card > img + div >> h3 + p + a
            const card = document.createElement("div");
            resultCardsContainer.appendChild(card);
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
            const pharmacyLink = document.createElement("button");
            content.appendChild(drugNameAndPrice);
            content.appendChild(pharmacyName);
            content.appendChild(pharmacyLink);

            const drugName = drugStore.name;
            const drugPrice = drugStore.price;
            const storeName = drugStore.store.name;
            const storeAddress = drugStore.store.address;
            const storeAddressArray = storeAddress.split(",");
            const storeCity = storeAddressArray[storeAddressArray.length - 2];
            drugNameAndPrice.innerHTML = `${drugName} <br> #${drugPrice}`;
            pharmacyName.innerText = `${storeName} ${storeCity}`;
            pharmacyLink.innerText = "Get Directions";
            pharmacyLink.classList.add("pharmacy-direction-button");
            pharmacyLink.onclick = () => showPanel(1);
            function checkOutStore(ind){
                //showPanel(1);
                //sortedDrugStores[ind];
                //find element with that index, change styling
                //highlight on map
            }
            storeLoc.innerHTML = `${storeName} <br>${storeAddress}`;
        });    
    }

     // Render the map
     async function initMap() {
        map = new google.maps.Map(document.getElementById("map"), {
          center: searcherLocation,
          zoom: 15,
          mapTypeControlOptions: {
              mapTypeIds: ["roadmap"]
          }
        });

        const contentString = (store) => {
            return `<h1>${store.name}</h1>
            <div><p>${store.address}</p></div>
            <div><p>${store.contact.phone}</p></div>`;
        }
        const infowindow = new google.maps.InfoWindow();
        sortedDrugStores.forEach(v => {
            const latLng = new google.maps.LatLng(v.store.geometry);
            const marker = new google.maps.Marker({
                position: latLng,
                map: map,
                icon: "/assets/pharmacy-direction/green-pharmacy-symbol.png"
            });
            marker.addListener("click",() => {
                infowindow.setContent(contentString(v.store));
                infowindow.open({
                    anchor: marker,
                    map,
                    shouldFocus: true
                });
            });
            /* if(storeIndex){
                marker.setMap(null);
                const storePlace = new google.maps.Marker({
                    map,
                    position: sortedDrugStores[storeIndex].store.geometry,
                });
                storePlace.addListener("click",()=>{
                    infowindow.setContent(contentString(sortedDrugStores[storeIndex].store));
                    infowindow.open({
                        anchor: storePlace,
                        map,
                        shouldFocus: true
                    });
                });
            } */
            
        });
        
            const howFar = new google.maps.Marker({
                map,
                position: searcherLocation
            });
    }
    
