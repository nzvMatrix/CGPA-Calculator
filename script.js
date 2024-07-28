// Function to add a new semester section
function addSemester(semesterData = null) {
  const semestersContainer = document.getElementById('semestersContainer');

  const semesterDiv = document.createElement('div');
  semesterDiv.classList.add('semester');

  const semesterIndex = semestersContainer.children.length + 1;

  semesterDiv.innerHTML = `
    <h3>Semester ${semesterIndex}</h3>
    <button type="button" onclick="removeSemester(this)">Remove Semester</button>
    <div class="subjects-container"></div>
    <button type="button" onclick="addSubject(this)">Add Subject</button>
  `;

  semestersContainer.appendChild(semesterDiv);

  if (semesterData) {
    semesterData.subjects.forEach(subjectData => addSubject(semesterDiv.querySelector('.subjects-container'), subjectData));
  }

  // Ensure content aligns to the top after adding a semester
  document.body.style.alignItems = 'flex-start';

  saveData();
}

// Function to add a new subject within a semester
function addSubject(buttonOrContainer, subjectData = null) {
  const subjectsContainer = buttonOrContainer instanceof HTMLElement && buttonOrContainer.classList.contains('subjects-container')
    ? buttonOrContainer
    : buttonOrContainer.previousElementSibling;
  const semesterIndex = Array.from(subjectsContainer.parentElement.parentElement.children).indexOf(subjectsContainer.parentElement) + 1;

  const subjectDiv = document.createElement('div');
  subjectDiv.classList.add('subject');

  subjectDiv.innerHTML = `
    <input type="text" id="subjectName${semesterIndex}" placeholder="Subject Name" value="${subjectData ? subjectData.subjectName : ''}">
    <div class="subject-details">
      <div class="marks-container">
        <label>Obtained Marks:</label>
        <input type="number" id="obtainedMarks${semesterIndex}" placeholder="Obtained Marks" value="${subjectData ? subjectData.obtainedMarks : ''}">
      </div>
      <div class="marks-container">
        <label>Max Marks:</label>
        <input type="number" id="maxMarks${semesterIndex}" placeholder="Max Marks" value="${subjectData ? subjectData.maxMarks : ''}">
      </div>
      <div class="credits-container">
        <label>Obtained Credits:</label>
        <input type="number" id="obtainedCredits${semesterIndex}" placeholder="Obtained Credits" value="${subjectData ? subjectData.obtainedCredits : ''}">
      </div>
      <div class="credits-container">
        <label>Max Credits:</label>
        <input type="number" id="maxCredits${semesterIndex}" placeholder="Max Credits" value="${subjectData ? subjectData.maxCredits : ''}">
      </div>
    </div>
    <button type="button" onclick="removeSubject(this)">Remove Subject</button>
  `;

  subjectsContainer.appendChild(subjectDiv);

  // Ensure content aligns to the top after adding a subject
  document.body.style.alignItems = 'flex-start';

  saveData();
}

// Function to remove a semester
function removeSemester(button) {
  button.parentElement.remove();
  updateSemesterLabels();
  saveData();
}

// Function to remove a subject
function removeSubject(button) {
  button.parentElement.remove();
  saveData();
}

// Function to update semester labels after removal
function updateSemesterLabels() {
  const semesters = document.querySelectorAll('.semester');
  semesters.forEach((semester, index) => {
    semester.querySelector('h3').textContent = `Semester ${index + 1}`;
  });
  saveData();
}

// Function to calculate GPA, CGPA, and SGPA
function calculateResults() {
  let totalMarks = 0;
  let totalMaxMarks = 0;
  let totalCredits = 0;
  let totalMaxCredits = 0;
  let semesterResults = '';

  document.querySelectorAll('.semester').forEach((semester, index) => {
    let semesterTotalMarks = 0;
    let semesterTotalMaxMarks = 0;
    let semesterTotalCredits = 0;
    let semesterTotalMaxCredits = 0;

    const subjects = semester.querySelectorAll('.subject');
    subjects.forEach(subject => {
      const obtainedMarks = parseFloat(subject.querySelector('input[id^="obtainedMarks"]').value) || 0;
      const maxMarks = parseFloat(subject.querySelector('input[id^="maxMarks"]').value) || 0;
      const obtainedCredits = parseFloat(subject.querySelector('input[id^="obtainedCredits"]').value) || 0;
      const maxCredits = parseFloat(subject.querySelector('input[id^="maxCredits"]').value) || 0;

      // Calculate percentage and then convert to grade points based on the percentage
      const percentage = (obtainedMarks / maxMarks) * 100;
      let gradePoints = 0;

      if (percentage >= 85) gradePoints = 10;
      else if (percentage >= 75) gradePoints = 9;
      else if (percentage >= 65) gradePoints = 8;
      else if (percentage >= 55) gradePoints = 7;
      else if (percentage >= 50) gradePoints = 6;
      else if (percentage >= 45) gradePoints = 5;
      else if (percentage >= 40) gradePoints = 4;

      semesterTotalMarks += obtainedMarks;
      semesterTotalMaxMarks += maxMarks;
      semesterTotalCredits += gradePoints * maxCredits;
      semesterTotalMaxCredits += maxCredits;
    });

    totalMarks += semesterTotalMarks;
    totalMaxMarks += semesterTotalMaxMarks;
    totalCredits += semesterTotalCredits;
    totalMaxCredits += semesterTotalMaxCredits;

    const sgpa = (semesterTotalCredits / semesterTotalMaxCredits); // Assuming a 10-point scale
    semesterResults += `<p>Semester ${index + 1} SGPA: ${sgpa.toFixed(2)}</p>`;
  });

  const cgpa = (totalCredits / totalMaxCredits); // Assuming a 10-point scale

  document.getElementById('result').innerHTML = `
    ${semesterResults}
    <p>CGPA: ${cgpa.toFixed(2)}</p>
  `;

  saveData();
}

// Function to save data to localStorage
function saveData() {
  const semesters = [];
  document.querySelectorAll('.semester').forEach((semester, index) => {
    const subjects = [];
    semester.querySelectorAll('.subject').forEach(subject => {
      subjects.push({
        subjectName: subject.querySelector('input[id^="subjectName"]').value,
        obtainedMarks: subject.querySelector('input[id^="obtainedMarks"]').value,
        maxMarks: subject.querySelector('input[id^="maxMarks"]').value,
        obtainedCredits: subject.querySelector('input[id^="obtainedCredits"]').value,
        maxCredits: subject.querySelector('input[id^="maxCredits"]').value
      });
    });
    semesters.push({ subjects });
  });
  localStorage.setItem('semestersData', JSON.stringify(semesters));
}

// Function to load data from localStorage
function loadData() {
  const semestersData = JSON.parse(localStorage.getItem('semestersData')) || [];
  semestersData.forEach(semesterData => addSemester(semesterData));
}

// Load data when the page is loaded
window.onload = loadData;

// Event listener for adding semesters
document.getElementById('addSemesterBtn').addEventListener('click', function() {
  addSemester();
});
