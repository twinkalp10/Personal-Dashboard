fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature")
.then(res => {
    if (!res.ok) {
        throw Error("Something went wrong with background");
    }
    return res.json()
})
.then(data => {
    document.body.style.backgroundImage = `url(${data.urls.full})`;
    console.log(data);
    document.getElementById("author").textContent = `By: ${data.user.name}`;   
})
.catch(err => {
    console.error(err);
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2NTkwNjIzMTQ&ixlib=rb-1.2.1&q=80&w=1080)`
}
)

fetch("https://api.coingecko.com/api/v3/coins/dogecoin")
.then(res => {
    if(!res.ok){
        throw Error("something went wrong with coin data")
    }
    return res.json()
})
.then(data => {
    document.getElementById("crypto-top").innerHTML = `
        <img src = ${data.image.small} />
        <span>${data.name} </span>
    `
    document.getElementById("crypto").innerHTML += ` 
    <p>🎯: $${data.market_data.current_price.usd} </p>
    <p>👆: $${data.market_data.high_24h.usd} </p>
    <p>👇: $${data.market_data.low_24h.usd} </p>
    `
})
.catch(err => {
    console.error(err)
})

function showCurrentTime(){
    const date = new Date();
    document.getElementById("time").textContent = date.toLocaleTimeString("en-us", {timeStyle: "short"})
}

setInterval(showCurrentTime, 1000);

navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&unit=matric`)
    .then(res => {
        if (!res.ok) {
            throw Error("Weather data not available");
        }
        return res.json();
    })
    .then(data => {
        console.log(data);
        const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById("weather").innerHTML = `
        <img src=${iconUrl} />
        <p class="weather-temp">${Math.round(data.main.temp)}</p>
        <p class="weather-city">${data.name} </p>
        `
    })
    .catch(err => console.error(err))
})