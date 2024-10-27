async function fetchAndDisplaySubjects() {
  try {
    const response = await fetch(`http://localhost:4200/api/attendances/subject/${subject}`);
    if (!response.ok) {
      throw new Error('Failed to fetch attendance');
    }

    const data = await response.json();

    if (data.result && data.result.length > 0) {
      const groupedData = groupDataByDate(data.result);
      Object.keys(groupedData).forEach(date => {
        addGroupedAttendanceToUI(date, groupedData[date]);
      });
    } else {
      console.log('No attendance found.');
    }
  } catch (error) {
    console.error('Error fetching attendance:', error);
  }
}

function groupDataByDate(data) {
  return data.reduce((acc, attendance) => {
    const date = new Date(attendance.attendance_date).toLocaleDateString('en-GB'); 
    if (!acc[date]) acc[date] = [];
    acc[date].push(attendance);
    return acc;
  }, {});
}

function addGroupedAttendanceToUI(date, attendances) {
  const attendanceContainer = document.createElement('div');
  attendanceContainer.classList.add('attendance-container', 'mb-3', 'p-3', 'border', 'rounded');
  
  const dateHeader = document.createElement('h5');
  dateHeader.textContent = `Date: ${date}`;
  dateHeader.style.color = '#0d691f';
  attendanceContainer.appendChild(dateHeader);
  attendanceContainer.appendChild(document.createElement('hr'));
  

  // ===================================================
  const statusList = document.createElement('ol');
  statusList.classList.add('status-list');
  
  const typeList = document.createElement('p');
  typeList.style.marginLeft = '10px';
  typeList.style.fontSize = '14px';
  typeList.style.marginLeft = '10px';
  typeList.style.fontWeight = 'bold';
  
  let countPresent = 0;
  attendances.forEach(attendance => {
    if (attendance.status == "present") {
      countPresent++;
      const statusItem = document.createElement('li');
      statusItem.textContent = `${(attendance.name).toUpperCase()} ${attendance.first_name} ${attendance.last_name}`;
      statusList.appendChild(statusItem);
    }
  });
  
  typeList.textContent = `Present (${countPresent})`;
  attendanceContainer.appendChild(typeList);
  attendanceContainer.appendChild(statusList);


  // ===================================================
  const statusListLate = document.createElement('ol');
  statusListLate.classList.add('status-list');

  const typeListLate = document.createElement('p');
  typeListLate.style.marginLeft = '10px';
  typeListLate.style.fontSize = '14px';
  typeListLate.style.marginLeft = '10px';
  typeListLate.style.fontWeight = 'bold';
  
  let countLate = 0;
  attendances.forEach(attendance => {
    if (attendance.status == "late") {
      countLate++;
      const statusItems = document.createElement('li');
      statusItems.textContent = `${(attendance.name).toUpperCase()} ${attendance.first_name} ${attendance.last_name}`;
      statusListLate.appendChild(statusItems);
    }
  });
  
  typeListLate.textContent = `Late (${countLate})`;
  attendanceContainer.appendChild(typeListLate);
  attendanceContainer.appendChild(statusListLate);
  

  // ===================================================
  const mostRecentCreatedAt = new Date(attendances[0].createdat);
  const currentTime = new Date();
  const timeDiff = (currentTime - mostRecentCreatedAt) / (1000 * 60 * 60); 

  if (timeDiff < 2) { 
    document.querySelector('.Available').appendChild(attendanceContainer);
  } else {
    document.querySelector('.Achived').appendChild(attendanceContainer);
  }
}

document.addEventListener('DOMContentLoaded', fetchAndDisplaySubjects);
