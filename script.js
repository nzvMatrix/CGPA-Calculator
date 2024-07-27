// Function to add a new semester
function addSemester() {
  const semestersContainer = document.getElementById('semestersContainer');
  const semesterCount = semestersContainer.childElementCount;
  
  const semesterDiv = document.createElement('div');
  semesterDiv.classList.add('semester');
  semesterDiv.id = `semester-${semesterCount}`;

  semesterDiv.innerHTML = `
    <h3>Semester ${semesterCount + 1}</h3>
    <button onclick="removeSemester('${semesterDiv.id}')">Remove Semester</button>
    <div class="subjects-container" id="subjects-${semesterCount}">
      <!-- Subject form will be appended here -->
    </div>
    <button onclick="addSubject(${semesterCount})">Add Subject</button>
  `;

  semestersContainer.appendChild(semesterDiv);
}

// Function to add a new subject to a specific semester
function addSubject(semesterIndex) {
  const subjectsContainer = document.getElementById(`subjects-${semesterIndex}`);

  const subjectCount = subjectsContainer.childElementCount;

  const subjectDiv = document.createElement('div');
  subjectDiv.classList.add('subject');
  subjectDiv.id = `subject-${semesterIndex}-${subjectCount}`;

  subjectDiv.innerHTML = `
    <div class="subject-details">
      <label for="subjectName-${semesterIndex}-${subjectCount}">Subject Name:</label>
      <input type="text" id="subjectName-${semesterIndex}-${subjectCount}" placeholder="Subject Name">

      <div class="marks-container">
        <label for="obtainedMarks-${semesterIndex}-${subjectCount}">Obtained Marks:</label>
        <input type="number" id="obtainedMarks-${semesterIndex}-${subjectCount}" placeholder="0">
        
        <label for="maxMarks-${semesterIndex}-${subjectCount}">Max Marks:</label>
        <input type="number" id="maxMarks-${semesterIndex}-${subjectCount}" placeholder="100">
      </div>

      <div class="credits-container">
        <label for="obtainedCredits-${semesterIndex}-${subjectCount}">Obtained Credits:</label>
        <input type="number" id="obtainedCredits-${semesterIndex}-${subjectCount}" placeholder="0">
        
        <label for="maxCredits-${semesterIndex}-${subjectCount}">Max Credits:</label>
        <input type="number" id="maxCredits-${semesterIndex}-${subjectCount}" placeholder="0">
      </div>
      
      <button onclick="removeSubject('${subjectDiv.id}')">Remove Subject</button>
    </div>
  `;

  subjectsContainer.appendChild(subjectDiv);
}

// Function to remove a subject
function removeSubject(subjectId) {
  const subjectElement = document.getElementById(subjectId);
  subjectElement.remove();
}

// Function to remove a semester
function removeSemester(semesterId) {
  const semesterElement = document.getElementById(semesterId);
  semesterElement.remove();
}

// Function to calculate CGPA and GPA
function calculateResults() {
  let totalMarks = 0;
  let totalMaxMarks = 0;
  let totalCredits = 0;
  let totalMaxCredits = 0;

  document.querySelectorAll('.semester').forEach(semester => {
    const subjects = semester.querySelectorAll('.subject');
    subjects.forEach(subject => {
      const obtainedMarks = parseFloat(subject.querySelector('input[id^="obtainedMarks"]').value) || 0;
      const maxMarks = parseFloat(subject.querySelector('input[id^="maxMarks"]').value) || 0;
      const obtainedCredits = parseFloat(subject.querySelector('input[id^="obtainedCredits"]').value) || 0;
      const maxCredits = parseFloat(subject.querySelector('input[id^="maxCredits"]').value) || 0;

      totalMarks += obtainedMarks;
      totalMaxMarks += maxMarks;
      totalCredits += obtainedCredits;
      totalMaxCredits += maxCredits;
    });
  });

  const gpa = (totalMarks / totalMaxMarks) * 100; // Percentage GPA
  const cgpa = (totalCredits / totalMaxCredits) * 10; // Assuming a 10-point scale

  document.getElementById('result').innerHTML = `
    <p>GPA (Percentage): ${gpa.toFixed(2)}%</p>
    <p>CGPA: ${cgpa.toFixed(2)}</p>
  `;
}
