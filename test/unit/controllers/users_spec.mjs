import UsersController from '../../../src/controllers/users.js';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import config from 'config';
import bcrypt from 'bcrypt';
import User from '../../../src/models/users.js';

describe('Controller: Users', () => {
    const defaultUser = [
        {
            __v: 0,
            _id: '56cb91bdc3464f14678934ca',
            name: 'Default User',
            birthDate: '2000-01-01T02:00:00.000Z',
            email: 'user@mail.com',
            password: '123456',
            role: 'user'

        }
    ];
    
    const defaultRequest = {
        params:{}
    };

    describe('get() users', () => {
        it('should return a list of users', async () => {
            const response = {
                send: sinon.spy()
            }

            User.find = sinon.stub();
            User.find.withArgs({}).resolves(defaultUser);

            const usersController = new UsersController(User);

            await usersController.get(defaultRequest, response);
            sinon.assert.calledWith(response.send, defaultUser);
        });

        it('should return 400 when an error occurs', async () => {
            const request = {};
            const response = {
                send: sinon.spy(),
                status: sinon.stub()
            };

            response.status.withArgs(400).returns(response);
            User.find = sinon.stub();
            User.find.withArgs({}).rejects({message: 'Error'});

            const usersController = new UsersController(User);

            await usersController.get(request, response);
            sinon.assert.calledWith(response.send, 'Error');
        });
    });

    describe('getById() users', () => {
        it('should call send with one user', async () => {
            const fakeId = '62a23958e5a9e9b88f853a67';
            const request = {
                params:{
                    id: fakeId
                }
            };

            const response = {
                send: sinon.spy()
            }

            User.find = sinon.stub()
            User.find.withArgs({ _id: fakeId }).resolves(defaultUser);
            
            const usersController = new UsersController(User);

            await usersController.getById(request, response);
            sinon.assert.calledWith(response.send, defaultUser);
        });
    });

    describe('create() users', () => {
        it('should call send with a new user', async () => {
            const requestWithBody = Object.assign(
                {},
                { body: defaultUser[0] },
                defaultRequest
            );

            const response = {
                send: sinon.spy(),
                status: sinon.stub()
            };

            class fakeUser {
                save() {}
            }

            response.status.withArgs(201).returns(response);
            sinon
                .stub(fakeUser.prototype, 'save')
                .withArgs()
                .resolves();

            const usersController = new UsersController(fakeUser);

            await usersController.post(requestWithBody, response);
            sinon.assert.calledWith(response.send);
        });

        context('when an error occurs', () => {
            it('should return 422', async () => {
                const response = {
                    send: sinon.spy(),
                    status: sinon.stub()
                };

                class fakeUser {
                    save() {}
                }

                response.status.withArgs(422).returns(response);
                sinon
                    .stub(fakeUser.prototype, 'save')
                    .withArgs()
                    .rejects({ message: 'Error' });
                
                const usersController = new UsersController(fakeUser);

                await usersController.post(defaultRequest, response);
                sinon.assert.calledWith(response.status, 422);
            });
        });
    });

    describe('update() users', () => {
        it('should return 200 when an user has been updated', async () => {
            const fakeId = 'a-fake-id';
            const updatedUser = {
                _id: fakeId,
                name: 'Updated Name',
                birthDate: '2000/01/01',
                email: 'user@mail.com',
                password: '123456',
                role: 'user'
            };

            const request = {
                params: {
                    id: fakeId
                },
                body: updatedUser
            };

            const response = {
                sendStatus: sinon.spy()
            };

            class fakeUser {
                static findById() {}
                save() {}
            }

            const fakeUserInstance = new fakeUser();

            const saveSpy = sinon.spy(fakeUser.prototype, 'save');
            const findByIdStub = sinon.stub(fakeUser, 'findById');
            findByIdStub.withArgs(fakeId).resolves(fakeUserInstance);

            const usersController = new UsersController(fakeUser);

            await usersController.put(request, response);
            sinon.assert.calledWith(response.sendStatus, 200);
            sinon.assert.calledOnce(saveSpy);
        });

        context('when an error occurs', () =>{
            it('should return 422', async () => {
                const fakeId = 'a-fake-id';
                const updatedUser = {
                    _id: fakeId,
                    name: 'Updated User',
                    birthDate: '2000/01/01',
                    email: 'user@mail.com',
                    password: '123456',
                    role: 'user'
                }
                const request = {
                    params: {
                        id: fakeId
                    },
                    body: updatedUser
                };
                const response = {
                    send: sinon.spy(),
                    status: sinon.stub()
                }

                class fakeUser {
                    static findById() {}
                }

                const findByIdStub = sinon.stub(fakeUser, 'findById');
                findByIdStub.withArgs(fakeId).rejects({ message: 'Error' });
                response.status.withArgs(422).returns(response);

                const userController = new UsersController(fakeUser);

                await userController.put(request, response);
                sinon.assert.calledWith(response.send, 'Error');
            });
        });
    });

    describe('delete() users', () => {
        it('should respond 204 when an user has been deleted', async () => {
            const fakeId = 'a-fake-id';
            const request = {
                params: {
                    id: fakeId
                }
            };

            const response = {
                sendStatus: sinon.spy()
            };

            class fakeUser {
                static deleteOne() {}
            }

            const deleteOneStub = sinon.stub(fakeUser, 'deleteOne');
            deleteOneStub.withArgs({_id: fakeId}).resolves([1]);

            const usersController = new UsersController(fakeUser);

            await usersController.delete(request, response);
            sinon.assert.calledWith(response.sendStatus, 204);
        });

        context('when return an error', () => {
            it('should return 400', async () => {
                const fakeId = 'a-fake-id';
                const request = {
                    params: {
                        id: fakeId
                    }
                };

                const response = {
                    send: sinon.spy(),
                    status: sinon.stub()
                };

                class fakeUser {
                    static deleteOne() {}
                }

                const deleteOneStub = sinon.stub(fakeUser, 'deleteOne');
                deleteOneStub.withArgs({_id: fakeId}).rejects({ message: 'Error' });
                response.status.withArgs(400).returns(response);

                const usersController = new UsersController(fakeUser);
                
                await usersController.delete(request, response);
                sinon.assert.calledWith(response.send, 'Error');
            });
        });
    });

    describe('authenticate() users', () => {
        it('should authenticate an user', async () => {
            const fakeUserModel = {}
            const user = {
                name: 'John Doe',
                email: 'john@doe.com',
                birthDate: '2000-01-01T02:00:00.000Z',
                password: '123456',
                role: 'admin'
            }

            const userWithEncryptedPassword = {
                ...user,
                password: bcrypt.hashSync(user.password, 10)
            };

            const jwtToken = jwt.sign(
                userWithEncryptedPassword,
                config.get('auth.key'),
                {
                    expiresIn: config.get('auth.expiresIn')
                }
            );

            class fakeAuthService {
                authenticate () {
                    return Promise.resolve(userWithEncryptedPassword);
                }

                static generateToken() {
                    return jwtToken;
                }
            }

            const fakeReq = {
                body: user
            };
            const fakeRes = {
                send: sinon.spy()
            };
            const usersController = new UsersController(
                fakeUserModel,
                fakeAuthService
            );

            await usersController.authenticate(fakeReq, fakeRes);
            sinon.assert.calledWith(fakeRes.send, {token: jwtToken });
        });

        it('should return 401 when an user cant be found', async () => {
            const fakeUserModel = {}
            class fakeAuthService {
                authenticate () {
                    return Promise.resolve(false);
                }
            }

            const user = {
                name: 'John Doe',
                email: 'john@doe.com',
                birthDate: '2000-01-01T02:00:00.000Z',
                password: '123456',
                role: 'admin'
            };

            const fakeReq = {
                body: user
            };

            const fakeRes = {
                sendStatus: sinon.spy()
            }

            const usersController = new UsersController(
                fakeUserModel,
                fakeAuthService
            );

            await usersController.authenticate(fakeReq, fakeRes);
            sinon.assert.calledWith(fakeRes.sendStatus, 401);
        });
    });


});