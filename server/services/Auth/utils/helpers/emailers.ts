import { EMAIL_SUBJECTS } from "../../../../utils/constants"
import { INodeMailerEmailObject } from "../../../../utils/interface"

export const sendEmailVerificationLink = (email: string, emailer: any) => {
    // Send Email Verification for new user
    const mailerPayload: INodeMailerEmailObject = {
        to: email,
        subject: EMAIL_SUBJECTS.VERIFY_EMAIL,
        text: "This is an test email, Please ignore"
    }
    // Send Verification Email
    emailer(mailerPayload)
}