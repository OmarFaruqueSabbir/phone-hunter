const phoneSearch = document.getElementById("search-field")
const phoneResult = document.getElementById("search-result")

    //search phone area -->
const searchPhone = () =>{
    const searchText = phoneSearch.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data.data.slice(0,10)))
}
    //display phone area -->
const displayPhone = phones =>{
    phones.forEach(phone =>{
        console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 mx-auto" style="width: 18rem;">
        <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <a class="btn btn-danger delete-btn">
                explore all
                </a>
                <a href="#" class="btn btn-primary" >
                Details
                </a>
            </div>
        </div>
        `;
        phoneResult.appendChild(div)
    })
}