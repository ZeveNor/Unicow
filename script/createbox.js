const classList = document.querySelector('.class-list');

const color = document.querySelector('.color-summit');
console.log(color.value);


function addNewClass() {
  const newClassBox = document.createElement('div');
  newClassBox.classList.add('border', 'rounded-3', 'class-box');

  const imageBox = document.createElement('div');
  imageBox.classList.add('rounded-top-3','image');
  imageBox.style.backgroundColor = color.value;

  const contentDiv = document.createElement('div');
  contentDiv.classList.add('content', 'p-3');
  const title = document.createElement('h6');
  title.textContent = 'New Class';

  
  contentDiv.appendChild(title);
  newClassBox.appendChild(imageBox);
  newClassBox.appendChild(contentDiv);

  const createNewBox = document.querySelector('.create-new');
  classList.insertBefore(newClassBox, createNewBox);
}

const createNewBox = document.querySelector('.class-summit');
createNewBox.addEventListener('click', addNewClass);
