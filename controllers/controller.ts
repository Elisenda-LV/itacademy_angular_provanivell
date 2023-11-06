let course: Course;

function submitCourse() {
    let errores = 0;
    //Get inputs
    let courseInput = <HTMLInputElement>document.getElementById("courseInput");
    let descriptionInput = <HTMLInputElement>document.getElementById("descriptionInput");
    //Get errors
    let errorCourse = <HTMLInputElement>document.getElementById("errorCourse");
	let errorDescription = <HTMLInputElement>document.getElementById("errorDescription");

    if (courseInput.value.length > 15 || !/^[A-Za-zñÑ\s]+$/.test(courseInput.value)) {
        errores++;
        courseInput.classList.add("is-invalid");
        errorCourse.style.display = "block";
        errorCourse.textContent = "Required. Course name should contain only letters and be less than 15 characters.";
      } else {
        courseInput.classList.remove("is-invalid");
        errorCourse.style.display = "none";
    }

    if (descriptionInput.value.length > 50 || !/^[A-Za-zñÑ\s]+$/.test(descriptionInput.value)) {
        errores++;
        descriptionInput.classList.add("is-invalid");
        errorDescription.style.display = "block";
        errorDescription.textContent = "Required. Course description should contain only letters and be less than 50 characters.";
      } else {
        descriptionInput.classList.remove("is-invalid");
        errorDescription.style.display = "none";
    }
    
    if (errores === 0) {
        course = new Course(courseInput.value, descriptionInput.value);
        //showCourse();
        showStudentForm();
        console.log(course);
    }
}

function showCourse() {
    let courseTitle = <HTMLInputElement>document.getElementById("courseTitle");
    let descriptionOutput = <HTMLInputElement>document.getElementById("descriptionOutput");
    
    courseTitle.innerHTML = "<b>COURSE</b><br>";
    descriptionOutput.innerHTML = "<b>Course Name: </b>" + course.title + "<br>" + "<b>Description:</b> " + course.description;
}


function submitStudentForm() {
    let errores = 0;
    const studentsIds = new Set(); //cambiar lib en tsconfig.json 

    for (let i = 1; i <= 2; i++) {
        //get inputs
        const nameInput = <HTMLInputElement>document.getElementById("name" + i);
        const idInput = <HTMLInputElement>document.getElementById("id" + i);
        const birthDateInput = <HTMLInputElement>document.getElementById("birthDate" + i);

        //get errors
        let errorName = <HTMLInputElement>document.getElementById("errorName" + i);
        let errorId = <HTMLInputElement>document.getElementById("errorId" + i);
        let errorBD = <HTMLInputElement>document.getElementById("errorBD" + i);

        if (nameInput && idInput && birthDateInput) {
       
            const name = nameInput.value;
            const id = idInput.value; 
            const birthDate = birthDateInput.value; 
            
            //validar name
            if (nameInput.value.length > 15 || !/^[A-Za-z\s]+$/.test(nameInput.value)) {
                errores++;
                nameInput.classList.add("is-invalid");
                errorName.style.display = "block";
                errorName.textContent = "Required. Course name should contain only letters and be less than 15 characters.";
            } else {
                nameInput.classList.remove("is-invalid");
                errorName.style.display = "none";
            }
            
            //validar que no se dupliquen los ids
            if (studentsIds.has(id)) {
                errores++;
                idInput.classList.add("is-invalid");
                errorId.style.display = "block";
                errorId.textContent = "Enter a valid ID";
            } else {
                studentsIds.add(id);
                idInput.classList.remove("is-invalid");
            }
            
            //validar BD
            if (birthDate) {
                const birthDateValue = new Date(birthDate);
                const currentDate = new Date();
                    
                if(birthDateValue > currentDate){
                errores++;
                birthDateInput.classList.add("is-invalid");
                errorBD.style.display = "block";
                errorBD.textContent = "Birth Date cannot be in the future.";
                }else{
                    birthDateInput.classList.remove("is-invalid");
                } 
            }
            
            //si no hay errores...
            if (!errores){
                const studentGenerica = new Student(name, id, birthDate);
                course.addStudent(studentGenerica);
                
            }
        }
    }
    
    if (errores === 0) {
        console.log(course);
        showStudents();
        showCourse();
        showStudentForm();
    }
}

function showStudents() {
    let studentTitle = <HTMLInputElement>document.getElementById("studentTitle");
    let studentOutput1 = <HTMLInputElement>document.getElementById("studentOutput1");
    let studentOutput2 = <HTMLInputElement>document.getElementById("studentOutput2");
    
    studentTitle.innerHTML = "<b>STUDENTS</b>";
    studentOutput1.innerHTML = "<b>Student 1:</b><br>  " + "ID: " + course.students[0].id + "  <br>Name: " + course.students[0].name + "  <br>Birth Date: " + course.students[0].birthDate;
    studentOutput2.innerHTML = "<b>Student 2:</b><br>  " + "ID: " + course.students[1].id + "  <br>Name: " + course.students[1].name + "  <br>Birth Date: " + course.students[1].birthDate; 
 
}


function showStudentForm() {
    var courseForm = <HTMLInputElement>document.getElementById("create-course-form");
    var courseStudent = <HTMLInputElement>document.getElementById("create-student-form");
    courseForm.style.display = "none";
    courseStudent.style.display = "block";
    
}

