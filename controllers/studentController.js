
exports.home = function(req,res){
    res.render('authpage')
}

exports.login = function(req,res){
    res.send(`login checking router completed!`)
}

exports.register = function(req,res){
    res.send(`register checking router completed!`)
}

exports.loginpage = function(req,res){
    res.render('authpage')
}

exports.registerpage = function(req,res){
    res.render('register')
}









