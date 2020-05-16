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
});
