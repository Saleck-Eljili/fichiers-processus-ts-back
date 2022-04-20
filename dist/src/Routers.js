"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routers = void 0;
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
class Routers {
    constructor() {
        this.route = express_1.default.Router({ caseSensitive: true });
        this.Display = () => {
            this.route.get('/test/:name', (req, res) => {
                /*exec('ls -al',(err,data,stderr)=>{
                    res.status(200).json(stderr)
                })*/
                const filenames = fs.readdirSync(`${__dirname}/${req.params.name}`);
                res.status(200).send(filenames);
            });
        };
        this.paths();
    }
    paths() {
        this.Display();
        this.CreateFolder();
        this.CreateFile();
        this.Delete();
        this.Move();
        this.Commande();
    }
    CreateFolder() {
        this.route.get('/folder/:name', (req, res) => {
            try {
                fs.mkdir(`${__dirname}/data/${req.params.name}`, (err) => {
                    if (err) {
                        res.status(200).send("folder already " + err.code);
                        return;
                    }
                    res.status(200).send('Directory created successfully!');
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    CreateFile() {
        this.route.get('/file/:name', (req, res) => {
            try {
                fs.writeFile(`${__dirname}/data/${req.params.name}`, '', (err) => {
                    if (err) {
                        res.status(200).send(err.code);
                        return;
                    }
                    res.status(200).send('File is created successfully.');
                });
            }
            catch (err) {
                throw err;
            }
        });
    }
    /*private DeleteFiles(){
        this.route.get('/delfile/:name',(req, res)=> {
            const path = `${__dirname}/data/${req.params.name}`
            try {
                fs.unlink(path, (err) => {
                    if (err) {
                        res.status(200).send("file name "+err.code)
                        return
                    }
                res.status(200).send("file removed")})
                //file removed
            } catch(err) {
                throw err
            }
        })
    }*/
    Delete() {
        this.route.get('/del/:name', (req, res) => {
            try {
                const stat = fs.lstatSync(`${__dirname}/data/${req.params.name}`);
                if (stat.isDirectory()) {
                    fs.rmdir(`${__dirname}/data/${req.params.name}`, (err) => {
                        if (err) {
                            res.status(200).send(err.code);
                            return;
                        }
                        res.status(200).send("folder removed");
                    });
                }
                else {
                    fs.unlink(`${__dirname}/data/${req.params.name}`, (err) => {
                        if (err) {
                            res.status(200).send("file name " + err.code);
                            return;
                        }
                        res.status(200).send("file removed");
                    });
                }
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    Move() {
        this.route.get('/move/:name', (req, res) => {
            try {
                const fss = require('fs-extra');
                fss.move(`${__dirname}/data/${req.params.name}`, `${__dirname}/data2/${req.params.name}`, (err) => {
                    if (err) {
                        res.status(200).send(err.code);
                        return;
                    }
                    res.status(200).send(`${req.params.name} moved to data2`);
                });
            }
            catch (err) {
                console.error(err);
            }
        });
    }
    Commande() {
        this.route.get('/cmd/:cmd', (req, res) => {
            try {
                (0, child_process_1.exec)(`${req.params.cmd}`, (err, stdout, stderr) => {
                    if (err) {
                        res.status(200).send(`exec error: ${err}`);
                        return;
                    }
                    let testing = stdout.split('\n');
                    res.status(200).send(testing);
                    //res.status(200).send(`[saleck@eljili ~]#${stdout}`);
                    // res.status(200).send(`stderr: ${stderr}`);
                });
            }
            catch (err) {
                console.error(err);
            }
        });
    }
}
exports.Routers = Routers;
exports.default = new Routers().route;
//# sourceMappingURL=Routers.js.map