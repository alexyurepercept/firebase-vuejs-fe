<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Dashboard</div>
          <div class="card-body">
            <gmap-autocomplete class="introInput" @place_changed="setPlace">
            </gmap-autocomplete>
            <GmapMap
              :center="center"
              :zoom="7"
              map-type-id="terrain"
              style="width: 500px; height: 300px"
            >
              <DirectionsRenderer :directions="directions" />
            </GmapMap>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import DirectionsRenderer from "../directives/DirectionsRenderer.js";
export default {
  components: { DirectionsRenderer },
  data() {
    return {
      mapData: {
        attrs: {},
        listeners: {}
      },
      center: {
        lat: 0,
        lng: 0
      },
      directions: {},
      error: null,
      markers: null
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: "user"
    })
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace: function(place) {
      console.log(place);
      let directionService = new window.google.maps.DirectionsService();
      var request = {
        origin: this.center,
        destination: place.formatted_address,
        travelMode: "DRIVING"
      };
      directionService.route(request, (result, status) => {
        if (status == "OK") {
          console.log(result);
          this.directions = result;
        }
      });
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      });
    }
  }
};
</script>
