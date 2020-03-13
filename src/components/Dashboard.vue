<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <div class="card">
          <div class="card-header">Map</div>
          <div class="card-body">
            <div v-if="directionsError" class="alert alert-danger">
              {{ directionsError }}
            </div>
            <gmap-autocomplete
              class="introInput"
              @place_changed="setPlace"
              style="width: 100%;margin: 10px 0"
            >
            </gmap-autocomplete>
            <GmapMap
              :center="center"
              :zoom="7"
              map-type-id="terrain"
              style="width: 100%; height: 300px"
            >
              <DirectionsRenderer :directions="directions" />
            </GmapMap>
          </div>
        </div>
        <div class="card">
          <div class="card-header">Admin API</div>
          <div class="card-body">
            API /admin_only
            <button v-on:click="sendRequest">Send Admin Request</button>

            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div v-if="message" class="alert alert-success">{{ message }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import DirectionsRenderer from '../directives/DirectionsRenderer.js';
export default {
  components: { DirectionsRenderer },
  data() {
    return {
      mapData: {
        attrs: {},
        listeners: {},
      },
      center: {
        lat: 0,
        lng: 0,
      },
      directions: {},
      error: null,
      directionsError: null,
      markers: null,
      message: '',
    };
  },
  computed: {
    // map `this.user` to `this.$store.getters.user`
    ...mapGetters({
      user: 'user',
    }),
  },
  mounted() {
    this.geolocate();
  },
  methods: {
    setPlace: function(place) {
      let directionService = new window.google.maps.DirectionsService();
      var request = {
        origin: this.center,
        destination: place.formatted_address,
        travelMode: 'DRIVING',
      };
      directionService.route(request, (result, status) => {
        if (status == 'OK') {
          this.directions = result;
          this.directionsError = null;
        } else {
          this.directionsError = `directions returns ${status}`;
        }
      });
    },
    geolocate: function() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });
    },
    sendRequest: function() {
      axios
        .get(
          'https://us-central1-fir-auth-eclipx.cloudfunctions.net/api/admin_only',
          {
            headers: {
              Authorization: 'Bearer ' + this.user.data.idToken,
            },
          },
        )
        .then(response => {
          this.message = `${response.status}\n${JSON.stringify(
            response.data,
            null,
            2,
          )}`;
          this.error = '';
        })
        .catch(err => {
          this.error = `${err.stack}`;
          this.message = '';
        });
    },
  },
};
</script>
