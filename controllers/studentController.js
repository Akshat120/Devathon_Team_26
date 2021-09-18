require('dotenv').config();
const Student = require('../models/Student')
const nodemailer = require('nodemailer')
var stud=null;

exports.home = function(req,res){
    res.render('authpage')
}

exports.login = function(req,res){
    console.log(req.body)
    stud = new Student(req.body)
    stud.login().then((data)=>{
        console.log(data)
            req.session.data = {
                uname:data.uname,
                email:data.email
            }
        req.session.save(function(){
            res.redirect(`/login/${data.uname}`)            
        });
    }).catch((err)=>{
        res.send(err)
    })
}

exports.dashboard = function(req,res){
    console.log(res.session)
    res.render('studentdashboard')
}

exports.register = async function(req,res){
    stud = new Student(req.body)
    console.log(stud);
    stud.register().then(()=>{
        let code = Math.floor(999+Math.random()*1000)
        stud.code = code

        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'student.scholarship.nitw@gmail.com',
                pass:'Testing12345'
            }
        })

        let mailOptions = {
            from:`Student Scholarship Service`,
            to:stud.data.email,
            subject:'Confirmation Email',
            text:'Secret Code: '+code
        }

        transporter.sendMail(mailOptions,function(err,result){
            if(err)
            {
                console.log('Error ',err)
            }   
            else
            {
                console.log('Success ',result)
            }  
            transporter.close()   
        })        

        res.render('register',{codegen:true})
    }).catch((err)=>{
        console.log(err)
        res.send(`${err}`)
    })
}

exports.createaccount = async function(req,res){
    console.log(req.body)
    console.log(stud)
    if(req.body.code == stud.code)
    {
        stud.createAccount().then(()=>{
            res.send('createaccount checking')
        }).catch((err)=>{
            res.send('server issue!')
        })
    }
    else 
    {
        res.send('wrong code')
    }
    stud=null
}

exports.loginpage = function(req,res){
    res.render('authpage')
}

exports.registerpage = function(req,res){
    res.render('register',{codegen:false})
}









