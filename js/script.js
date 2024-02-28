let dataLoad = async (searchVal, isShowAll) => {
    let ref = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchVal}`)
    let data = await ref.json();
    // console.log(data.data)
    let phones = data.data;
    displayPhone(phones, isShowAll)
}


const displayPhone = (phones, isShowAll) => {
    // console.log(phones.length)
    const container_phone = document.getElementById("container_phone");
    container_phone.innerHTML = "";



    // show all card
    const show_all = document.getElementById("show_all");
    if (phones.length > 10 && !isShowAll) {
        show_all.classList.remove("hidden")
    } else {
        show_all.classList.add("hidden")
    }


    // isShowAll 
    // console.log("show all " , isShowAll)
    if (!isShowAll) {
        // display only first 10 phone
        phones = phones.slice(0, 10)
    }

    // console.log(phones.length)
    if (phones.length === 0) {
        document.getElementById("error").innerText = "Search result is not avilabel";
    } else{
        document.getElementById("error").innerText = "";
    }

        // show display card
        phones.forEach(phone => {
            let div = document.createElement("div");
            div.className = "card bg-base-100 shadow-xl border-2 border-gray p-3";
            div.innerHTML += `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.slug}</p>
          <div class="card-actions justify-center">
            <button onclick="showDetails('${phone.slug}')" class="btn btn-primary">SHOW DETAILS</button>
          </div>
        </div>`
            container_phone.appendChild(div)
        })
        // hidden loading spiner 
        loading(false)
    }




// search handel 
const seatchHandel = (isShowAll) => {
    // hanel search 

    // loading data 
    loading(true)
    // click btn 
    const search = document.getElementById("search");
    const searchVal = search.value;
    dataLoad(searchVal, isShowAll)
}

// loading 
function loading(loadingCom) {
    let loadingData = document.getElementById("loading");
    if (loadingCom) {
        loadingData.classList.remove("hidden")
    } else {
        loadingData.classList.add("hidden")
    }
}

// showAll data fun 
function showAll() {
    seatchHandel(true)
}


// showDetails
async function showDetails(id) {
    const singleData = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await singleData.json()
    let sendData = data.data
    console.log(sendData)
    showModalFun(sendData)
    // modal show
    showDetail.showModal()
}



function showModalFun({ brand, image, name, slug, mainFeatures, others }) {
    // console.log(image)
    document.getElementById("imageModal").src = image;
    const modalDetails = document.getElementById("modalDetails");
    modalDetails.innerHTML = `
     <h1 class=" text-black"><span class=" font-bold">Storage :</span> ${mainFeatures.memory}</h1>
    <h1 class=" text-black"><span class=" font-bold">Display Size : </span> ${mainFeatures.displaySize} </h1>
    <h1 class=" text-black"><span class=" font-bold">Chipset :</span> ${mainFeatures.chipSet} </h1>
    <h1 class=" text-black"><span class=" font-bold">Memory</span> ${others?.GPS || "GPS not avilabel"}</h1>
    <h1 class=" text-black list-inline-item text-pretty"><span class=" font-bold">Slug :</span> ${ mainFeatures.sensors}</h1>
    <h1 class=" text-black"><span class=" font-bold">Release data :</span> Apple A15 Bionic
    </h1>
    <ul id='sensors_container' >
        
    </ul>
    `
    const sensors_container = document.getElementById("sensors_container")
    mainFeatures.sensors.forEach((val) => {
        const newLi = document.createElement("li");
        newLi.innerText = val;
        sensors_container.appendChild(newLi)
    })


    // <h1 class=" text-black"><span class=" font-bold">Brand :</span></h1>
    // <h1 class=" text-black"><span class=" font-bold">GPS :</span> Apple A15 Bionic</h1>

}





