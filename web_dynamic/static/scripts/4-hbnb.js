$(function () {
  const listAmens = {};
  $('div.amenities li input').change(function (event) {
    if ($(this).is(':checked')) {
      listAmens[this.dataset.id] = this.dataset.name;
    } else {
      delete listAmens[this.dataset.id];
    }
    const names = Object.values(listAmens);
    $('div.amenities h4').text(names.join(', '));
  });
  $('.filters button').click(function (event) {
    $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      type: 'POST',
      contentType: 'application/json',
      dataType: 'JSON',
      data: JSON.stringify({ amenities: Object.keys(listAmens) }),
      success: function (data) {
        let newHTML = [];
        for (let i = 0; i < data.length; i++) {
          newHTML.push(htmlCode(data[i]));
        }
        newHTML = newHTML.join('');
        $('section.places > article').remove();
        $('section.places').append(newHTML);
      }
    });
  });
  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
  $.ajax({
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    type: 'POST',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $('section.places').append(htmlCode(data[i]));
      }
    }
  });
  function htmlCode (place) {
    return (
      `<article>
        <div class="title">
        <h2>${place.name}</h2>
        <div class="price_by_night" style="min-width: 70px">
      $${place.price_by_night}
          </div>
        </div>
        <div class="information">
          <div class="max_guest">
        <i class="fa fa-users fa-3x" aria-hidden="true"></i>
        <br />
        ${place.max_guest} Guests
          </div>
          <div class="number_rooms">
        <i class="fa fa-bed fa-3x" aria-hidden="true"></i>
        <br />
        ${place.number_rooms} Bedrooms
          </div>
          <div class="number_bathrooms">
        <i class="fa fa-bath fa-3x" aria-hidden="true"></i>
        <br />
        ${place.number_bathrooms} Bathroom
          </div>
        </div>
        <div class="user">
        </div>
        <div class="description">
          ${place.description}
      </div>
      </article>`);
  }
});
