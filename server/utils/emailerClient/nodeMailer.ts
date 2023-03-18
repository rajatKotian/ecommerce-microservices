import mailer from 'nodemailer'
import { AppConfig } from '../../config'
import { INodeMailerEmailObject } from '../interface'

export default class NodeMailerClient {
    static sendMail = async (args: INodeMailerEmailObject) => {
        const senderEmail = AppConfig.get('nodeMailer:email')
        const pass = AppConfig.get('nodeMailer:password');
        const mailerClient = await mailer.createTransport({
            service: 'gmail',
            auth: {
                user: senderEmail,
                pass
            }
        })
        mailerClient.sendMail(args)
    }
}