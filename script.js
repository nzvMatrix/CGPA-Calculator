// Function to add a new semester section
function addSemester() {
  const semestersContainer = document.getElementById('semestersContainer');

  const semesterDiv = document.createElement('div');
  semesterDiv.classList.add('semester');

  const semesterIndex = semestersContainer.children.length + 1;

  semesterDiv.innerHTML = `
    <h3>Semester ${semesterIndex}</h3>
    <button type="button" onclick="removeSemester(this)">Remove Semester</button>
    <div class="subjects-container">
      <div class="subject">
        <input type="text" id="subjectName${semesterIndex}" placeholder="Subject Name">
        <div class="subject-details">
          <div class="marks-container">
            <label>Obtained Marks:</label>
            <input type="number" id="obtainedMarks${semesterIndex}" placeholder="Obtained Marks">
          </div>
          <div class="marks-container">
            <label>Max Marks:</label>
            <input type="number" id="maxMarks${semesterIndex}" placeholder="Max Marks">
          </div>
          <div class="credits-container">
            <label>Obtained Credits:</label>
            <input type="number" id="obtainedCredits${semesterIndex}" placeholder="Obtained Credits">
          </div>
          <div class="credits-container">
            <label>Max Credits:</label>
            <input type="number" id="maxCredits${semesterIndex}" placeholder="Max Credits">
          </div>
        </div>
        <button type="button" onclick="removeSubject(this)">Remove Subject</button>
      </div>
    </div>
    <button type="button" onclick="addSubject(this)">Add Subject</button>
  `;

  semestersContainer.appendChild(semesterDiv);
}

// Function to add a new subject within a semester
function addSubject(button) {
  const subjectsContainer = button.previousElementSibling;
  const semesterIndex = Array.from(subjectsContainer.parentElement.parentElement.children).indexOf(subjectsContainer.parentElement) + 1;

  const subjectDiv = document.createElement('div');
  subjectDiv.classList.add('subject');

  subjectDiv.innerHTML = `
    <input type="text" id="subjectName${semesterIndex}" placeholder="Subject Name">
    <div class="subject-details">
      <div class="marks-container">
        <label>Obtained Marks:</label>
        <input type="number" id="obtainedMarks${semesterIndex}" placeholder="Obtained Marks">
      </div>
      <div class="marks-container">
        <label>Max Marks:</label>
        <input type="number" id="maxMarks${semesterIndex}" placeholder="Max Marks">
      </div>
      <div class="credits-container">
        <label>Obtained Credits:</label>
        <input type="number" id="obtainedCredits${semesterIndex}" placeholder="Obtained Credits">
      </div>
      <div class="credits-container">
        <label>Max Credits:</label>
        <input type="number" id="maxCredits${semesterIndex}" placeholder="Max Credits">
      </div>
    </div>
    <button type="button" onclick="removeSubject(this)">Remove Subject</button>
  `;

  subjectsContainer.appendChild(subjectDiv);
}

// Function to remove a semester
function removeSemester(button) {
  button.parentElement.remove();
  updateSemesterLabels();
}

// Function to remove a subject
function removeSubject(button) {
  button.parentElement.remove();
}

// Function to update semester labels after removal
function updateSemesterLabels() {
  const semesters = document.querySelectorAll('.semester');
  semesters.forEach((semester, index) => {
    semester.querySelector('h3').textContent = `Semester ${index + 1}`;
  });
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
}
