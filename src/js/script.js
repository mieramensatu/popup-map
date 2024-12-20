import Map from "https://cdn.skypack.dev/ol/Map.js";
import TileLayer from "https://cdn.skypack.dev/ol/layer/Tile.js";
import View from "https://cdn.skypack.dev/ol/View.js";
import Overlay from "https://cdn.skypack.dev/ol/Overlay.js";
import { fromLonLat, toLonLat } from "https://cdn.skypack.dev/ol/proj.js";
import { toStringHDMS } from "https://cdn.skypack.dev/ol/coordinate.js";
import XYZ from "https://cdn.skypack.dev/ol/source/XYZ.js";

const key = "o2fM01ahGTvbSGE4GKIs";
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");

const overlay = new Overlay({
  element: container,
  autoPan: {
    animation: {
      duration: 250,
    },
  },
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new XYZ({
        attributions: attributions,
        url: `https://api.maptiler.com/maps/streets-v2/{z}/{x}/{y}.png?key=o2fM01ahGTvbSGE4GKIs`,
        tileSize: 512, 
      }),
    }),
  ],
  overlays: [overlay],
  view: new View({
    center: fromLonLat([107.57634352477324, -6.87436891415509]),
    zoom: 16,
  }),
});

map.on("singleclick", function (evt) {
  const coordinate = evt.coordinate;
  const hdms = toStringHDMS(toLonLat(coordinate));

  content.innerHTML = "<p>You clicked here:</p><code>" + hdms + "</code>";
  overlay.setPosition(coordinate);
});

