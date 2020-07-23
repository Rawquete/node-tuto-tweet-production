const nodemailer = require('nodemailer');
const sparkPostTransporter = require('nodemailer-sparkpost-transport');
const path = require ('path');
const pug = require ('pug');

class Email {
    constructor(){
        this.from = 'uon test <no-reply@uon.link>';

        if (process.env.NODE_ENV === 'production'){
            this.transporter = nodemailer.createTransport(sparkPostTransporter({
                sparkPostApiKey:'9e8fa154d4014f7bf1e194acdea16e0b718b5ee7',
                endpoint:'https.//api.eu.sparkpost.com'
            })
            );
        } else {
            this.transporter = nodemailer.createTransport({
                host: "smtp.mailtrap.io",
                port: 2525,
                auth: {
                user: "4205f7cb75e471",
                pass: "197295a7b4b2ce"
                }
            });
        }
    }
    async sendEmailVerification( options) {
        
        try{
            const email = {
                from: this.from,
                subject: 'Email verification',
                to: options.to,
                html: pug.renderFile(path.join(__dirname, 'templates/email-verification.pug'), {
                    username: options.username,
                    url:`https://${options.host}/users/email-verification/${ options.userId}/${options.token}`
                })
            };
            const response = await this.transporter.sendMail(email);
            console.log(response);
        } catch(e){
            throw e;
        }
       
    }

    async sendResetPasswordLink(options){
        try{
            const email = {
                from: this.from,
                subject: 'Password reset',
                to: options.to,
                html: pug.renderFile(
                    path.join(__dirname, 'templates/password-reset.pug'), {
                    
                    url:`https://${options.host}/users/reset-password/${ options.userId}/${ options.token}`
                })
            };
            const response = await this.transporter.sendMail(email);
            console.log(response);
        } catch(e){
            throw e;
        }

    }
}






module.exports = new Email();