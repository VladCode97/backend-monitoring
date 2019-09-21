import { createTransport } from 'nodemailer';
require('dotenv').config();

export default class HanldeEmail {

    public subjectEmail: string;
    public toEmail: string;
    private mailOptionsEmail: Object;
    private transporterEmail: any;
    private userByEmail: string;

    constructor(userByEmail: string) {
        this.subjectEmail = 'Bienvenido a Staff Tiqal';
        this.toEmail = 'lbonilla@tiqal.com';
        this.userByEmail = userByEmail;
        this.transporterEmail = createTransport({
            service: process.env.SERVICE,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });
        this.mailOptionsEmail = {
            from: process.env.EMAIL,
            to: this.toEmail,
            subject: this.subjectEmail,
            html: `<h1 style="font-family: Arial; text-align: center"> Se ha creado un nuevo usuario <span style="color: #00B4DB"> ${userByEmail.toLocaleUpperCase()} </span> </h1>`
        }
    }


    SendEmail()  {
        return this.transporterEmail.sendMail(this.mailOptionsEmail, (error, data) => {
            if (error) {
                console.log(error);
            }
        })
    }

}
