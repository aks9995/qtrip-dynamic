import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let adventureId = new URLSearchParams(search).get("adventure");
  return adventureId;


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(config.backendEndpoint + "/adventures/detail?adventure=" + adventureId);
    const adventureData = await res.json();
    return adventureData;
  } catch(error) {
    return null;
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = adventure.name;
    document.getElementById("adventure-subtitle").innerHTML = adventure.subtitle;
    let divGallery = document.getElementById("photo-gallery");

    adventure.images.map((advImage => {
      let divImage = document.createElement("div");
      divImage.className = "col-12";
      divImage.setAttribute("id","imageGallery");
      divImage.innerHTML = `
        <img class="img-responsive activity-card-image" src=${advImage} />
      `;
      divGallery.appendChild(divImage)
    }));

    document.getElementById("adventure-content").innerHTML = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  
  document.getElementById('photo-gallery').innerHTML = ""
  document.getElementById('photo-gallery').innerHTML=`<div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
</div>`
  
  
 let carouselInner = document.createElement("div");
  carouselInner.classList.add("carousel-inner");
  images.forEach((img,idx) =>{
    let carouselItem = document.createElement("div");
    if(idx === 0){
      carouselItem.classList.add("carousel-item","active");
    }else{
      carouselItem.classList.add("carousel-item");
    }
    let image = document.createElement("img");
    image.setAttribute("src", img);
    image.classList.add("d-block", "w-100", "activity-card-image");
    carouselItem.append(image);
    carouselInner.append(carouselItem);
  })
  document.getElementById("carouselExampleIndicators").append(carouselInner);

  let button = document.createElement("div");
  button.innerHTML=`<button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>`
  document.getElementById('carouselExampleIndicators').append(button)

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
   console.log(adventure);
  if(adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  } else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
   let totalCost = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = totalCost;

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
   /*$.ajax({
      url: `${config.backendEndpoint}/reservations/new`,
      type: "POST",
      dataType: "application/json",
      data: $("#myForm").serialize() + "&adventure=" + adventure.id,
      success: function(response) {
        console.log(data);
        window.alert("Success!");
        window.location.reload();
      },
      error: function() {
        window.alert("Failed!");
      }

    });
  });*/

  let formData = document.getElementById("myForm")
  formData.addEventListener("submit", async (event) => {
    event.preventDefault()
    let data = {};
    data["name"] = formData.elements["name"].value
    data["date"] = formData.elements["date"].value
    data["person"] = formData.elements["person"].value
    data["adventure"] = adventure.id;
    try {
      let post = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      })
      let response = await post.json();
      if (response.success === true) {
        alert("Success!")
        location.reload();
      }
      else {
        alert("Failed!");
      }
    }
    catch (error) {
      alert("Failed!");
    }
  
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
