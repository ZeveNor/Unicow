const classList = document.querySelector('.class-list');
const colorInput = document.querySelector('.color-summit');
const idInput = document.getElementById('staticID');
const nameEnInput = document.getElementById('staticNameEN');
const nameThInput = document.getElementById('staticNameTH');
const descInput = document.getElementById('staticDesc');

function addNewClassToUI() {
  const newClassBox = document.createElement('div');
  newClassBox.classList.add('border', 'rounded-3', 'class-box');

  const imageBox = document.createElement('div');
  imageBox.classList.add('rounded-top-3', 'image');
  imageBox.style.backgroundColor = colorInput.value;

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content', 'p-3');

  const titleEn = document.createElement('h6');
  titleEn.textContent = nameEnInput.value || 'New Class';
  contentDiv.appendChild(titleEn);

  const titleTh = document.createElement('p');
  titleTh.textContent = nameThInput.value || '';
  contentDiv.appendChild(titleTh);

  const description = document.createElement('small');
  description.textContent = descInput.value || 'No description provided.';
  contentDiv.appendChild(description);

  newClassBox.appendChild(imageBox);
  newClassBox.appendChild(contentDiv);

  // Insert the new class box before the "create new" box
  const createNewBox = document.querySelector('.create-new');
  classList.insertBefore(newClassBox, createNewBox);

  // Reset the form inputs
  resetFormInputs();
}

// Function to reset the form inputs
function resetFormInputs() {
  idInput.value = '';
  nameEnInput.value = '';
  nameThInput.value = '';
  descInput.value = '';
  colorInput.value = '#6db32c';
}

// Function to add a new class to the database
async function addNewClassToDB() {
  const newClassData = {
    subject_id: idInput.value,
    subject_name_en: nameEnInput.value,
    subject_name_th: nameThInput.value,
    description: descInput.value,
    color: colorInput.value
  };

  try {
    const response = await fetch('http://localhost:4200/api/subjects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newClassData)
    });

    if (response.ok) {
      // After successfully adding to the database, add the class to the UI
      addNewClassToUI();
    } else {
      console.error('Failed to add the new class');
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

// Event listener for the "Next" button to submit the form
const submitButton = document.querySelector('.class-summit');
submitButton.addEventListener('click', addNewClassToDB);
