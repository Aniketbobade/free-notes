const mailService= {};
const nodemailer = require("nodemailer");
const config = require("../config/development");
mailService.sendInviteMail =async (email, subject, html) => {
    try {
        let transposer= nodemailer.createTransport({
            host:config.MAIL_HOST,
            auth:{
                user:config.MAIL_USER,
                pass:config.MAIL_PASS
            }
        });
        let info= transposer.sendMail({
            from:"studyNotion !! the code help- Aniket",
            to:`${email}`,
            subject:`${subject}`,
            html:`${html}`
            
        });
        console.log(info);
        return info;

    } catch (error) {
        console.error(error)
    }

}

module.exports=mailService;