const nodemailer = require('nodemailer');
const config = require('config')

exports.sendEmail = async(to_email_id, subject, template)=>{
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.get('MAIL_ID'),
        pass: config.get('MAIL_PASSWORD')
      }
    });
    
    const mailOptions = {
      from: 'CodeBook noreply',
      to: to_email_id,
      subject: subject,
      html: template 
    };

    try{
        const info = await transporter.sendMail(mailOptions);
        return {
            status:true,
            details: info.response
        }
    }
    catch(err){
        return{
            status:false,
            details: err
        }
    }
    
}