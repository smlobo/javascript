import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const map = new maplibregl.Map({
    container: "map",
    style: "https://demotiles.maplibre.org/style.json",
    center: [72.8, 19], // [lng, lat]
    zoom: 5,
});

map.addControl(new maplibregl.NavigationControl());
