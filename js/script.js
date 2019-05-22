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

// Hide #colors-js-puns (T-Shirt Color) text field: EXTRA CREDIT
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
    const justClicked = $(this).parent();
    const justClickedText = justClicked.text()
    const begTime = justClickedText.indexOf('—'); // em dash: shift+option+minus (-); regular dash only capture after 4pm
    const endTime = justClickedText.indexOf(',');
    const workshopSchedule = justClickedText.slice(begTime,endTime); // Get day and time for chosen activities
    const $Sign = justClickedText.indexOf('$');   
    const activityPrice = justClickedText.slice($Sign);  
    const resultingPrice = parseInt(activityPrice.replace(/^[$,]+/g,"")); // Remove $; convert resultingPrice to number​ type    
    const inputElements = $('.activities input');    // target all of the ‘.activities input’ ​elements

    for(let i = 0; i < inputElements.length; i++) {
        let inputElementsText = inputElements.eq(i).parent().text(); // text content of the label​ of input​ element at [i]

        if(inputElementsText.includes(workshopSchedule) && inputElementsText != justClickedText) {       
            if(this.checked) {
                inputElements.eq(i).prop('disabled', true).parent().css({'text-decoration' : 'line-through', 'color': 'gray'}); // Disable and strikeout and gray out current input[i]​ element (conflicting activitiy) if clicked input is checked
                //inputElements.eq(i).parent().css('color', 'gray');
            } else { 
                inputElements.eq(i).prop('disabled', false).parent().css({'text-decoration': '', 'color' : '#000'}); // Enable the current input[i]​ element when clicked input is unchecked
            }
        }
    }
    
/**
 * .css({
   'font-size' : '10px',
   'width' : '30px',   #000
   'height' : '10px'
});
 */

// Display total cost
    if(this.checked) {                 // if the clicked input is checked, add cost to the total cost variable; display total
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

// Selected payment is shown and the others are hidden.
$('#credit-card').next().hide().next().hide(); // Hide all 
$('#payment option[value="select_method"]').wrap('<span>').hide() // Hide the “Select Payment Method” `option`
$('#payment').change(function (){
    $( "#payment option:selected" ).each(function() {
        if($(this).text() === 'Credit Card') {
            $('#credit-card').fadeIn().next().hide().next().hide(); // Show credit card payment section, hide the others
        } else if($(this).text() === 'PayPal'){
            $('#credit-card').hide().next().slideDown().next().hide(); // Show PayPal payment section, hide the others
        } else if($(this).text() === 'Bitcoin'){
            $('#credit-card').hide().next().hide().next().slideDown(); // Show Bitcoin payment section, hide the others
        }
    });
});

/** 
 *  Form validation
*/

// If any of the following validation errors exist, prevent the user from submitting the form:
//append a span element near each invalid input with a friendly error message.

// Name field can't be blank.
const nameErrorSpan = $('<span>').text('Please enter your name').hide();  // span to display error message, initially hidden
$('#name').after(nameErrorSpan);

$('#name').on("input", e => {
    const name = e.target.value;
    if (name.length > 0 ) {        
        $('#name').css('borderColor', '#c1deeb');
        nameErrorSpan.hide(); // if Name field is not empty, hide error message, textfield border color normal
        return true;
    } else {
        $('#name').css('borderColor', 'red');
        nameErrorSpan.show();   // If Name field is empty, show error message, textfield border color red
        return false;
    }
});

// Email field must be a validly formatted e-mail address 
const emailErrorSpan = $('<span>').text('Please enter valid email format').hide(); // span to display error message, initially hidden
$('#mail').after(emailErrorSpan);

$('#mail').on("input", e => {
    const mail = e.target.value;                   
    const valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(mail); // check if email format is valid
    emailErrorSpan.show();                           // EXTRA CREDIT: real-time validation- show error message as soon as user starts typing
    
    if (valid) {
        $('#mail').css({'borderColor' : '#c1deeb'}); 
        emailErrorSpan.hide();
        return true;                        // if email format is valid, hide error message, textfield border color normal
    } else {
        $('#mail').css({'borderColor' : 'red'});
        emailErrorSpan.show();    
        return false;                      // if not, show error message, textfield border color red
    }
});
// $('#mail').focusout(function (e) {  // remove error message and border color back to normal when focus is out
//     if(e.target.value === '') {
//         $('#mail').css({'borderColor' : '#c1deeb'});
//         emailErrorSpan.hide();
//     }
// });   


// User must select at least one checkbox under the "Register for Activities" section of the form.


// If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, 
// a Zip Code, and a 3 number CVV value before the form can be submitted.


        // Credit Card field should only accept a number between 13 and 16 digits.


        // The Zip Code field should accept a 5-digit number.


        // The CVV should only accept a number that is exactly 3 digits long.


