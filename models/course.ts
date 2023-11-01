
class Course{
    title:string;
    description:string;
    students:Student[]=new Array();
    
    constructor(title:string,description:string){
        this.title=title;
        this.description=description;
       
    }
    
    addStudent(student:Student):void{
        this.students.push(student);
    }
}