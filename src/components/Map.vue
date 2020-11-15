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
          <div>
            {{userInfo.name}}
            <ul id="example-1">
              <li v-for="item in userInfo.links" :key="item.id">
                <a :href="item.address">{{ item.name }}</a>
              </li>
            </ul>
            <p>{{userInfo.location.name}}</p>
            <p>{{userInfo.summaryOfBio}}</p>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
    <div v-if="showInfo" class="info">
      Center is {{ center.lat }}, {{ center.lng }}
      zoom is {{ zoom }}, text is: {{ text }}
      icon position is {{withPopup}}
      userInfo is {{userInfo}}
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
      showInfo:false,
      text: "",
      userInfo: {
        name:'',
        links:'',
        location:{ 
          name:''
        },
        summaryOfBio:''
      },
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
      this.zoom = zoom;
    },
    centerUpdate(center) {
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
              this.userInfo = response.data;
              this.withPopup = latLng(response.data.location.latitude,response.data.location.longitude);
            }
          })
          .catch(err=>{
            console.log(err);

            this.$Progress.fail();
          });
      }
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
