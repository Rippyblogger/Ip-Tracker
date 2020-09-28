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
        return data;

        
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};