document.addEventListener('DOMContentLoaded', async function () {
  const studentsPerPage = 10; 
  let currentPage = 1;
  let totalPages = 0; 
  let students = [];

  try {
    const response = await fetch('http://localhost:4200/api/students');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    if (data.status === '200') {
      students = data.result;
      students += data.result;
      totalPages = Math.ceil(students.length / studentsPerPage);
      displayPage(currentPage);
      setupPagination();
    } else {
      console.error('Error fetching data');
    }
  } catch (error) {
    console.error('Error:', error);
  }

  function displayPage(page) {
    const tableBody = document.getElementById('studentTableBody');
    tableBody.innerHTML = ''; 
    const startIndex = (page - 1) * studentsPerPage;
    const endIndex = Math.min(startIndex + studentsPerPage, students.length);

    for (let i = startIndex; i < endIndex; i++) {
      const student = students[i];
      const row = `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.first_name}</td>
                    <td>${student.last_name}</td>
                    <td>${student.sex}</td>
                    <td>${new Date(student.date_of_birth).toLocaleDateString()}</td>
                    <td>${student.address}</td>
                    <td>${student.telephone}</td>
                    <td>${student.email}</td>
                    <td>${student.status}</td>
                </tr>
            `;
      tableBody.innerHTML += row;
    }
  }

  function setupPagination() {
    const pagination = document.getElementById('pagination');
    if (!pagination) return; 

    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');

    pagination.querySelectorAll('.page-number').forEach(node => node.remove());

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item', 'page-number');
      pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
      pageItem.addEventListener('click', function (event) {
        event.preventDefault();
        currentPage = i;
        displayPage(currentPage);
        updatePaginationButtons();
      });
      nextPage.parentNode.insertBefore(pageItem, nextPage);
    }

    prevPage.addEventListener('click', function (event) {
      event.preventDefault();
      if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
        updatePaginationButtons();
      }
    });

    nextPage.addEventListener('click', function (event) {
      event.preventDefault();
      if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
        updatePaginationButtons();
      }
    });

    updatePaginationButtons(); 
  }

  function updatePaginationButtons() {
    const prevPage = document.getElementById('prev-page');
    const nextPage = document.getElementById('next-page');

    if (currentPage === 1) {
      prevPage.classList.add('disabled');
    } else {
      prevPage.classList.remove('disabled');
    }

    if (currentPage === totalPages) {
      nextPage.classList.add('disabled');
    } else {
      nextPage.classList.remove('disabled');
    }

    document.querySelectorAll('.page-number').forEach((item, index) => {
      if (index + 1 === currentPage) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }
});
