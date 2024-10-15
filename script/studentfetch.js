let res;
const grid = new gridjs.Grid({
  columns: ['ID', 'Name', 'Sex', 'Date of Birth','Phone Number', 'Email', 'Status', 'Manage'],
  search: true,
  sort: true, 
  pagination: { 
    limit: 10
  },
  resizable: true,
  server: {
    url: 'http://localhost:4200/api/students',
    then: data => {
      res = data;
      if (data.status === '200') {
        return data.result.map((student, index) => [
          student.id,
          `${student.first_name} ${student.last_name}`,
          student.sex,
          new Date(student.date_of_birth).toLocaleDateString(),
          student.telephone,
          student.email,
          student.status,
          gridjs.html(
            `<!DOCTYPE html>
            <html lang='en'>
            <head>
              <meta charset='UTF-8'/>
              <meta name='viewport' content='width=device-width, initial-scale=1.0'/>
              <title>Document</title>
              <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
              <style>
                .row-button{
                  padding: 3px 5px;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  cursor: pointer;
                }
              </style>
            </head>
            <body>
              <div class="d-flex flex-row gap-2">
                <div onclick="" class="row-button">
                  <center><box-icon name='edit-alt' size="18px" type='solid' color='#797a79'></box-icon></center>
                </div>
                <div onclick="deleteStudent(${student.id})" class="row-button">
                  <center><box-icon name='trash-alt' size="18px" type='solid' color='#797a79'></box-icon></center>
                </div>
              </div>
            </body>
            </html>
            `
          ),
        ]);
      } else {
        console.error('Error fetching data:', data.message);
        return [];
      }
    }
  },
  style: {
    th: {
      color: '#676a6a',
    },
    table: {
      width: 'fit-content'
    },
  },
  className: {
    table: 'table-container',
    tr: 'table-body',
    pagination: 'table-pagination'
  },
  language: {
    'search': {
      'placeholder': 'Search name, email...'
    },
    'pagination': {
      'previous': 'Previous',
      'next': 'Next',
      'showing': 'Showing',
      'results': () => 'Records'
    }
  }
});

grid.on('rowClick', (event, row) => {
  const studentId = row.cells[0].data; 
});

grid.render(document.getElementById("table"));

function deleteStudent(studentId) {
  if (confirm(`Are you sure you want to delete the student with ID: ${studentId}?`)) {
    fetch(`http://localhost:4200/api/students/delete/${studentId}`, {
      method: 'PUT'
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Error deleting student with ID: ${studentId}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.status === '200') {
          alert(`Student with ID: ${studentId} deleted successfully.`);
          
          location.reload();
        } else {
          console.error('Failed to delete the student:', data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

function editStudent(studentId) {
  alert(`Edit student with ID: ${studentId}`);
}

let resMobile;

const grid2 = new gridjs.Grid({
  columns: ['ID', 'Name','Status'],
  search: true,
  sort: true,
  pagination: {
    limit: 10
  },
  resizable: true,
  server: {
    url: 'http://localhost:4200/api/students',
    then: data => {
      resMobile = data;
      if (data.status === '200') {
        return data.result.map(student => [
          student.id,
          `${student.first_name} ${student.last_name}`,
          student.status
        ]);
      } else {
        console.error('Error fetching data:', data.message);
        return [];
      }
    }
  },
  style: {
    th: {
      color: '#676a6a',
    },
    table: {
      width: 'fit-content'
    },
  },
  className: {
    table: 'table-container',
    tr: 'table-body',
    pagination: 'table-pagination'
  },
  language: {
    'search': {
      'placeholder': 'Search name, email...'
    },
    'pagination': {
      'previous': 'Previous',
      'next': 'Next',
      'showing': 'Showing',
      'results': () => 'Records'
    }
  }
});

grid2.on('rowClick', (event, row) => {
  const studentId = row.cells[0].data;

  const studentData = resMobile.result.find(student => student.id === studentId);

  if (studentData) {
    document.getElementById('student-id').textContent = studentData.id;
    document.getElementById('first-name').textContent = studentData.first_name;
    document.getElementById('last-name').textContent = studentData.last_name;
    document.getElementById('telephone').textContent = studentData.telephone;
    document.getElementById('email').textContent = studentData.email;
    document.getElementById('dob').textContent = new Date(studentData.date_of_birth).toLocaleDateString();
    document.getElementById('status').textContent = studentData.status;
    document.getElementById('sex').textContent = studentData.sex;
    document.getElementById('previous-school').textContent = studentData.previous_school;
    document.getElementById('address').textContent = studentData.address;

  } else {
    console.error('Student data not found for ID:', studentId);
  }
});

grid2.render(document.getElementById("table-mobile"));