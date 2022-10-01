

export default class RestController {
    testRoute = (req: any, res: any) => {
        res.send({ success: true, msg: "This is an internal test route from inventory" })
    }

}