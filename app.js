const phoneSearch = document.getElementById("search-field")
const phoneResult = document.getElementById("search-result")

    //search phone area -->

const searchPhone = () =>{
    const searchText = phoneSearch.value;

    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayPhone(data.data.slice(0,20)))
}
    //display phone area -->

const displayPhone = phones =>{
    phones.forEach(phone =>{
        //console.log(phone)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `
        <div class="card h-100 mx-auto" style="width: 18rem;">
        <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.brand}</h5>
                <p class="card-text">${phone.phone_name}</p>
                <a href="#" class="btn btn-primary" onclick="loadPhoneDetail('${phone.slug}')">
                Details
                </a>
            </div>
        </div>
        `;
        phoneResult.appendChild(div)
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
    //const release = document.getElementById('release')
    const div = document.createElement('div')
    div.classList.add('card')
    div.innerHTML = ` 
    <img src="${phone.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h4>${phone.name}</h4>
      <h5 id="releaseP" class="card-title"><strong>Release-date: </strong><span class="text-danger"> ${phone.releaseDate ? phone.releaseDate: 'no release date found' } </span></h5>
      <p class="card-text mb-0"><strong>Main Features -</strong></p>
      <p class="card-text"><strong>Chipset:</strong> ${phone.mainFeatures.chipSet} <br>   <strong>Memory:</strong> ${phone.mainFeatures.memory} <br> 
      <strong>Display size:</strong> ${phone.mainFeatures.displaySize} <br>
      <strong>Sensors:</strong> ${phone.mainFeatures.sensors.slice(0,-1)} </p>

      <p class="card-text mb-0"><strong>Other Features -</strong></p>
      <p class="card-text"><strong>Wlan:</strong> ${phone.others.WLAN} <br>   
      <strong>Memory:</strong> ${phone.others.Bluetooth} <br> 
      <strong>GPS:</strong> ${phone.others.GPS} <br>
      <strong>NFC:</strong> ${phone.others.NFC} <br>
      <strong>Radio:</strong> ${phone.others.Radio} <br>
      <strong>USB:</strong> ${phone.others.USB}
      </p>
    </div>
    `;
    phoneDetail.appendChild(div);
}