import express from "express";
import {exec} from "child_process"
import * as fs from "fs";

export class Routers {

    public route = express.Router({caseSensitive: true})

    constructor() {
        this.paths()
    }

    private paths() {
        this.Display()
        this.CreateFolder()
        this.CreateFile()
        this.Delete()
        this.Move()
        this.Commande()
    }

    private Display = (): void => {
        this.route.get('/test/:name', (req, res) => {
            /*exec('ls -al',(err,data,stderr)=>{
                res.status(200).json(stderr)
            })*/

            const filenames = fs.readdirSync(`${__dirname}/${req.params.name}`);
            res.status(200).send(filenames)


        })
    }

    private CreateFolder() {
        this.route.get('/folder/:name', (req, res) => {
            try {
                fs.mkdir(`${__dirname}/data/${req.params.name}`, (err) => {

                    if (err) {
                        res.status(200).send("folder already " + err.code)
                        return
                    }

                    res.status(200).send('Directory created successfully!');
                });
            } catch (err) {
                throw err
            }


        })
    }

    private CreateFile() {
        this.route.get('/file/:name', (req, res) => {
            try {
                fs.writeFile(`${__dirname}/data/${req.params.name}`, '', (err) => {
                    if (err) {
                        res.status(200).send(err.code)
                        return
                    }
                    res.status(200).send('File is created successfully.');
                });

            } catch (err) {
                throw err
            }


        })
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

    private Delete() {
        this.route.get('/del/:name', (req, res) => {
            try {
                const stat = fs.lstatSync(`${__dirname}/data/${req.params.name}`);
                if (stat.isDirectory()) {
                    fs.rmdir(`${__dirname}/data/${req.params.name}`, (err) => {
                        if (err) {
                            res.status(200).send(err.code)
                            return
                        }
                        res.status(200).send("folder removed");
                    })
                } else {
                    fs.unlink(`${__dirname}/data/${req.params.name}`, (err) => {
                        if (err) {
                            res.status(200).send("file name " + err.code)
                            return
                        }
                        res.status(200).send("file removed")
                    })
                }


            } catch (err) {
                console.error(err)
            }
        })
    }

    private Move() {
        this.route.get('/move/:name', (req, res) => {
            try {
                const fss = require('fs-extra')
                fss.move(`${__dirname}/data/${req.params.name}`, `${__dirname}/data2/${req.params.name}`, (err: any) => {
                    if (err) {
                        res.status(200).send(err.code)
                        return
                    }
                    res.status(200).send(`${req.params.name} moved to data2`)
                })


            } catch (err) {
                console.error(err)
            }
        })
    }

    private Commande() {
        this.route.get('/cmd/:cmd', (req, res) => {
            try {

                exec(`${req.params.cmd}`, (err, stdout, stderr) => {
                    if (err) {
                        res.status(200).send(`exec error: ${err}`);
                        return;
                    }
                    let testing = stdout.split('\n')
                    res.status(200).send(testing);
                    //res.status(200).send(`[saleck@eljili ~]#${stdout}`);
                    // res.status(200).send(`stderr: ${stderr}`);
                });


            } catch (err) {
                console.error(err)
            }
        })
    }
}

export default new Routers().route

