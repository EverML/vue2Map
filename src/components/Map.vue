<template>
  <div class="container">
    <div class="search-card">
      <input
        v-model="text"
        @change="searchUser"
        class="search"
        type="text"
        placeholder="Search User...."
      />
    </div>

    <l-map
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
      <l-tile-layer :noWrap="noWrap" :url="url" />
    </l-map>
    <div class="info">
      Center is {{ center.lat }}, {{ center.lng }}, bounds are {{ bounds }},
      zoom is {{ zoom }}, text is: {{ text }}
    </div>
  </div>
</template>

<script>
import { latLngBounds, latLng } from "leaflet";
import { LMap, LTileLayer } from /*, LMarker, LPopup, LTooltip*/ "vue2-leaflet";
import TorreService from '../services/TorreService';

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
  },
  data() {
    return {
      text: "",
      zoom: 3.5,
      center: latLng(-5.317854245891062, -44.219482),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      showParagraph: false,
      noWrap: true,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      bounds: latLngBounds([
        [-90, -180],
        [90, 180],
      ]),
    };
  },
  methods: {
    zoomUpdate(zoom) {
      console.log(">>>zooom" + zoom);
      this.zoom = zoom;
    },
    centerUpdate(center) {
      console.log(">>>center" + center);
      this.center = center;
    },
    searchUser() {
      if(this.text.length > 3)
      {
        TorreService.getUser(this.text)
          .then(response =>{
            console.log(response);
          })
          .catch(err=>{
            console.log(err);
          });
      }
    },
    
  },
};
</script>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
}

.info {
  z-index: 1000;
  position: fixed;
  bottom: 20px;
  margin-left: 40px;
  margin-right: 20px;
  border-radius: 5px;
  padding: 10px 0px 10px 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  width: 90%;
}

.search-card {
  z-index: 1000;
  position: fixed;
  top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
}

.search {
  display: flex;
  border: 2px solid #aaa;
  padding: 10px;
  border-radius: 5px;
  padding: 10px 0px 10px 10px;
}
</style>
