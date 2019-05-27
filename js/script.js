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

const $shirtDiv = $('<div>');
$shirtDiv.addClass('shirt-stuff');
$('#colors-js-puns').after($shirtDiv);

// Show only T-Shirt color options that match the design selected after Design is selected
$('#design').change(function() {
    $('#colors-js-puns').show();
    if(this.value === 'js puns') {
        $shirtDiv.html(`<font size="7"; face="Comic Sans MS">{ ; }</font>`);
        $('form').css({'outline-color' : 'turquoise', 'outline-style' : 'solid'});
        $('#colors-js-puns option:contains("Tomato")').removeAttr('selected');
        $('#colors-js-puns option:contains("Cornflower Blue")').attr('selected', 'true');
        $('#colors-js-puns option:contains("JS shirt")').hide();
        $('#colors-js-puns option:contains("JS Puns")').show();
    } else if(this.value === 'heart js'){
        $shirtDiv.html(`<font size="7"; face="Comic Sans MS">{&hearts;}</font>`);
        $('form').css({'outline-color' : 'pink', 'outline-style' : 'solid'});
        $('#colors-js-puns option:contains("Cornflower")').removeAttr('selected');
        $('#colors-js-puns option:contains("Tomato")').attr('selected', 'true');
        $('#colors-js-puns option:contains("JS Puns")').hide();
        $('#colors-js-puns option:contains("JS shirt")').show();
    } else {
        $('#colors-js-puns').hide();
        $shirtDiv.hide();
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

// Disable conflicting activities; Show total activity cost on div created above 
$('.activities input').change(function(e) {
    $('.activities input').css({'outline' : 'none'});
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
            } else { 
                inputElements.eq(i).prop('disabled', false).parent().css({'text-decoration': '', 'color' : '#000'}); // Enable the current input[i]​ element when clicked input is unchecked
            }
        }
    }

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
    $('#payment option:selected').each(function() {
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


const nameErrorSpan = $('<span>').text('Please enter your name').hide();  // span to display error message, initially hidden
$('#name').after(nameErrorSpan);  // appended after Name field

function isNameValid(name) {
    if (name.length > 0 ) {        
        $('#name').css('borderColor', '#c1deeb');
        nameErrorSpan.hide(); // if Name field is not empty, hide error message, textfield border color normal
        return true;
    } else {
        $('#name').css('borderColor', 'lime');
        nameErrorSpan.show();   // If Name field is empty, show error message, textfield border color red
        return false;
    }
}
// Name field can't be blank.
$('#name').on("input", e => {
    const name = e.target.value;
    isNameValid(name);
});

// Email field must be a validly formatted e-mail address 
const emailErrorSpan = $('<span>').text('Please enter valid email format').hide(); // span to display error message, initially hidden
$('#mail').after(emailErrorSpan);  // appended after Name field

function isMailValid(valid) {
    if (valid) {
        $('#mail').css({'borderColor' : '#c1deeb'}); 
        emailErrorSpan.hide();
        return true;                        // if email format is valid, hide error message, textfield border color normal
    } else {
        $('#mail').css({'borderColor' : 'lime'});
        emailErrorSpan.show();    
        return false;                      // if not, show error message, textfield border color yellow
    }
}

$('#mail').on("input", e => {
    const mail = e.target.value;                   
    const valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(mail); // check if email format is valid
    emailErrorSpan.show();                           // EXTRA CREDIT: real-time validation
    isMailValid(valid);
});

// User must select at least one checkbox under the "Register for Activities" section of the form.
function activitiesChecked(activities) {
    if(activities.is(':checked')) {
        return true;
    } else {
        activities.css({'outline-color' : 'lime', 'outline-style' : 'solid'});
        $('.total-cost').text(`Please pick at least one activity`);
        return false;   
    }
}


// If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, 
// a Zip Code, and a 3 number CVV value before the form can be submitted.


        // Credit Card field should only accept a number between 13 and 16 digits.

const ccErrorSpan = $('<div>').hide();          // span to display error message, initially hidden
$('#exp-month').prev().before(ccErrorSpan);     // appended after Name field

function ccValid(input,valid,inputValue,text, num1, num2 ) {
    if(valid) {
        $(input).css({'borderColor' : '#c1deeb'}); 
        ccErrorSpan.hide();    
        return true;
    } else {
        if(isNaN(inputValue) === true) {
            ccErrorSpan.text('Enter numbers only'); 
        } else if(inputValue.length < num1 | inputValue.length > num2) {
            ccErrorSpan.text(text); 
        } else {
            ccErrorSpan.text('');
        }
        ccErrorSpan.show(); 
        $(input).css({'borderColor' : 'lime'});
        return false;
    }
}

// Check if credit card number is valid


function ccNumberValid(ccNum) {                    
    const isValid = /^[0-9]{13,16}$/.test(ccNum); // check if credit card number is valid
    ccErrorSpan.show();                           // EXTRA CREDIT: real-time validation
    return ccValid('#cc-num', isValid, ccNum, 'Enter a number with 13 to 16 digits', 13, 16);        
}

$('#cc-num').on("input", e => {
    const cc = $('#cc-num').val();  
   //console.log(cc);
    ccNumberValid(cc);
});

// reformat cedit card
$('#cc-num').blur(function(e){
    const ccRegex = /^(\d{4})\d(?=\d{4})|\d(?=\d{4})/;
    let ccNumber = e.target.value;
    return ccNumber.replace(ccRegex, '$1 $2 $3');                  
});

// Check if Zip Code is valid
function zipCodeValid(zipNum) {
    const isZipValid = /^[0-9]{5}$/.test(zipNum); // Zip Code only accepts 5 digit numbers
    const errorMessage = 'Zip codes must contain 5 digits';
    ccErrorSpan.show();                           // EXTRA CREDIT: real-time validation
    return ccValid('#zip', isZipValid, zipNum, errorMessage, 5, 5);  
}
$('#zip').on("input", e => {
    const zipNum = $('#zip').val();   
    zipCodeValid(zipNum);
});

// Check if CVV number is valid 
function cvvNumberValid(cvvNum) {
    const isCvvValid = /^[0-9]{3}$/.test(cvvNum); // CVV only accepts 3 digit numbers
    ccErrorSpan.show();                           // EXTRA CREDIT: real-time validation
    return  ccValid('#cvv', isCvvValid, cvvNum, 'Cvv codes must contain 3 digits', 3, 3);     
}

$('#cvv').on("input", e => {
    const cvvNum = $('#cvv').val();                   
    cvvNumberValid(cvvNum);            
});

const buttonErrorSpan = $('<div>').hide();          // span to display error message, initially hidden
$('button').after(buttonErrorSpan);     // appended after Name field

function ccValidation(cc, zip, cvv) {
    const ccValid = ccNumberValid(cc);
    const zipValid = zipCodeValid(zip);
    const cvvValid = cvvNumberValid(cvv);
    if(ccValid === false | zipValid === false | cvvValid === false)  {
        ccErrorSpan.text('Please enter valid numbers');
        return false;
    }
}

$('form').submit(function(e) {
    const name = $('#name').val();
    const email = $('#mail').val();
    const cc = $('#cc-num').val();
    const zip = $('#zip').val();
    const cvv = $('#cvv').val();
    const activities = $('.activities input');
    const nameValidity = isNameValid(name);
    const mailValidity = isMailValid(email);
    const checkActivities = activitiesChecked(activities);
    const ccValidity = ccValidation(cc,zip,cvv);
 
    if($('#payment option[value="credit card"]').is(':checked') && ccValidity === false 
        || checkActivities === false || nameValidity === false || mailValidity === false) {
        buttonErrorSpan.slideDown();
        e.preventDefault();
        buttonErrorSpan.text('Please correct highlighted fields');   
    }
});
