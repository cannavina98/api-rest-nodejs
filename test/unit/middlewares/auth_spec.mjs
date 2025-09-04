import authMiddleware from '../../../src/middlewares/auth.js';
import jwt from 'jsonwebtoken';
import config from 'config';
import sinon from 'sinon';

describe('AuthMiddleware', () => {
    it('should verify a JWT token and call the next middleware', done => {
        const jwtToken = jwt.sign({ data: 'fake' }, config.get('auth.key'));
        const reqFake = {
            headers:{
                'x-access-token': jwtToken
            }
        };
        const resFake = {};

        authMiddleware(reqFake, resFake, err => {
            if (err) return done(err);
            done();
        });
    });

    it('should call the next middleware passing an error when the token validation fails', done => {
        const reqFake = {
            headers: {
                'x-access-token': 'Invalid Token'
            }
        };
        const resFake = {};
        authMiddleware(reqFake, resFake, err => {
            expect(err.message).to.eql('jwt malformed');
            done();
        });
    });

    it('should call the next middleware if there is no token', () => {
        const reqFake = {
            headers: {}
        };
        const resFake = {};
        const nextSpy = sinon.spy();

        authMiddleware(reqFake, resFake, nextSpy);

        sinon.assert.calledOnce(nextSpy);
        sinon.assert.calledWith(nextSpy);
    });
});