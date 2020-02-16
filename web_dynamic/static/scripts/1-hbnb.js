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
});
