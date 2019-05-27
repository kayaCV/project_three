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

/**
 * T-SHIRT INFO
 */

// Hide T-Shirt Color menu: EXTRA CREDIT
$('#colors-js-puns').hide();

// Create div and append after T-Shirt Color
const $shirtDiv = $('<div>');
$shirtDiv.addClass('shirt-stuff');
$('#colors-js-puns').after($shirtDiv);

// Show only T-Shirt color options that match the design selected after Design is selected
$('#design').change(function() {
    $('#colors-js-puns').show(); // Show T-Shirt Color menu: EXTRA CREDIT
    if(this.value === 'js puns') {
        $shirtDiv.html(`<font size="7"; face="Comic Sans MS">{ ; }</font>`); // Display symbols on $shirtDiv
        $('form').css({'outline' : 'turquoise solid thick'}); // Change frorm outline color
        $('#colors-js-puns option:contains("Tomato")').removeAttr('selected'); // Deselect "Tomato"
        $('#colors-js-puns option:contains("Cornflower Blue")').attr('selected', 'true'); // Select "Cornflower Blue"
        $('#colors-js-puns option:contains("JS shirt")').hide(); // Hide all options containing "JS shirt"
        $('#colors-js-puns option:contains("JS Puns")').show(); // Show all options containing '"JS Puns"
    } else if(this.value === 'heart js'){
        $shirtDiv.html(`<font size="7"; face="Comic Sans MS">{&hearts;}</font>`); // Display symbols on $shirtDiv
        $('form').css({'outline' : 'pink solid thick'}); // Change frorm outline color
        $('#colors-js-puns option:contains("Cornflower")').removeAttr('selected'); // Deselect "Cornflower Blue"
        $('#colors-js-puns option:contains("Tomato")').attr('selected', 'true'); // Select "Tomato"
        $('#colors-js-puns option:contains("JS Puns")').hide(); // Hide all options containing "JS Puns"
        $('#colors-js-puns option:contains("JS shirt")').show(); // Show all options containing "JS shirt"
    } else {
        $('#colors-js-puns').hide();
        $shirtDiv.hide(); // Hide $shirtDiv if no Design has been chosen
    }
});

/**
 * REGISTER FOR ACTIVITIES
 */

// Div to hold total activities cost
const $newDiv = $('<div>');
$newDiv.addClass('total-cost');
$('.activities').append($newDiv);
let totalActivityCost = 0; // Total activity cost initially set to $0

// Disable conflicting activities; Show total activity cost on div created above 
$('.activities input').change(function(e) {
    $('.activities input').css({'outline' : 'none'});
    const justClicked = $(this).parent();
    const justClickedText = justClicked.text()
    const begTime = justClickedText.indexOf('—');
    const endTime = justClickedText.indexOf(',');
    const workshopSchedule = justClickedText.slice(begTime,endTime); // Get day and time for chosen activities
    const $Sign = justClickedText.indexOf('$');   
    const activityPrice = justClickedText.slice($Sign);  
    const resultingPrice = parseInt(activityPrice.replace(/^[$,]+/g,"")); // Remove $; convert to number​ type    
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

// Span to display error messages
function errorMsg(text, sib) {
    const errorSpan = $('<span>').text(text).hide();  // span to display error message, initially hidden
    $(sib).after(errorSpan);  // appended after field
    return errorSpan;
}

// Check if Name is valid
const nameErrorSpan = errorMsg('Please enter your name', '#name'); // Span to display Name error message
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
// EXTRA CREDIT: Name live validation
$('#name').on("input", e => {
    const name = e.target.value;
    isNameValid(name);
});


const emailErrorSpan = errorMsg('Please enter valid email format', '#mail')// span to display Email error message

// Check if Email is valid
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

// EXTRA CREDIT: Email live validation
$('#mail').on("input", e => {
    const mail = e.target.value;                   
    const valid = /^[^@]+@[^@.]+\.[a-z]+$/i.test(mail); // check if email format is valid
    emailErrorSpan.show();  
    isMailValid(valid);
});

// Check if at least one checkbox under the "Register for Activities" is checked
function activitiesChecked(activities) {
    if(activities.is(':checked')) {
        return true;
    } else {
        activities.css({'outline-color' : 'lime', 'outline-style' : 'solid'});
        $('.total-cost').text(`Please pick at least one activity`);
        return false;   
    }
}

const ccErrorSpan = $('<div>').hide();          // span to display Credit Card error messages, initially hidden
$('#exp-month').prev().before(ccErrorSpan);     // appended after CVV field

// Check if Card Card is valid
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

// Check if Card Number is valid
function ccNumberValid(ccNum) {                    
    const isValid = /^[0-9]{13,16}$/.test(ccNum); // Card Number accepts numbers between 13 to 16 digits
    ccErrorSpan.show();
    return ccValid('#cc-num', isValid, ccNum, 'Enter a number with 13 to 16 digits', 13, 16);        
}

// EXTRA CREDIT: 'Card Number' live validation
$('#cc-num').on("input", e => {
    const cc = $('#cc-num').val();  
    ccNumberValid(cc);
});

// Check if Zip Code is valid
function zipCodeValid(zipNum) {
    const isZipValid = /^[0-9]{5}$/.test(zipNum); // Zip Code only accepts 5 digit numbers
    const errorMessage = 'Zip codes must contain 5 digits';
    ccErrorSpan.show(); 
    return ccValid('#zip', isZipValid, zipNum, errorMessage, 5, 5);  
}

// EXTRA CREDIT: Zip Code live validation
$('#zip').on("input", e => {
    const zipNum = $('#zip').val();   
    zipCodeValid(zipNum);
});

// Check if CVV number is valid 
function cvvNumberValid(cvvNum) {
    const isCvvValid = /^[0-9]{3}$/.test(cvvNum); // CVV only accepts 3 digit numbers
    ccErrorSpan.show();
    return  ccValid('#cvv', isCvvValid, cvvNum, 'Cvv codes must contain 3 digits', 3, 3);     
}

// EXTRA CREDIT: CVV live validation
$('#cvv').on("input", e => {
    const cvvNum = $('#cvv').val();                   
    cvvNumberValid(cvvNum);            
});

const buttonErrorSpan = errorMsg('Please correct highlighted fields', 'button'); // Display message under 'Submit' button

// If selected payment option is "Credit Card," validate all three fields under Credit Card 'Payment Info'
function ccValidation(cc, zip, cvv) {
    const cardNumValid = ccNumberValid(cc);
    const zipValid = zipCodeValid(zip);
    const cvvValid = cvvNumberValid(cvv);
    if(cardNumValid === false | zipValid === false | cvvValid === false)  {
        ccErrorSpan.text('Please enter valid numbers');
        return false;
    }
}
// Validate form on submit; display error messages if error present
$('form').submit(function(e) {
    const nameValidity = isNameValid($('#name').val()); // Validate Name
    const mailValidity = isMailValid($('#mail').val()); // Validate Email
    const checkActivities = activitiesChecked($('.activities input')); // Validate Activities
    const ccValidity = ccValidation($('#cc-num').val(),$('#zip').val(),$('#cvv').val()); // Validate Credit Card fields
 
    if($('#payment option[value="credit card"]').is(':checked') && ccValidity === false 
        || checkActivities === false || nameValidity === false || mailValidity === false) {
        buttonErrorSpan.slideDown();
        e.preventDefault();
    }
});
