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
    
   // Inside the activity change​ event listener:
// Use an if else ​statement to check if the clicked input is checked or unchecked — the
// .checked​ property will be helpful here
// If the input is checked, add the cost to the total cost variable above, else subtract
// the cost — the .checked​ property will be helpful here
// totalActivityCost += resultingPrice;
// $newDiv.innerHtml = `Total: \$ ${totalActivityCost}`;
// FInally, display the cost — set the text of the total cost element you created above
// equal to the string ‘Total: $’ concatenated with the current value of the total cost
// variable above
    if(this.checked) {
        totalActivityCost += resultingPrice;
        $('.total-cost').text(`Total: \$ ${totalActivityCost}`);
    } else { 
        totalActivityCost -= resultingPrice;
        $('.total-cost').text(`Total: \$ ${totalActivityCost}`);
        if(totalActivityCost === 0){    // If totalActivityCost = 0, show no text in .total-cost div
            $('.total-cost').text('');
        }
    }
    


});