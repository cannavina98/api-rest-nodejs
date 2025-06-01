import supertest from 'supertest';
import { use, expect } from 'chai';
import setupApp from '../../src/app.js';

global.setupApp =  setupApp;
global.supertest = supertest;
global.expect = expect;