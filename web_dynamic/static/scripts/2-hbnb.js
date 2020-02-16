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

  $.get('http://0.0.0.0:5001/api/v1/status/', (data) => {
    if (data.status === 'OK') {
      $('DIV#api_status').addClass('available');
    } else {
      $('DIV#api_status').removeClass('available');
    }
  });
});
