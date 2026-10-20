const customMarker = document.createElement("div");
customMarker.className = "hover-marker";
customMarker.innerHTML = `<span class="marker-text">${listing.location}</span>`;

const map = new mapboxgl.Map({
  accessToken: mapToken,
  container: "map", // container ID
  center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
  zoom: 9, // starting zoom
});

const marker1 = new mapboxgl.Marker({ element: customMarker })
  .setLngLat(listing.geometry.coordinates) //Listing.gemotry.coordinates
  .setPopup(
    new mapboxgl.Popup({ offset: 25 })
      .setHTML(
        `<h4>${listing.location}</h4><p>Exact location will be provided after booking</p>`,
      )
      .setMaxWidth("300px"),
  )
  .addTo(map);

