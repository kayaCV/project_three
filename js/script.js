/******************************************
Treehouse Techdegree:
FSJS project 3 - Interactive Form
******************************************/

/**
 * BASIC INFO
 */

// Set focus on Name text field
$('#name').focus();

// // Hide #other-title text field
$('#other-title').hide();

// Show #other-title text field only if "other" is chosen from #title drop down menu
$('#title').change( function() {
    this.value === 'other' ? $("#other-title").show() : $("#other-title").hide();
});

/**
 * T-SHIRT INFO
 */

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

// Create a DOM element like a span​ or div​ and store it in a global variable
// Append the new element to the .activity​ section
// You can check the elements tab in the Chrome DevTools to check that your span
//element is in the DOM
// Create a global variable to store total activity cost — initially set to 0 — don't use
//const​ since you want to update this as needed


const $newDiv = $('<div>');
$('.activities').append($newDiv);
let totalActivityCost = 0;

// Create a change​ event listener for the activity section
// Inside the event listener:
// Create a variable to store the input​ element that was just clicked — event.target​ is
//helpful here
// Create a variable to store the text content of the parent label​ element of the input
//element that was just clicked — the above variable combined with the .parent()​ and
//.text()​ methods will be helpful here
// Log out the variable storing the label’s text content to ensure you’re capturing the
//right info

$('.activities input').change(function(e) {
    e.preventDefault();
    const justClicked = $(this).parent();
    const justClickedText = justClicked.text()

// Inside the activity change​ event listener:
// Create a variable to store the index of the em dash ‘—​’ in the label’s text content you
// stored in a variable above
// Create a variable to store the index of the comma ‘,​’ in the label’s text content you
//stored in a variable above
// Create a variable to store the day and time text of the activity that’s been clicked —
// the em dash and comma index variables above and the .slice()​ method are helpful here
// Log out the day and time variable above to be sure you’re capturing the right info
   //console.log(justClickedText);



    const begTime = justClickedText.indexOf('—'); // em dash: shift+option+minus (-); regular dash only capture after 4pm
    const endTime = justClickedText.indexOf(',');
    const workshopSchedule = justClickedText.slice(begTime,endTime);
    


// Inside the activity change​ event listener:
// Create a variable to target all of the ‘.activities input’ ​elements
    const inputElements = $('.activities input')
    //console.log(inputElements);

// Loop over all the input elements
    for(let i = 0; i < inputElements.length; i++) {
// Inside the loop, create a variable to store the text content of the label​ parent of the
// input​ element at the current loop iteration [i]
        let inputElementsText = inputElements.eq(i).parent().text();

        // Use an if​ statement to check if the current label text variable you just created
// includes the day and time variable above &&​ if the current label text variable does not
// equal the variable you created earlier with the label text of the element that was just
// clicked — the .includes()​ method will be helpful for the first half of this clause

// Inside the conditional, use an if else​ statement to check if the clicked input is
// checked or unchecked
   // If the input that was just clicked is checked
     // disable the current input[i]​ element in the loop — the .disabled​ property will be
     // helpful here
   // Else
     // enable the current input[i]​ element in the loop
    
        if(inputElementsText.includes(workshopSchedule) && inputElementsText != justClickedText) {       
            if(this.checked) {
                inputElements.eq(i).prop('disabled', true);
            } else { 
                inputElements.eq(i).prop('disabled', false);
            }
        }
    }







    
});