const bcrypt = require('bcryptjs')
const validator = require('validator')
const studentsCollection = require('../db').db().collection("students")

let Student = function(data){
    this.data  = data
    this.errors = []
}

Student.prototype.cleanUp = function() {
    if(typeof(this.data.uname)!="string") {this.data.uname=""}
    if(typeof(this.data.psw)!="string") {this.data.password=""}

    //get rid of any bogus properties
    this.data = {
        uname:this.data.uname,
        email:this.data.uname+'@student.nitw.ac.in',
        password:this.data.psw,
        yearofstudy:null,
        branch:null,
        course:null
    }
}

Student.prototype.validate = function(){

    return new Promise(async(resolve,reject)=>{
        if(!validator.isEmail(this.data.email))  {this.errors.push("You must provide a valid email address.")}
        if(this.data.password == "" ) {this.errors.push("You must provide a password.")}

        let emailExists = await studentsCollection.findOne({uname:this.data.uname})
        if(emailExists) this.errors.push("Email already taken!") 
        resolve()   
    })
}

Student.prototype.register = async function(){
    return new Promise(async (resolve,reject)=>{
        this.cleanUp()
        await this.validate()

        if(!this.errors.length){
            resolve()
        } else {
            reject(this.errors)
        }

    })
}

Student.prototype.createAccount = async function(req,res){
    return new Promise(async (resolve,reject)=>{
        if(!this.errors.length) {
            let salt = bcrypt.genSaltSync(10)
            this.data.password = bcrypt.hashSync(this.data.password, salt)
            studentsCollection.insertOne(this.data)
            resolve({       
                uname:this.data.uname,
                email:this.data.email,
                yearofstudy:this.data.yearofstudy,
                branch:this.data.branch,
                course:this.data.course
            });
         } else {
            reject(this.errors)
         }
    })
}

Student.prototype.login = function(){
    return new Promise(async (resolve,reject)=>{
        this.cleanUp()
        let emailExists = await studentsCollection.findOne({uname:this.data.uname})
        if(emailExists){
            if(bcrypt.compareSync(this.data.password,emailExists.password))
            {
                resolve({
                    uname:this.data.uname,
                    email:this.data.email,
                    yearofstudy:this.data.yearofstudy,
                    branch:this.data.branch,
                    course:this.data.course
                });
            }
            else { reject('Password not matched!') }
        }
        else { reject("Email not Found!") }
    })
}

module.exports = Student

