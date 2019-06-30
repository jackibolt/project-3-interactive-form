
////////////////////
// GLOBAL VARIABLES 

// Name variables
const $nameInput = $('#name');
const $otherRoleInput = $('#other-title');
const $userRole = $('#title');

// t-shirt variables
const $tshirtColorsDiv = $('#colors-js-puns');
const $tshirtTheme = $('#design');
const $tshirtColor = $('#color');

// activities variables
const $activitiesDiv = $('.activities');
const activitiesInput = document.querySelectorAll('.activities input');
const activities = document.querySelectorAll('.activities label');
let totalCost= 0;

// payment variables
const $paymentSelection = $('#payment');
const paymentOptions = document.querySelectorAll('#payment option')
const $creditCardDiv = $('#credit-card');
const $payPal = $('p:contains("PayPal")');
const $bitcoin = $('p:contains("Bitcoin")');

// validation variables
const $emailInput = $('#mail');
const $activitiesTitle = $('.activities legend');
const $creditCardInput = $('#cc-num');
const $zipInput = $('#zip');
const $cvvInput = $('#cvv');
const $submit = $('button');



/////////////////////
// PAGE FUNCTIONALITY

// FOCUS ON PAGE LOAD //
window.onload = () => {
    $nameInput.focus();
}


// 'OTHER' JOB ROLE INPUT //
$otherRoleInput.hide();

$userRole.on('change', () => {
    if ($userRole.val() === 'other') {
        $otherRoleInput.show();
    }
})


// T-SHIRT MENU FUNCTIONALITY // 

$tshirtColorsDiv.hide();

$tshirtTheme.on('change', () => {
    const tshirtOptions = document.querySelectorAll('#color option');

    // iterate through all tshirt color options
    for (let i=0; i< tshirtOptions.length; i+=1){
        // reset all tshirt options
        tshirtOptions[i].style.display = 'block';

        // if tshirt theme is js puns, don't show js heart options
        if ($tshirtTheme.val() === 'js puns' && tshirtOptions[i].textContent.includes('JS shirt only')) {
            $tshirtColorsDiv.show();
            $tshirtColor.val('cornflowerblue');
            tshirtOptions[i].style.display = 'none';
        }
        // if tshirt theme is js heart, don't show js puns options
        if ($tshirtTheme.val() === 'heart js' && tshirtOptions[i].textContent.includes('JS Puns shirt only')) {
            $tshirtColorsDiv.show();
            $tshirtColor.val('tomato');
            tshirtOptions[i].style.display = 'none';
        }
        if ($tshirtTheme.val() === 'Select Theme') {
            $tshirtColorsDiv.hide();
        };
    }

})


// ACTIVITIES FUNCTIONALITY // 

// Activities selection function
$activitiesDiv.on('change', (e) => {
    // reset total cost div on each change
    const totalCostCheck = document.querySelector('.total-cost');
    if (totalCostCheck){
        totalCostCheck.remove();
    }

    const currentCheckBox = e.target;
    const currentActivity = currentCheckBox.parentNode.textContent;
    
    // extract cost from activity text
    const indexOf$ = currentActivity.indexOf('$');
    const activityCost = parseInt(currentActivity.slice(indexOf$+1, currentActivity.length));

    // add or subtract activity cost from total
    if (currentCheckBox.checked === true ){
        totalCost = totalCost + activityCost;
    } else {
        totalCost = totalCost - activityCost;
    }

    // function to extract the day and time from activity text
    const dayTime = a => {
        const indexOfDash = a.indexOf('—');
        const indexOfComma = a.indexOf(',');
        return a.slice(indexOfDash+2, indexOfComma);        
    }

    // loop through activities options
    for (let i=0; i<activities.length; i+=1) {
        const activityCheckBox = activitiesInput[i];
        const activitiesText = activities[i].textContent;
        const activitiesTime = dayTime(activitiesText);
        const currentSelectTime = dayTime(currentActivity);
        // if times conflict and the loop isn't comparing the current selection to itself
        if (currentSelectTime === activitiesTime && currentActivity !== activitiesText) {
            // if current checkbox was checked, then disable the others & change text color
            if(currentCheckBox.checked){
                activityCheckBox.disabled = true;
                activityCheckBox.parentElement.style.color = 'rgb(128, 128, 128)';
            }
            // if current checkbox was unchecked, then renable others & change text to black 
            else {
                activityCheckBox.disabled = false;
                activityCheckBox.parentElement.style.color = 'black';
            }
        }
    }

    // append total cost div
    const totalCostDiv = document.createElement('div');
    totalCostDiv.className = 'total-cost';
    totalCostDiv.innerHTML = `<strong>Total Cost:</strong> $${totalCost}`;
    $activitiesDiv.append(totalCostDiv);
})


// PAYMENT FUNCTIONALITY
$paymentSelection.val('credit card');

$paymentSelection.on('change', () => {
    // reset credit card inputs
    $creditCardDiv.show();
    $payPal.show();
    $bitcoin.show();
    // hide select method option
    paymentOptions[0].style.display = 'none';

    if ($paymentSelection.val() !== 'credit card'){
        $creditCardDiv.hide();
    } 
    if ($paymentSelection.val() === 'credit card'){
        $payPal.hide();
        $bitcoin.hide();
    }
    else if ($paymentSelection.val() === 'paypal'){
        $bitcoin.hide();
    }
    else if ($paymentSelection.val() === 'bitcoin'){
        $payPal.hide();
    }
});



///////////////////////
// VALIDATION FUNCTIONS

// clear previous error messages
const removeError = () => {
    const $errorCheck = $('.error-message');
    if ($errorCheck || $error) {
        $errorCheck.remove();
        return true;
    }
}

// create error messages
const createErrorMessage = (message, element) => {
    element.addClass('error');
    let errorMessage = document.createElement('div');
    errorMessage.innerHTML = `<p>${message}</p>`;
    errorMessage.className = 'error-message alert-X';
    element.after(errorMessage);
}


// NAME VALIDATION
const regexName = /^\s*[a-z]+\s[a-z]+$/i;

// validate name on input
$nameInput.on('input', () => {
    removeError();
    if (regexName.test($nameInput.val())) {
        $nameInput.removeClass('error');
    } else {
        createErrorMessage('Please enter a valid first and last name with a space in between', $nameInput);
    };
})


// function to validate name, called on submit
const nameValidation = (input) => {
    if (regexName.test(input.val())) {
        input.removeClass('error');
    } else if (input.val() === ''){
        createErrorMessage('Please enter a valid first and last name', input);
    } else {
        createErrorMessage('Please enter a valid first and last name with a space in between', input);
    };
}


// EMAIL VALIDATION
const regexEmail = /^[^@]+@[^@]\w+\.[a-z]+$/i;

// validate email on input 
$emailInput.on('input', () => {
    removeError();
    if (regexEmail.test($emailInput.val())) {
        $emailInput.removeClass('error');
    } else {
        createErrorMessage('Please enter a valid email address (ex. jacki@sample.com).', $emailInput);
    };
})

// function to validate email, called on submit
const emailValidation = (input) => {
    if (regexEmail.test(input.val())) {
        input.removeClass('error');
    } else if (input.val() === ''){
        createErrorMessage('Please enter a valid email address.', input);
    } else {
        createErrorMessage('Please enter a valid email address (ex. jacki@sample.com).', input);
    };
}


// ACTIVITY VALIDATION

// function to validate activity div, called on submit
const activityValidation = () => {
    const checkedActivities = $('.activities input[type="checkbox"]:checked').length;
    if (checkedActivities < 1) {
        $activitiesTitle.addClass('activity-error');
        createErrorMessage('Please select at least one activity.', $activitiesTitle);
    } else {
        $activitiesDiv.removeClass('error');
        $activitiesDiv.removeClass('activity-error');
    }
}


// PAYMENT VALIDATION

// payment validation on blur
$paymentSelection.on('blur', () => {
    removeError();
    if ($paymentSelection.val() === 'select_method'){
        $paymentSelection.addClass('payment-error');
        createErrorMessage('Please select a payment method.', $paymentSelection);
    } else {
        $paymentSelection.removeClass('error');
        $paymentSelection.removeClass('payment-error');
    }
})

// function to validate payment, called on submit
const paymentValidation = (input) => {
    if (input.val() === 'select_method'){
        input.addClass('payment-error');
        createErrorMessage('Please select a payment method.', input);
    } else {
        input.removeClass('error');
    }
}


// CREDIT CARD VALIDATION
const regexCC = /^\d{4}-*\d{4}-*\d{4}-*\d{1,4}$/;

// credit card validation on input
$creditCardInput.on('input', () => {
    removeError();
    if (regexCC.test($creditCardInput.val())) {
        $creditCardInput.removeClass('error');
    } else {
        createErrorMessage('Enter a valid 13-16 digit credit card number', $creditCardInput);
    };
})

// function to validate credit card, called on sumbit
const creditCardNumberValidation = (input) => {
    if (regexCC.test(input.val())) {
        input.removeClass('error');
    } else {
        createErrorMessage('Enter a valid credit card number', input);
    // } else {
    //     createErrorMessage('Enter a valid 13-16 digit credit card number', input);
    };
}

// ZIP CODE VALIDATION
const regexZip = /^\d{5}$/;

// validate zip code on input
$zipInput.on('input', () => {
    removeError();
    if (regexZip.test($zipInput.val())) {
        $zipInput.removeClass('error');
    } else if ($zipInput.val() === '') {
        createErrorMessage('Enter a zip code', $zipInput);
    } else {
        createErrorMessage('Must be 5 digits', $zipInput);
    }
})

// function to validate zip code, called on submit
const zipCodeValidation = (input) => {
    if (regexZip.test(input.val())) {
        input.removeClass('error');
    } else if (input.val() === '') {
        createErrorMessage('Enter a zip code', input);
    } else {
        createErrorMessage('Must be 3 digits', input);
    }
}

// CVV VALIDATION
const regexCVV = /^\d{3}$/;

$cvvInput.on('input', () => {
    removeError();
    if (regexCVV.test($cvvInput.val())) {
        $cvvInput.removeClass('error');
    } else if ($cvvInput.val() === ''){
        createErrorMessage('Enter a cvv code', $cvvInput);
    } else {
        createErrorMessage('Must be 3 digits', $cvvInput);
    };
})

// function to validate cvv, called on submit
const cvvValidation = (input) => {
    if (regexCVV.test(input.val())) {
        input.removeClass('error');
    } else if (input.val() === ''){
        createErrorMessage('Enter a cvv code', input);
    } else {
        createErrorMessage('Must be 3 digits', input);
    };
}


// event listener to call all validators
$submit.on('click', (event) => {
    removeError();
    const $errorCheck = $('.error-message');
    nameValidation($nameInput);
    emailValidation($emailInput);
    activityValidation();
    paymentValidation($paymentSelection);
    if ($paymentSelection.val() === 'credit card'){
        creditCardNumberValidation($creditCardInput);
        zipCodeValidation($zipInput);
        cvvValidation($cvvInput);
    }
    if ($errorCheck || $error) {
        event.preventDefault();
        console.log('error messages are still occuring');
        }

})

