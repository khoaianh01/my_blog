const nodemailer =  require('nodemailer');
const {google} = require('googleapis');


const clientID = '738995248307-f317sjfta4kangfa7t9oc1fqvt6o0097.apps.googleusercontent.com';
const clientSecret= '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';
const refresh_token= "1//040cyZfGMZsERCgYIARAAGAQSNwF-L9IrAczlAFf15Eu97rEaUNKokiMtQyXmIHQpAuSZZ0qL59LCpFjpsvs_gmNTJgdEDYGueAY";
const redirect_Uri = "https://developers.google.com/oauthplayground";

const OAuth2client = new google.auth.OAuth2(clientID,clientSecret,redirect_Uri);
OAuth2client.setCredentials({ refresh_token: refresh_token});
async function sendMail(username,fromEmail,text,toEmail,contentHtml){
 
    var mainOptions = { 
        from: username,
        to: toEmail,
        subject: 'Test Nodemailer',
       
        html: contentHtml
    }
        try
        {  
            const accessToken = await OAuth2client.getAccessToken();
            var transporter =  nodemailer.createTransport({ // config mail server
                service: 'gmail',
                auth: {
                    type:'OAuth2',
                    user: 'lehaianh111103@gmail.com',
                    clientId :'738995248307-f317sjfta4kangfa7t9oc1fqvt6o0097.apps.googleusercontent.com',
                    clientSecret: clientSecret,
                    refreshToken: refresh_token,
                    accessToken: accessToken
                }
            });
          await  transporter.sendMail(mainOptions, function(err, info){
        if (err) 
            return 'fail';
    });
        }
        catch(err){
           return 'fail';
        }
   
}
module.exports.sendMail = sendMail;