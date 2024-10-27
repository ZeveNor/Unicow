const grid = new gridjs.Grid({
  columns: ['ID', 'Name', 'Action'],
  search: true,
  sort: true,
  resizable: true,
  server: {
    url: 'http://localhost:4200/api/students',
    then: data => {
      res = data;
      if (data.status === '200') {
        return data.result.map((student, index) => [
          student.id,
          `${student.first_name} ${student.last_name}`,

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
    }
  },
  className: {
    table: 'table-container',
    tr: 'table-body',
    pagination: 'table-pagination'
  },
});

grid.render(document.getElementById("table"));
