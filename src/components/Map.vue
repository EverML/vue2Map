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
      :min-zoom="minZoom"
      :center="center"
      :options="mapOptions"
      :max-bounds="maxBounds"
      @update:center="centerUpdate"
      @update:zoom="zoomUpdate"
    >
    <l-tile-layer :noWrap="noWrap" :url="url" />
      <l-marker :lat-lng="withPopup">
        <l-popup>
          <div @click="innerClick">
            I am a popup
            <p v-show="showParagraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
              sed pretium nisl, ut sagittis sapien. Sed vel sollicitudin nisi.
              Donec finibus semper metus id malesuada.
            </p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
    <div class="info">
      Center is {{ center.lat }}, {{ center.lng }}
      zoom is {{ zoom }}, text is: {{ text }}
      icon position is {{withPopup}}
    </div>
  </div>
</template>

<script>
import { latLngBounds, latLng } from "leaflet";
import { LMap, LTileLayer,LMarker,LPopup } from "vue2-leaflet";
import TorreService from '../services/TorreService';

export default {
  name: "Map",
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LPopup,
  },
  data() {
    return {
      text: "",
      userInfo: {},
      zoom: 3.5,
      minZoom:3.5,
      center: latLng(-5.3, -44.2),
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      showParagraph: false,
      noWrap: true,
      mapOptions: {
        zoomSnap: 0.5,
      },
      showMap: true,
      maxBounds:latLngBounds([
        [-90, -180],
        [90, 180],
      ]),
      withPopup: latLng(47.41322, -1.219482),

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
        this.$Progress.start();
        TorreService.getUser(this.text)
          .then(response =>{
            this.$Progress.finish();
            if(response.data)
            {
              this.withPopup = latLng(response.data.latitude,response.data.longitude);
            }
          })
          .catch(err=>{
            console.log(err);

            this.$Progress.fail();
          });
      }
    },
    innerClick(){
      alert(`you've clicked on me`);
    }
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
