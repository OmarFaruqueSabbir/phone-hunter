const phoneSearch = document.getElementById("search-field")
const phoneResult = document.getElementById("search-result")
const showResult = document.getElementById("show-result")
const phoneDetail = document.getElementById('phone-details');
const error = document.getElementById("error")

    //search phone area -->

const searchPhone = () =>{
    const searchText = phoneSearch.value;
    if(!isNaN(searchText) || searchText == null ){
        error.innerText = "please give valid input"
        phoneSearch.value = "";
        phoneResult.innerHTML = "";
        phoneDetail.innerHTML = "";
        showResult.innerHTML = "";

    }else{
        error.innerText = ""
        phoneResult.innerHTML = "";
        phoneDetail.innerHTML = "";
        showResult.innerHTML = "";
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.status == false){
                error.innerText = "no phone data found"
                phoneSearch.value = "";
            }
            else{
                displayPhone(data.data.slice(0,20))
            }
        })
    }
}
    //display phone area -->

const displayPhone = phones =>{
    phones.forEach(phone =>{
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card  mx-auto shadow-lg back bg-gray p-3 rounded" style="width: 18rem;background-color: #F1F1F1;">
        <img src="${phone.image}"  class="card-img-top w-50 mx-auto" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <a href="#" class="btn btn-primary" onclick="loadPhoneDetail('${phone.slug}')">
                Details
                </a>
                <a href="#" class="btn btn-danger" id="explore" onclick="loadMore()">
                Explore more
                </a>
            </div>
        </div>
        `;
        phoneResult.appendChild(div)
    })
}

    //load more -->

const loadMore = () =>{
    const searchText = phoneSearch.value;
    phoneResult.innerHTML = "";
    phoneDetail.innerHTML = "";
    showResult.innerHTML = "";
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => showMore(data.data))
}

    //display load more -->

const showMore = phones =>{
    phones.forEach(phone => {
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 mx-auto shadow-lg back bg-gray" style="width: 18rem; background-color: #F1F1F1;">
        <img src="${phone.image}" class="card-img-top w-50 mx-auto mt-3" alt="...">
            <div class="card-body mx-auto">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <a href="index.html" class="btn btn-success">
                refresh
                </a>
            </div>
        </div>
        `;
        showResult.appendChild(div)
        
    })
}


    //load phone detail -->

const loadPhoneDetail = (phoneId) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data.data))
    
}
    //display phone detail -->

const displayPhoneDetail = phone =>{
    console.log(phone);
    const phoneDetail = document.getElementById('phone-details');
    const div = document.createElement('div')
    phoneDetail.innerHTML = "";
    div.classList.add('card')
    div.innerHTML = ` 
    <img src="${phone.image}" class="card-img-top mx-auto w-50 mt-3" alt="...">
    <div class="card-body w-70 p-3">
      <h4>${phone.name}</h4>
      <h5 id="releaseP" class="card-title"><strong>Release-date: </strong><span class="text-danger"> ${phone.releaseDate ? phone.releaseDate: 'no release date found'} </span></h5>
      <p class="card-text mb-0"><strong>Main Features -</strong></p>
      <p class="card-text"><strong>Chipset:</strong> ${phone.mainFeatures.chipSet} <br>   <strong>Memory:</strong> ${phone.mainFeatures.memory} <br> 
      <strong>Display size:</strong> ${phone.mainFeatures.displaySize} <br>
      <strong>Sensors:</strong> ${phone.mainFeatures.sensors.slice(0,-1)} </p>
    </div>
    `;
    const div2 = document.createElement('div')
    phoneDetail.innerHTML = "";
    div2.classList.add('card','mb-3')
    if(phone.others == null){
        div2.innerHTML = `
        <div class="card-body w-70 p-3">
        <p class="card-text mb-0"><strong>Other Features - <span class="text-warning">No data found!</span></strong></p>  
        </div>
        `
    }
    else{
        div2.innerHTML = `
        <div class="card-body w-70 p-3">
        <p class="card-text mb-0"><strong>Other Features -</strong></p>
        <p class="card-text"><strong>WLAN:</strong> ${phone.others.WLAN} <br>   
        <strong>Memory:</strong> ${phone.others.Bluetooth} <br> 
        <strong>GPS:</strong> ${phone.others.GPS} <br>
        <strong>NFC:</strong> ${phone.others.NFC} <br>
        <strong>Radio:</strong> ${phone.others.Radio} <br>
        <strong>USB:</strong> ${phone.others.USB}
        </p>
        </div>
        `
    }
    phoneDetail.appendChild(div);
    phoneDetail.appendChild(div2);
}