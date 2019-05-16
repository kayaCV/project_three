/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

// Set focus on Name text field
$('#name').focus();

// // Hide #other-title text field
$('#other-title').hide();

// // Hide #colors-js-puns (T-Shirt Color) text field (extra credit)
$('#colors-js-puns').hide();

// Show #other-title text field only if "other" is chosen from #title drop down menu
$('#title').change( function() {
    this.value === 'other' ? $("#other-title").show() : $("#other-title").hide();
});

// Show T-Shirt color options that match the design selected after Design is selected
$('#design').change(function() {
    $('#colors-js-puns').show();
    if(this.value === 'js puns') { 
        $('#colors-js-puns option:contains("Tomato")').removeAttr('selected');
        $('#colors-js-puns option:contains("Cornflower Blue")').attr('selected', 'true');
        $('#colors-js-puns option:contains("JS shirt")').hide();
        $('#colors-js-puns option:contains("JS Puns")').show();
    } else {
        $('#colors-js-puns option:contains("Cornflower")').removeAttr('selected');
        $('#colors-js-puns option:contains("Tomato")').attr('selected', 'true');
        $('#colors-js-puns option:contains("JS Puns")').hide();
        $('#colors-js-puns option:contains("JS shirt")').show();
    }
});

