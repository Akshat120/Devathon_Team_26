require('dotenv').config();
const Student = require('../models/Student')
const nodemailer = require('nodemailer')

exports.home = function(req,res){
    res.render('authpage')
}

exports.login = function(req,res){
    stud = new Student(req.body)
    stud.login().then((data)=>{
        req.session.data = data
        res.redirect(`/login/${data.uname}`)             
    }).catch((err)=>{
        res.send(err)
    })
}

exports.dashboard = function(req,res){
    console.log(req.params)
    let data = req.session.data;
    if(data && data.uname == req.params.uname)
    {
        res.render('studentdashboard',{data:data});    
    }
    else 
    {
        res.redirect('/');
    }
}

exports.register = async function(req,res){
    let stud = new Student(req.body)
    
    stud.register().then(()=>{
        let code = Math.floor(999+Math.random()*1000)
        
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
        req.session.stud = stud;
        req.session.code = code;
        res.render('register',{codegen:true})
    }).catch((err)=>{
        console.log(err)
        res.send(`${err}`)
    })
}

exports.createaccount = async function(req,res){
    let stud = req.session.stud
    console.log(req.session)
    if(stud)
    {
        if(req.body.code == req.session.code)
        {
            let studentOne = new Student(stud.data)
            studentOne.createAccount().then((data)=>{
                req.session.stud=null
                req.session.data=data
                res.redirect(`/login/${data.uname}`)
            }).catch((err)=>{
                res.send('server error!')
            })
        }
        else 
        {
            res.send('wrong code')
        }        
    }
    else
    {
        res.redirect('/')
    }
}

exports.loginpage = function(req,res){
    res.render('authpage')
}

exports.documentupload = function(req,res){
    let data = req.session.data;
    console.log(req.session)
    if(data && data.uname == req.params.uname)
    {
        res.render('uploaddocs',{data:data})        
    }
    else 
    {
        res.send('Invalid route access!')
    }
}

exports.trackapplication = function(req,res){
    let data = req.session.data;
    console.log(req.session)
    if(data && data.uname == req.params.uname)
    {
        res.render('applicationtracker',{data:data})        
    }
    else 
    {
        res.send('Invalid route access!')
    }
}

exports.registerpage = function(req,res){
    res.render('register',{codegen:false})
}









