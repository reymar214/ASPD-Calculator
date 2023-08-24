
   // Set all textboxes to have a value of 0
document.addEventListener('DOMContentLoaded', function () {
  const allTextboxes = document.querySelectorAll('input[type="text"]');
  allTextboxes.forEach(function (textbox) {
    textbox.value = '0';
  });
});
   


    // Function to calculate the sum and update the resultTotalDEX element
function calculateAndDisplayDEXSum() {
  let sum = 0;

  const dexInputs = document.querySelectorAll('[id*="DEX"]');
  dexInputs.forEach(function (inputElement) {
    if (inputElement.id !== 'resultTotalDEX') {
      const inputValue = parseInt(inputElement.value);
      sum += isNaN(inputValue) ? 0 : inputValue;
    }
  });

  // Display the sum in the resultTotalDEX element
  const resultTotalDEX = document.getElementById('resultTotalDEX');
  resultTotalDEX.value = sum.toFixed(0);
}

// Attach event listeners to DEX input elements for real-time calculation 
document.addEventListener('DOMContentLoaded', function () {
  const dexInputs = document.querySelectorAll('[id*="DEX"]');
  dexInputs.forEach(function (inputElement) {
    if (inputElement.id !== 'resultTotalDEX') {
      inputElement.addEventListener('input', calculateAndDisplayDEXSum);
    }
  });
});

// Function to calculate the sum, update the resultTotalAGI element, and calculate ASPD correction
function calculateAndDisplayAGISum() {
  let sum = 0;
  let aspdCorrection = 0;

  const agiInputs = document.querySelectorAll('[id*="AGI"]');
  agiInputs.forEach(function (inputElement) {
    if (inputElement.id !== 'resultTotalAGI') {
      const inputValue = parseInt(inputElement.value);
      sum += isNaN(inputValue) ? 0 : inputValue;
    }
  });

  // Display the sum in the resultTotalAGI element
  const resultTotalAGI = document.getElementById('resultTotalAGI');
  resultTotalAGI.value = sum.toFixed(0);

  // Calculate ASPD correction
  const aspdCorrectionValue = parseFloat(resultTotalAGI.value);
  if (aspdCorrectionValue < 205) {
    aspdCorrection = ((Math.sqrt(205) - Math.sqrt(aspdCorrectionValue)) / 7.15).toFixed(3);
  }

  // Display ASPD correction in the resultTotalASPDCorrection element
  const resultTotalASPDCorrection = document.getElementById('resultTotalASPDCorrection');
  resultTotalASPDCorrection.value = aspdCorrection;
}

// Attach event listeners to AGI input elements for real-time calculation 
document.addEventListener('DOMContentLoaded', function () {
  const agiInputs = document.querySelectorAll('[id*="AGI"]');
  agiInputs.forEach(function (inputElement) {
    if (inputElement.id !== 'resultTotalAGI') {
      inputElement.addEventListener('input', calculateAndDisplayAGISum);
    }
  });
});

// Function to calculate the sum and update the resultTotalASPDPerc element
function calculateAndDisplayPercSum() {
  let sum = 0;

  const percInputs = document.querySelectorAll('[id*="PercentASPD"]');
  percInputs.forEach(function (inputElement) {
    if (inputElement.id !== 'resultTotalASPDPerc') {
      const inputValue = parseInt(inputElement.value);
      sum += isNaN(inputValue) ? 0 : inputValue;
    }
  });

  // Display the sum in the resultTotalASPDPerc element
  const resultTotalASPDPerc = document.getElementById('resultTotalASPDPerc');
  resultTotalASPDPerc.value = sum.toFixed(0);
}

// Attach event listeners to perc input elements for real-time calculation 
document.addEventListener('DOMContentLoaded', function () {
  const percInputs = document.querySelectorAll('[id*="PercentASPD"]');
  percInputs.forEach(function (inputElement) {
    if (inputElement.id !== 'resultTotalASPDPerc') {
      inputElement.addEventListener('input', calculateAndDisplayPercSum,"%");
    }
  });
});


// Function to calculate the sum and update the resultTotalFlatASPD element
function calculateAndDisplayFlatASPDSum() {
  let sum = 0;

  const flatASPDInputs = document.querySelectorAll('[id*="FlatASPD"]');
  flatASPDInputs.forEach(function (inputElement) {
    if (inputElement.id !== 'resultTotalFlatASPD') {
      const inputValue = parseInt(inputElement.value);
      sum += isNaN(inputValue) ? 0 : inputValue;
    }
  });

  // Display the sum in the resultTotalFlatASPD element
  const resultTotalFlatASPD = document.getElementById('resultTotalFlatASPD');
  resultTotalFlatASPD.value = sum.toFixed(0);
}

// Attach event listeners to FlatASPD input elements for real-time calculation 
document.addEventListener('DOMContentLoaded', function () {
  const flatASPDInputs = document.querySelectorAll('[id*="FlatASPD"]');
  flatASPDInputs.forEach(function (inputElement) {
    if (inputElement.id !== 'resultTotalFlatASPD') {
      inputElement.addEventListener('input', calculateAndDisplayFlatASPDSum);
    }
  });
});

// Function to calculate ASPD penalty based on jobBaseASPD and update resultTotalASPDPenalty element
function calculateAndDisplayASPDPenalty() {
  const jobBaseASPD = parseFloat(document.getElementById('jobBaseASPD').value);
  let aspdPenalty = 0;

  if (jobBaseASPD > 145) {
    aspdPenalty = 1 - (jobBaseASPD - 144) / 50;
  } else {
    aspdPenalty = 0.96;
  }

  // Always set the aspdPenalty to 0.96 when jobBaseASPD is 0 or not provided
  if (isNaN(aspdPenalty)) {
    aspdPenalty = 0.96;
  }

  const resultTotalASPDPenalty = document.getElementById('resultTotalASPDPenalty');
  resultTotalASPDPenalty.value = aspdPenalty.toFixed(3);
}

// Set the initial ASPD penalty when the document loads
document.addEventListener('DOMContentLoaded', function () {
  calculateAndDisplayASPDPenalty(); // Call the function to set the initial value
  const jobBaseASPDInput = document.getElementById('jobBaseASPD');
  jobBaseASPDInput.addEventListener('input', calculateAndDisplayASPDPenalty);
});


// Function to calculate resultTotalBaseASPD and display the formula result
function calculateBaseASPD() {
  const jobBaseASPD = parseFloat(document.getElementById('jobBaseASPD').value) || 0;
  const shieldPenalty = parseFloat(document.getElementById('shieldPenalty').value) || 0;
  const resultTotalASPDCorrection = parseFloat(document.getElementById('resultTotalASPDCorrection').value) || 0;
  const resultTotalAGI = parseFloat(document.getElementById('resultTotalAGI').value) || 0;
  const resultTotalDEX = parseFloat(document.getElementById('resultTotalDEX').value) || 0;
  const resultTotalASPDPenalty = parseFloat(document.getElementById('resultTotalASPDPenalty').value) || 0;
  const attackSpeedPotion = parseFloat(document.getElementById('attackSpeedPotion').value) || 0;
  const skillAttackSpeedPercent = parseFloat(document.getElementById('skillAttackSpeedPercent').value) || 0;

  // Calculate the formula
  const formulaBaseASPDResult = (
    200 - (200 - (jobBaseASPD + shieldPenalty - resultTotalASPDCorrection +
      Math.sqrt((resultTotalAGI * 9.9987) + (resultTotalDEX * 0.1922)) * resultTotalASPDPenalty)) *
      (1 - (attackSpeedPotion / 100) - (skillAttackSpeedPercent / 100))
  );

  // Update the resultTotalBaseASPD textbox
  const resultTotalBaseASPD = document.getElementById('resultTotalBaseASPD');
  resultTotalBaseASPD.value = formulaBaseASPDResult.toFixed(3);
}

// Attach event listeners to input elements for real-time calculation
document.addEventListener('DOMContentLoaded', function () {
  const inputElements = document.querySelectorAll('input[type="number"]');
  inputElements.forEach(function (inputElement) {
    inputElement.addEventListener('input', calculateBaseASPD);
  });
});

// Function to calculate and display the formula result
function calculateEquipASPDPerc() {
  const resultTotalBaseASPD = parseFloat(document.getElementById('resultTotalBaseASPD').value) || 0;
  const resultTotalASPDPerc = parseFloat(document.getElementById('resultTotalASPDPerc').value) || 0;

  const formulaResult = (
    (195 - resultTotalBaseASPD) * (resultTotalASPDPerc / 100)
  ).toFixed(2);

  const resultEquipPercASPD = document.getElementById('resultEquipPercASPD');
  resultEquipPercASPD.value = formulaResult;
}

// Attach event listeners to input elements for real-time calculation
document.addEventListener('DOMContentLoaded', function () {
  const inputElements = document.querySelectorAll('input[type="number"]');
  inputElements.forEach(function (inputElement) {
    inputElement.addEventListener('input', calculateEquipASPDPerc);
  });
});

//Calculate Final ASPD
function calculateTotalASPD() {
  const resultTotalBaseASPD = parseFloat(document.getElementById('resultTotalBaseASPD').value) || 0;
  const resultEquipPercASPD = parseFloat(document.getElementById('resultEquipPercASPD').value) || 0;
  const resultTotalFlatASPD = parseFloat(document.getElementById('resultTotalFlatASPD').value) || 0;

  const totalASPD = resultTotalBaseASPD + resultEquipPercASPD + resultTotalFlatASPD;

  const resultTotalASPD = document.getElementById('resultTotalASPD');
  resultTotalASPD.value = totalASPD.toFixed(3);
}

// Attach event listeners to input elements for real-time calculation
document.addEventListener('DOMContentLoaded', function () {
  const inputElements = document.querySelectorAll('input[type="number"]');
  inputElements.forEach(function (inputElement) {
    inputElement.addEventListener('input', calculateTotalASPD);
  });
});

//Calculate attacks per second
function calculateAttacksPerSec() {
  const resultTotalASPD = parseFloat(document.getElementById('resultTotalASPD').value) || 0;

  const attacksPerSec = 50 / (200 - Math.floor(resultTotalASPD));

  const resultAttacksPerSec = document.getElementById('resultAttacksPerSec');
  resultAttacksPerSec.value = attacksPerSec.toFixed(3);
}

// Attach event listeners to input elements for real-time calculation
document.addEventListener('DOMContentLoaded', function () {
  const inputElements = document.querySelectorAll('input[type="number"]');
  inputElements.forEach(function (inputElement) {
    inputElement.addEventListener('input', calculateAttacksPerSec);
  });
});

//Calculate Damage per Second
function calculateDamagePerSec() {
  const resultAttacksPerSec = parseFloat(document.getElementById('resultAttacksPerSec').value) || 0;
  const damagePerHit = parseFloat(document.getElementById('damagePerHit').value) || 0;

  const damagePerSec = resultAttacksPerSec * damagePerHit;

  const resultDamagePerSec = document.getElementById('resultDamagePerSec');
  resultDamagePerSec.value = damagePerSec.toFixed(3);
}

// Attach event listeners to input elements for real-time calculation
document.addEventListener('DOMContentLoaded', function () {
  const inputElements = document.querySelectorAll('input[type="number"]');
  inputElements.forEach(function (inputElement) {
    inputElement.addEventListener('input', calculateDamagePerSec);
  });
});




//Calculate class, rhand, lhand final
document.addEventListener('DOMContentLoaded', function () {
  const classSelect = document.getElementById('classSelect');
  const rHandSelect = document.getElementById('rHand');
  const testSampleTextbox = document.getElementById('jobBaseASPD');
  

  // Mapping of class values
  const classValueMappings = {
    'rk': '156',
    'rg': '156',
    'wl': '151',
    'sr': '156',
    'gc': '156',
    'sc': '156',
    'su': '158',
    'ab': '151',
    'ra': '156',
    'wd': '156',
    'ma': '156',
    'me': '156',
    'ge': '156',
    'sn': '156',
    're': '146',
    'ka': '156',
    'ob': '156'
    // Other mappings here
  };

// Mapping of rHand values for each class to corresponding text values and numeric values
const rHandValueMappings = {
  'rk': [
    { value: 'dg', text: 'Dagger', numericValue: '7' },
    { value: '1hs', text: '1H Sword', numericValue: '10' },
    { value: '2hs', text: '2H Sword', numericValue: '15' },
    { value: '1ha', text: '1H Axe', numericValue: '18' },
    { value: '2ha', text: '2H Axe', numericValue: '20' },
    { value: 'mc', text: 'Mace', numericValue: '5' },
    { value: '1hspe', text: '1H Spear', numericValue: '8' },
    { value: '2hspe', text: '2H Spear', numericValue: '12' }
    // ... other rHand options for Rune Knight
  ],
  'rg': [
    { value: 'dg', text: 'Dagger', numericValue: '7' },
    { value: '1hs', text: '1H Sword', numericValue: '5' },
    { value: '2hs', text: '2H Sword', numericValue: '9' },
    { value: '1ha', text: '1H Axe', numericValue: '8' },
    { value: '2ha', text: '2H Axe', numericValue: '12' },
    { value: 'mc', text: 'Mace', numericValue: '4' },
    { value: '1hspe', text: '1H Spear', numericValue: '10' },
    { value: '2hspe', text: '2H Spear', numericValue: '10' }
  ],
  'wl': [
    { value: 'dg', text: 'Dagger', numericValue: '7' },
    { value: '1hst', text: '1H Staff/Rod', numericValue: '5' },
    { value: '2hst', text: '2H Staff', numericValue: '5' },
    { value: 'sd', text: 'Staff of Destruction', numericValue: '15' },
  ],
  'sr': [
    { value: 'dg', text: 'Dagger', numericValue: '10' },
    { value: '1hst', text: '1H Staff/Rod', numericValue: '5' },
    { value: '2hst', text: '2H Staff', numericValue: '5' },
    { value: 'sd', text: 'Book', numericValue: '5' },
  ],
  'gc': [
    { value: 'dg', text: 'Dagger', numericValue: '2' },
    { value: '1hs', text: '1H Sword', numericValue: '25' },
    { value: '1ha', text: '1H Axe', numericValue: '40' },
    { value: 'kat', text: 'Katar', numericValue: '2' },
  ],
  'sc': [
    { value: 'dg', text: 'Dagger', numericValue: '3' },
    { value: '1hs', text: '1H Sword', numericValue: '7' },
    { value: '1ha', text: 'Bow', numericValue: '7' },
  ],
  'su': [
    { value: 'mc', text: 'Mace', numericValue: '5' },
    { value: '1hst', text: '1H Staff', numericValue: '10' },
    { value: '2hst', text: '2H Staff', numericValue: '12' },
    { value: 'knk', text: 'Knuckle', numericValue: '1' },
  ],
  'ab': [
    { value: 'mc', text: 'Mace', numericValue: '0' },
    { value: '1hst', text: '1H Staff', numericValue: '15' },
    { value: '2hst', text: '2H Staff', numericValue: '10' },
    { value: 'bk', text: 'Book', numericValue: '1' },
    { value: 'knk', text: 'Knuckle', numericValue: '-5' },
  ],
  'ra': [
    { value: 'dg', text: 'Dagger', numericValue: '9' },
    { value: 'bw', text: 'Bow', numericValue: '15' },
  ],
  'wd': [
    { value: 'dg', text: 'Dagger', numericValue: '012' },
    { value: 'bw', text: 'Bow', numericValue: '10' },
    { value: 'inst', text: 'Instrument', numericValue: '5' },
  ],
  'ma': [
    { value: 'dg', text: 'Dagger', numericValue: '012' },
    { value: 'bw', text: 'Bow', numericValue: '10' },
    { value: 'inst', text: 'Instrument', numericValue: '5' },
  ],
  'me': [
    { value: 'dg', text: 'Dagger', numericValue: '20' },
    { value: '1hs', text: '1H Sword', numericValue: '25' },
    { value: '1ha', text: '1H Axe', numericValue: '5' },
    { value: '2ha', text: '2H Axe', numericValue: '8' },
    { value: 'mc', text: 'Mace', numericValue: '8' },
  ],
  'ge': [
    { value: 'dg', text: 'Dagger', numericValue: '10' },
    { value: '1hs', text: '1H Sword', numericValue: '4' },
    { value: '1ha', text: '1H Axe', numericValue: '11' },
    { value: '2ha', text: '2H Axe', numericValue: '11' },
    { value: 'mc', text: 'Mace', numericValue: '5' },
  ],
  // ... other class mappings
};

// Function to populate rHand dropdown options based on selected class
function populateRHandOptions(selectedClass) {
  const rHandOptions = rHandValueMappings[selectedClass];
  rHandSelect.innerHTML = ''; // Clear existing options

  for (const option of rHandOptions) {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.text;
    rHandSelect.appendChild(optionElement);
  }
}

// Event listener for class selection
classSelect.addEventListener('change', function () {
  const selectedClass = classSelect.value;
  populateRHandOptions(selectedClass); // Populate rHand dropdown options
  updateOutput(); // Update output when class or rHand changes
});

// Event listener for rHand selection
rHandSelect.addEventListener('change', function () {
  updateOutput(); // Update output when class or rHand changes
});

// Function to update the output textbox with the subtraction result
function updateOutput() {
  const selectedClass = classSelect.value;
  const selectedRHand = rHandSelect.value;

  // Look up the corresponding numeric values in the mappings
  const classNumericValue = parseInt(classValueMappings[selectedClass]);
  const rHandNumericValue = parseInt(rHandValueMappings[selectedClass].find(option => option.value === selectedRHand).numericValue);

  // Calculate the subtraction result
  const subtractionResult = classNumericValue - rHandNumericValue;

  // Update the output textbox with the subtraction result
  testSampleTextbox.value = subtractionResult;
}

// Call the event listener initially to set the initial output value
classSelect.dispatchEvent(new Event('change'));
});