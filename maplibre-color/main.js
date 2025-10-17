import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const map = new maplibregl.Map({
    container: "map",
    style: "style.json",
    center: [-96.5, 39.8], // [lng, lat]
    zoom: 4,
    attributionControl: false // 👈 disables attribution box
});

map.on("load", () => {
    // Draw outlines
    map.addLayer({
        id: "state-borders",
        type: "line",
        source: "us-states",
        paint: {
            "line-color": "#ff0000",
            "line-width": 1.5
        }
    });

    // Optional: Fill states with a light color
    map.addLayer({
        id: "state-fills",
        type: "fill",
        source: "us-states",
        paint: {
            "fill-color": "#404040"
        }
    }, "state-borders");

    window.addEventListener("message", (event) => {
        console.log("Map received:", event.data);
        if (event.data === "theme-light") {
            map.setPaintProperty('background', 'background-color', '#aee1f9'); // Light blue
        } else if (event.data === "theme-dark") {
            map.setPaintProperty('background', 'background-color', '#001f33'); // Navy blue
        }
    });
});

function markLocation(loc) {
    const el = document.createElement("div");
    el.className = "marker";
    el.style.cssText = `
    background: red;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid white;
  `;

    new maplibregl.Marker(el)
        .setLngLat(loc.coords)
        .setPopup(new maplibregl.Popup({ offset: 25 }).setText(loc.name))
        .addTo(map);

}

const locations = [
    {name: "New York City", coords: [-74.006, 40.7128]},
    {name: "Los Angeles", coords: [-118.2437, 34.0522]},
    {name: "Chicago", coords: [-87.6298, 41.8781]}
];

locations.forEach(loc => {
    markLocation(loc);
    console.log(loc);
});

fetch('locations.json')
    .then(response => response.json())
    .then(data => {
        data.forEach(city => {
            markLocation(city);
            console.log(city);
        });
    })
    .catch(err => console.error('Error loading JSON:', err));
