#! /usr/bin/env node

import inquirer from "inquirer";
class student {
    id :string;
    name:string;
    courseEnrolled:string[];
    feesAmount:number;
    constructor ( id :string, name:string, courseEnrolled:string[], feesAmount:number){
        this.id = id
        this.name = name
        this.courseEnrolled = courseEnrolled
        this.feesAmount = feesAmount
    }
}


let baseId = 10000
let studentId:string = '';
let contiuneEnrollment = true;

let students: student[] = []




do{
    let action = await inquirer.prompt({
        type:"list",
        name:"ans",
        message:"please select an option:\n",
        choices:["Enroll a student","Show student status"]
    })
    if(action.ans ==="Enroll a student"){
        let studentName = await inquirer.prompt({
            type:"input",
            name:"ans",
            message:"please enter your name"
        })
        let trimdStudentName =( studentName.ans).trim().toLowerCase()
        let studentNamesCheck = students.map(obj => obj.name)
        if(studentNamesCheck.includes(trimdStudentName) === false){
            if(trimdStudentName !== ""){
                baseId++
                studentId ="STID" + baseId
                console.log("\n\tyour account has been created")
                console.log(`well come, ${trimdStudentName}!`);
                let course = await inquirer.prompt({
                    type:"list",
                    name:"ans",
                    message:"please select a course",
                    choices:["IT","English","Cooking"]
                })
                let courseFees = 0;
                switch(course.ans){
                    case "IT":
                        courseFees = 5000;
                        break;

                        case "English":
                            courseFees = 500;
                            break;

                            case "Cooking":
                                courseFees = 200;
                                break;

        
    
                }
                let courseConfirm = await inquirer.prompt({
                    type:"confirm",
                    name:"ans",
                    message:'Do you want to enroll in this course'

                })
                if(courseConfirm.ans === true){
                    let Student = new student(studentId,trimdStudentName ,[course.ans],courseFees)
                    students.push(Student)
                    console.log("you have enrolled in this course");
                }
            }else{
                console.log("invalid Name")
            }
    
        }else{
            console.log(" this name is already exists");
        }

        
    }
    else if(action.ans === "Show student status"){
        if(students.length !== 0){
            let studentNamecheck = students.map(e => e.name)
            let selectedStudent = await inquirer.prompt({
                type:"list",
                name:"ans",
                message:"please select name",
                choices:studentNamecheck
            })
            let foundStudent = students.find( Student =>  Student.name === selectedStudent.ans)
            console.log("Student information");
            console.log(foundStudent);
            console.log("\n");
        }else{
            console.log("Recorde is empty");
        }
            
    }
    let userConfirm = await inquirer.prompt({
        type:"confirm",
        name:"ans",
        message:"Do you want to continue?"
    })
    if(userConfirm.ans === false){
        contiuneEnrollment = false
    }

}while(contiuneEnrollment);