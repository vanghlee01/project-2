var Cryptr = require('cryptr');
cryptr = new Cryptr('myTotalySecretKey');
var connection = require('../config/config');


module.exports.authenticate=function(req,res){
    var username =req.body.username_r;
    var password=req.body.password_r;
   console.log(password,username)
   
    connection.query('SELECT * FROM accounts WHERE username  = ?',[username], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            message:'there are some error with query'
            })
      }else{
       
        if(results.length >0){
        decryptedString = cryptr.decrypt(results[0].password);

  console.log(decryptedString)
            if(password==decryptedString){
                // res.json({
                //     status:true,
                //     message:'successfully authenticated'
                     
                // })
                res.redirect("main")
            }else{
                res.json({
                  status:false,
                  message:"Email and password does not match"
                 });
            }
          
        }
        else{
          res.json({
              status:false,    
            message:"User Name does not exits"
          });
        }
      }
    });
}
