
async function fetchAndDisplaySubjects() {
  try {
    const response = await fetch('http://localhost:4200/api/subjects');
    if (!response.ok) {
      throw new Error('Failed to fetch subjects');
    }

    const data = await response.json();

    if (data.result && data.result.length > 0) {
      data.result.forEach(subject => addSubjectToUI(subject));
    } else {
      console.log('No subjects found.');
    }
  } catch (error) {
    console.error('Error fetching subjects:', error);
  }
}

function addSubjectToUI(subject) {
  const newClassBox = document.createElement('div');
  newClassBox.classList.add('border', 'rounded-3', 'class-box', 'd-flex', 'flex-column');

  const imageBox = document.createElement('div');
  imageBox.classList.add('rounded-top-3', 'image');
  imageBox.style.backgroundColor = subject.color;

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content', 'p-3', 'class-content');

  const titleEn = document.createElement('h6');
  titleEn.textContent = subject.subject_name_en;
  contentDiv.appendChild(titleEn);
  
  const titleTh = document.createElement('p');
  titleTh.textContent = subject.subject_name_th;
  titleTh.style.fontSize = '12px';
  contentDiv.appendChild(titleTh);

  const description = document.createElement('p');
  description.textContent = subject.description;
  description.classList.add('mt-2');
  description.style.fontSize = '13px';
  description.style.color = '#656666';
  contentDiv.appendChild(description);

  const classButton = document.createElement('div');
  classButton.classList.add('d-flex', 'flex-row');

  const attendanceButton = document.createElement('a');
  attendanceButton.href = `./attendanceDashboard.html?subject=${subject.subject_id}`;
  attendanceButton.textContent = 'Mark Attendance';
  attendanceButton.classList.add('btn', 'class-btn' , 'mt-2');

  const removeButton = document.createElement('button');
  removeButton.type = "button";
  removeButton.textContent = 'Remove';
  removeButton.classList.add('btn', 'class-del-btn', 'mt-2');
  
  newClassBox.appendChild(imageBox);
  newClassBox.appendChild(contentDiv);
  classButton.appendChild(attendanceButton);
  classButton.appendChild(removeButton);
  newClassBox.appendChild(classButton);

  const createNewBox = document.querySelector('.create-new');
  classList.insertBefore(newClassBox, createNewBox);
}

document.addEventListener('DOMContentLoaded', fetchAndDisplaySubjects);

