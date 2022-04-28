import nodemailer from 'nodemailer'
import writeError from './error.js'
import { email_code_period } from '../../config.js'

export default async function sendEmail (address, subject, html) {
  const transporter = nodemailer.createTransport({
    service: 'mail.ru',
    auth: {
      user: 'abdurakhmonovislom@mail.ru',
      pass: 'jN5hSafTnw7EjaJ38yPp'
    }
  });
  
  const mailOptions = {
    from: 'abdurakhmonovislom@mail.ru',
    to: address,
    subject,
    html,
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      writeError(error)     
    }
  });

  return `Message sent please check your email. The code is valid for ${email_code_period} minutes.`
}