import express from "express";
import bodyParser from "body-parser";
import cors from 'cors';
import routesIndex from "./routes/index.js";
import routesProjetos from "./routes/projetos.js";
import routesUsers from "./routes/users.js";
import database from "./database.js";
import acl from "express-acl";
import authMiddleware from './middlewares/auth.js';

const app = express();

acl.config({
    baseUrl:"/",
    path: 'config'
});

const configureExpress = () => {
    app.use(cors());
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(authMiddleware);
    app.use(acl.authorize.unless({path: ['/users/authenticate']}));

    app.use("/", routesIndex);
    app.use("/projetos", routesProjetos);
    app.use("/users", routesUsers);
    app.database = database

    return app;
}

export default async () => {
    const app = configureExpress();
    await app.database.connect();

    return app;
};