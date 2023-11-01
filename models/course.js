"use strict";
class Course {
    constructor(title, description) {
        this.students = new Array();
        this.title = title;
        this.description = description;
    }
    addStudent(student) {
        this.students.push(student);
    }
}
