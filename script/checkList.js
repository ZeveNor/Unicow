
let students = [];
let currentIndex = 0;
const sectionID = 3;
let selectedDate;

$('#staticTime').change(function () {
  selectedDate = $(this).val();
});

async function fetchStudents() {
  try {
    const response = await fetch(`http://localhost:4200/api/enroll/student/${subject}`);
    const data = await response.json();
    if (data.status === "200") {
      students = data.result;
      currentIndex = 0;
      displayStudent();
    } else {
      console.error("Failed to fetch students");
      document.getElementById("studentName").textContent = "No students found.";
    }
  } catch (error) {
    console.error("Error fetching students:", error);
    document.getElementById("studentName").textContent = "Error loading students.";
  }
}

function displayStudent() {
  if (currentIndex < students.length) {
    const student = students[currentIndex];
    document.getElementById("studentName").textContent = `${student.first_name} ${student.last_name}`;
  } else {
    document.getElementById("studentName").textContent = "All students checked.";
  }
}

async function postAttendance(status) {
  const student = students[currentIndex];

  const attendanceData = {
    student_id: student.student_id,
    section_id: sectionID,
    subject_id: subject,
    attendance_date: selectedDate,
    status: status,
    remark: status === "present" ? "On time" : "Late"
  };

  try {
    const response = await fetch('http://localhost:4200/api/attendances', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(attendanceData)
    });

    document.addEventListener('DOMContentLoaded', fetchAndDisplaySubjects);
    if (!response.ok) {
      throw new Error("Failed to post attendance");
    }
  } catch (error) {
    console.error("Error posting attendance:", error);
  }
}

async function handleAttendanceClick(event) {
  if (currentIndex >= students.length) return;

  event.preventDefault();
  const status = event.type === "click" ? "present" : "late";
  await postAttendance(status);
  currentIndex++;
  displayStudent();
}

document.querySelector(".detect-click-area").addEventListener("click", handleAttendanceClick);
document.querySelector(".detect-click-area").addEventListener("contextmenu", handleAttendanceClick);

document.getElementById("CheckModal").addEventListener("show.bs.modal", fetchStudents);