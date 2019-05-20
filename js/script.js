/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

/**
 * BASIC INFO
 */

// Set focus on Name text field
$('#name').focus();

// Hide #other-title text field
$('#other-title').hide();

// Show #other-title text field only if "other" is chosen from #title drop down menu
$('#title').change( function() {
    this.value === 'other' ? $("#other-title").slideDown() : $("#other-title").fadeOut();
});

/******
 * T-SHIRT INFO
 ******/

// // Hide #colors-js-puns (T-Shirt Color) text field (extra credit)
$('#colors-js-puns').hide();

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

/**
 * REGISTER FOR ACTIVITIES
 */

// Div to hold total activities cost
const $newDiv = $('<div>');
$newDiv.addClass('total-cost');
$('.activities').append($newDiv);
let totalActivityCost = 0;

// Change​ event listener for the activity section:
    // Disable conflicting activities by comparing day and time for each activity
    // Show total activity cost on div created above 

$('.activities input').change(function(e) {
    e.preventDefault();
    const justClicked = $(this).parent();
    const justClickedText = justClicked.text()

    const begTime = justClickedText.indexOf('—'); // em dash: shift+option+minus (-); regular dash only capture after 4pm
    const endTime = justClickedText.indexOf(',');
    const workshopSchedule = justClickedText.slice(begTime,endTime); // Get day and time for chosen activities

    const $Sign = justClickedText.indexOf('$');   
    const activityPrice = justClickedText.slice($Sign);  
    const resultingPrice = parseInt(activityPrice.replace(/^[$,]+/g,"")); // Remove $; convert resultingPrice to number​ type
     
    const inputElements = $('.activities input')    // target all of the ‘.activities input’ ​elements

    for(let i = 0; i < inputElements.length; i++) {
        let inputElementsText = inputElements.eq(i).parent().text(); // text content of the label​ of input​ element at [i]

        if(inputElementsText.includes(workshopSchedule) && inputElementsText != justClickedText) {       
            if(this.checked) {
                inputElements.eq(i).prop('disabled', true); // Disable the current input[i]​ element if the clicked input is checked
            } else { 
                inputElements.eq(i).prop('disabled', false); // Enable the current input[i]​ element is unchecked
            }
        }
    }
    
// Display the cost
    if(this.checked) {                 // if the clicked input is checked, add the cost to the total cost variable; display total
        totalActivityCost += resultingPrice;
        $('.total-cost').text(`Total: \$ ${totalActivityCost}`);
    } else {                           // if the clicked input is unchecked, subtract the cost
        totalActivityCost -= resultingPrice;
        $('.total-cost').text(`Total: \$ ${totalActivityCost}`);
        if(totalActivityCost === 0){    // If totalActivityCost = 0, show no text in .total-cost div
            $('.total-cost').text('');
        }
    }
});

/**
 * SELECT PAYMENT
 */
//     Hide the “Select Payment Method” `option`
//$('#payment option[value="select_method"]').remove(); // will remove "Select method" from drop down menu
//$('#payment option[value="select_method"]').wrap('<span>').hide() // wrap it in a span, then hide WORKS! https://stackoverflow.com/questions/2031740/hide-select-option-in-ie-using-jquery
///$('#payment option[value="select_method"]').prop('disabled',true); // disables option

// ● Get the value of the payment select element, and if it’s equal to ‘Credit Card’, set the
// credit card payment section to show, and set the other two options to hide. The
// `.show()` and `.hide()` methods will be helpful here.
// ● Repeat the above step with the PayPal and BitCoin options so that the selected
// payment is shown and the others are hidden.
//$('#payment').next().hide();
$('#credit-card').hide();
$('#credit-card').next().hide();
$('#credit-card').next().next().hide();
$('#payment').change(function (){
    $('#payment option[value="select_method"]').wrap('<span>').hide()
    $( "#payment option:selected" ).each(function() {
        if($(this).text() === 'Credit Card') {
            $('#credit-card').fadeIn();
            $('#credit-card').next().hide();
            $('#credit-card').next().next().hide();
        } else if($(this).text() === 'PayPal'){
            $('#credit-card').hide();
            $('#credit-card').next().slideDown();
            $('#credit-card').next().next().hide();
        } else if($(this).text() === 'Bitcoin'){
            $('#credit-card').hide();
            $('#credit-card').next().hide();
            $('#credit-card').next().next().slideDown();
        }
    });
});



