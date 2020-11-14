<template>
  <div class="container">
      <div class="search-card">
        <input class="search" type="text" placeholder="Search User....">
      </div>

    <l-map
      :zoom="zoom"
      :center="center"
      :bounds="bounds"
      :max-bounds="maxBounds"
    >
      <l-tile-layer :noWrap="noWrap" :url="url" :attribution="attribution" />
      <l-marker :lat-lng="marker" />
    </l-map>
    <div class="info">
      Marker is placed at {{ marker.lat }}, {{ marker.lng }}, bounds are
      {{ bounds }}
      <br>
    </div>
  </div>
</template>

<script>
import { latLngBounds, latLng } from "leaflet";
import { LMap, LTileLayer, LMarker } from "vue2-leaflet";

export default {
  name: "SetBounds",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  data() {
    return {
      center: [47.41322, -1.219482],
      bounds: latLngBounds([
        [-90, -180],
        [90, 180],
      ]),
      maxBounds: latLngBounds([
        [-90, -180],
        [90, 180],
      ]),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: latLng(47.41322, -1.219482),
      noWrap: true,
      zoom: 5,
    };
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
}

.info{
    z-index:1000;
    position: fixed;
    bottom: 20px;
    margin-left:40px;
    margin-right:20px;
    border-radius:5px;
    padding: 10px 0px 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    width: 90%;
}


.search-card{
  
    z-index:1000;
    position: fixed;
    top: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    width: 100%;
}

.search{
  display:flex;
  border:2px solid #AAA;
  padding:10px;
  border-radius:5px;
  padding: 10px 0px 10px 10px;
}
</style>
