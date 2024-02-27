let dataLoad = async () => {
    let ref = await fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
    let data = await ref.json();
    // console.log(data.data)
    let phones = data.data;
    displayPhone(phones)
}


const container_phone = document.getElementById("container_phone");
const displayPhone = (phones) => {
    console.log(phones)
    phones.forEach(phone => {  
        let div = document.createElement("div");
        div.className = "card bg-base-100 shadow-xl border-2 border-gray p-3";
        div.innerHTML += `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
          <h2 class="card-title">${phone.phone_name}</h2>
          <p>${phone.slug}</p>
          <div class="card-actions justify-center">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>`
        container_phone.appendChild(div)
    })
}


// search handel 
const seatchHandel = () => {
    const  search = document.getElementById("search");
    const searchVal = search.value;
    console.log(searchVal)
}
















dataLoad()