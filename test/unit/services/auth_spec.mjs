import AuthService from '../../../src/services/auth.js';
import Util from 'util';
import bcrypt from 'bcrypt';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import config from 'config';

const hashAsync = Util.promisify(bcrypt.hash);

describe('Service:Auth', () =>{
    context('authenticate', () => {
        it('should authenticate an user', async () => {
            const fakeUserModel = {
                findOne: sinon.stub()
            };
            const user = {
                name: 'John Doe',
                email: 'john@doe.com',
                password: '123456'
            };

            const authService = new AuthService(fakeUserModel);
            const hashedPassword = await hashAsync('123456', 10);
            const userFromDatabase = {...user, password:hashedPassword };

            fakeUserModel.findOne
                .withArgs({ email: 'john@doe.com' })
                .resolves(userFromDatabase);

            const res = await authService.authenticate(user);

            expect(res).to.eql(userFromDatabase);
        });

        it('should return false when the password does not match', async () => {
            const user = {
                email: 'john@doe.com',
                password: '123456'
            };

            const fakeUserModel = {
                findOne: sinon.stub()
            };

            fakeUserModel.findOne.resolves({
                email: user.email,
                password: 'aFakeHashedPassword'
            });

            const authService = new AuthService(fakeUserModel);
            const response = await authService.authenticate(user);
            
            expect(response).to.be.false;
        });
    });
    context('generateToken', () => {
        it('should generate a JWT token from a payload', () => {
            const payload = {
                name: 'John Doe',
                email: 'john@doe.com',
                password: '123456'
            };

            const expectedToken = jwt.sign(payload, config.get('auth.key'), {
                expiresIn: config.get('auth.expiresIn')
            });

            const generatedToken = AuthService.generateToken(payload);
            expect(generatedToken).to.eql(expectedToken);
        });
    });
});