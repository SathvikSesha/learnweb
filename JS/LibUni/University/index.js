class Person{
    constructor(name,age,gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }
    getDetails(){
        return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}`;
    }
}

class Student extends Person{
    constructor(name,age,gender,rollNo,branch,cgpa){
        super(name,age,gender);
        this.rollNo = rollNo;
        this.branch = branch;
        this.cgpa = cgpa;
    }
    getDetails(){
        return `${super.getDetails()}, Roll No: ${this.rollNo}, Branch: ${this.branch}, CGPA: ${this.cgpa}`;
    }
    isEligibleForPlacement(){
        return this.cgpa >= 7.0;
    }
}

class Faculty extends Person{
    constructor(name,age,gender,empId,department,salary){
        super(name,age,gender);
        this.empId = empId;
        this.department = department;
        this.salary = salary;
    }
    getDetails(){
        return `${super.getDetails()}, Employee ID: ${this.empId}, Department: ${this.department}, Salary: ${this.salary}`;
    }
    getAnnualSalary(){
        return this.salary * 12;
    }
}

class TeachingAssistant extends Student{
    constructor(name,age,gender,rollNo,branch,cgpa,assignedCourse,stipend){
        super(name,age,gender,rollNo,branch,cgpa);
        this.assignedCourse = assignedCourse;
        this.stipend = stipend;
    }
    getDetails(){
        return `${super.getDetails()}, Assigned Course: ${this.assignedCourse}, Stipend: ${this.stipend}`;
    }
}

let s1 = new Student("John",20,"Male",1,"Computer Science",8.5);
let f1 = new Faculty("Jane",40,"Female",1,"Computer Science",100000);
let ta1 = new TeachingAssistant("Bob",22,"Male",2,"Computer Science",9.0,"Computer Science",10000);

console.log(s1.getDetails());
console.log(f1.getDetails());
console.log(ta1.getDetails());
console.log(s1.isEligibleForPlacement());
console.log(f1.getAnnualSalary());