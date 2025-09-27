import express from "express";
import session from "express-session"
import bodyParser from "body-parser";
import cors from 'cors';
import routesIndex from "./routes/index.js";
import routesProjetos from "./routes/projetos.js";
import routesUsers from "./routes/users.js";
import routesLogin from "./routes/login.js";
import routesDashboard from "./routes/dashboard.js";
import database from "./database.js";
import MongoStore from "connect-mongo";
import acl from "express-acl";
import authMiddleware from './middlewares/auth.js';
import options from "./swagger.js";
import swagggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';
import config from 'config';

const app = express();

const specs = swagggerJSDoc(options);



const configureExpress = () => {
    app.use(session({
        secret: 'segredo123',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl: process.env.MONGO_URI || config.get('database.mongoUrl'),
            collectionName: 'sessions'
        }),
        cookie:{
            maxAge: 1000 * 60 * 60 * 24
        }
        }));
    acl.config({
        baseUrl:"/",
        path: 'config',
        roleSearchPath: 'session.user.role'
    });
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
    app.use(bodyParser.json());
    app.use(express.json());
    app.use(express.urlencoded({extended:false}));
    app.use(authMiddleware);
    app.use(acl.authorize.unless({path: ['/users/authenticate', '/login']}));

    app.use("/", routesIndex);
    app.use("/projetos", routesProjetos);
    app.use("/login", routesLogin);
    app.use("/dashboard", routesDashboard);
    app.use("/users", routesUsers);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
    app.database = database
        
    return app;
}

export default async () => {
    const app = configureExpress();
    await app.database.connect();

    return app;
};