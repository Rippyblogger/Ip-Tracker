// https://geo.ipify.org/api/v1?apiKey=at_CSvRzcafCrafn6nUqWIOY5ps5uZF1&ipAddress=8.8.8.8

let baseURL = "https://geo.ipify.org/api/v1?apiKey=";
let apiKey = "at_CSvRzcafCrafn6nUqWIOY5ps5uZF1";

document.getElementById("button").addEventListener("click", function (event) {
    event.preventDefault();
    submit();
});


function submit() {
    let ipAddress = document.getElementById("ip-address").value;
    ipFetch(baseURL, apiKey, ipAddress);
    
};


const ipFetch = async (baseURL, apiKey, ipAddress) => {
    const res = await fetch(`${baseURL}${apiKey}&ipAddress=${ipAddress}`);
    //console.log(`${baseURL}${apiKey}&ipAddress=${ipAddress}`);
    try {
        const data = await res.json();
        console.log(data);
        updateUI(data);
        ipmap(data);
        // return data;
    } catch (error) {
			// appropriately handle the error
			console.log("error", error);
		}
};


//update the UI
function updateUI(data) {
    document.getElementById(
			"ipaddress"
		).innerHTML = `<b>IP Address: </b>  ${data.ip}`;
    document.getElementById("isp").innerHTML = `<b>ISP:</b>  ${data.isp}`;
    document.getElementById("country").innerHTML = `<b>Location: </b>  ${data.location.city}, ${data.location.region}, ${data.location.country}`;
    document.getElementById("timezone").innerHTML = `<b>Timezone: </b>  ${data.location.timezone}`;
}



//Map

function ipmap(data) {
	document.getElementById("mapid").innerHTML =
		"<div id='map' style='width: 100%; height: 100%;'></div>";
	let osmUrl = "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
		osmAttribution =
			'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,' +
			' <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
		osmLayer = new L.TileLayer(osmUrl, {
			maxZoom: 18,
			attribution: osmAttribution,
		});
	let map = new L.Map("map");
	map.setView(new L.LatLng(data.location.lat, data.location.lng), 15);
    map.addLayer(osmLayer);
    let newMarker = L.marker([data.location.lat, data.location.lng]).addTo(
			map
		);
    let popup = newMarker.bindPopup("<b>Here</b>");
}