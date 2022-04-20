import express,{Application} from "express"
import bodyParser from "body-parser";
import cors from "cors";
import routers from "./Routers";
class App {
    constructor() {
        this.Config()
        this.ConfigRouters()
        this.initServer()
    }

    public app: Application = express()

    private Config() {
        this.app.use(cors())
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({extended: false}))
    }

    private ConfigRouters() {
        this.app.use('/api/v1/',routers)
    }

    private initServer = (): void => {
        const port: number = 8060 || process.env.PORT
        this.app.listen(port, () => console.log("server listening on port %d", port))
    }
}
export default new App()
