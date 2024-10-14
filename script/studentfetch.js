
let res;

const grid = new gridjs.Grid({
  columns: ['ID', 'Name', 'Sex', 'Date of Birth', 'Telephone', 'Email', 'Status'],
  search: true,
  sort: true,
  pagination: {
    limit: 5
  },
  height: '300px',
  server: {
    url: 'http://localhost:4200/api/students',
    then: data => {
      res = data;
      if (data.status === '200') {
        return data.result.map(student => [
          student.id,
          `${student.first_name} ${student.last_name}`,
          student.sex,
          new Date(student.date_of_birth).toLocaleDateString(),
          student.telephone,
          student.email,
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
  },
  className: {
    table: 'table-container',
    tr: 'table-body'
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

  const studentData = res.result.find(student => student.id === studentId);

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
    const qrCodeContainer = document.getElementById("qrcode");
    qrCodeContainer.innerHTML = "";

    new QRCode(qrCodeContainer, {
      text: studentData.id,
      width: 150,
      height: 150,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });

  } else {
    console.error('Student data not found for ID:', studentId);
  }
});

grid.render(document.getElementById("table"));