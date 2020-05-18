$(document).ready(function () {
  const amenities = [];
  $('input[type=checkbox]').click(function () { // Select all checkbox elements
    if (this.checked) {
      amenities.push($(this).attr('data-name'));
      // Other way: amenities.push($(this).data('name'))
    } else {
      const index = amenities.indexOf($(this).attr('data-name'));
      amenities.splice(index, 1); // Delete element by index
    }
    // Now, let's add list elements to h4 within amenities css class
    if (amenities.length > 0) {
      $('.amenities > h4').text(amenities.join(', '));
    } else {
      /* If there is just one element, and I des-select it,
      it'll stay in h4, so... we need to replace it with &nbsp */
      $('.amenities > h4').html('&nbsp');
    }
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, status) {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (const places of data) {
        $('section.places').append('<article><h2>' +
          places.name + '</h2><div class="price_by_night"><p>$' +
            places.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
              places.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
                places.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
                  places.number_bathrooms + '</p></div></div><div class="description"><p>' +
                    places.description + '</p></div></article>');
      }
    }
  });

  $('button').click(function () {
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      success: function (data) {
        $('article').remove();
        for (const places of data) {
          $('section.places').append('<article><h2>' +
            places.name + '</h2><div class="price_by_night"><p>$' +
              places.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
                places.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
                  places.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
                    places.number_bathrooms + '</p></div></div><div class="description"><p>' +
                      places.description + '</p></div></article>');
        }
      }
    });
  });
});
