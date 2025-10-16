import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const map = new maplibregl.Map({
    container: "map",
    // style: "https://demotiles.maplibre.org/style.json",
    style: "style.json",
    center: [-96.5, 39.8], // [lng, lat]
    zoom: 4,
    // maxBounds: [
    //     [-125, 24], // Southwest corner (lon, lat)
    //     [-66.5, 49.5] // Northeast corner
    // ]
});

map.addControl(new maplibregl.NavigationControl());

map.on("load", () => {
    // Add U.S. states GeoJSON from GitHub
    map.addSource("us-states", {
        type: "geojson",
        data: "https://raw.githubusercontent.com/PublicaMundi/MappingAPI/master/data/geojson/us-states.json"
    });

    // Draw outlines
    map.addLayer({
        id: "state-borders",
        type: "line",
        source: "us-states",
        paint: {
            "line-color": "#333",
            "line-width": 1
        }
    });

    // Optional: Fill states with a light color
    map.addLayer({
        id: "state-fills",
        type: "fill",
        source: "us-states",
        paint: {
            "fill-color": "rgba(0, 100, 255, 0.05)"
        }
    }, "state-borders");

    // Highlight layer (initially transparent)
    map.addLayer({
        id: "state-fills-hover",
        type: "fill",
        source: "us-states",
        paint: {
            "fill-color": "rgba(255, 200, 0, 0.5)"
        },
        filter: ["==", "name", ""]
    });

    let popup = new maplibregl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    // --- Mouse move event ---
    map.on("mousemove", "state-fills", (e) => {
        if (e.features.length > 0) {
            const stateName = e.features[0].properties.name;

            // Update the hover filter to only show the hovered state
            map.setFilter("state-fills-hover", ["==", "name", stateName]);

            // Show popup with state name
            popup
                .setLngLat(e.lngLat)
                .setHTML(`<strong>${stateName}</strong>`)
                .addTo(map);
        }
    });

    // --- Mouse leave event ---
    map.on("mouseleave", "state-fills", () => {
        map.setFilter("state-fills-hover", ["==", "name", ""]);
        popup.remove();
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
