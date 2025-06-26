import ProjetosController from "../../../src/controllers/projetos.js";
import sinon from 'sinon';
import Projeto from "../../../src/models/projeto.js";

describe('Controller: Projetos', () => {
    const defaultProjeto = [
        {
            __v: 0,
            _id: '56cb91bdc3464f14678934ca',
            name: 'Default Projeto',
            description: 'Default description',
            url: 'www.defaulturl.com'
        }
    ];

    const defaultRequest = {
        params: {}
    };

    describe('get() projetos', () => {
        it('should return a list of projetos', async () => {
            const response = {
                send: sinon.spy()
            };
            Projeto.find = sinon.stub();
            Projeto.find.withArgs({}).resolves(defaultProjeto);
            
            const projetosController = new ProjetosController(Projeto);

            await projetosController.get(defaultRequest, response);

            sinon.assert.calledWith(response.send, defaultProjeto);
        });

        it('should return 400 when an error occurs', async () => {
            const request = {};
            const response = {
                send: sinon.spy(),
                status: sinon.stub()
            };
            response.status.withArgs(400).returns(response);
            Projeto.find = sinon.stub();
            Projeto.find.withArgs({}).rejects({message: 'Error'});

            const projetosController = new ProjetosController(Projeto);

            await projetosController.get(request, response);

            sinon.assert.calledWith(response.send, 'Error');
        });
    });

    describe('getById() projetos', () => {
        it('should return one product', async () => {
            const fakeId = 'a-fake-id';
            const request = {
                params: {
                    id: fakeId
                }
            };
            const response = {
                send: sinon.spy()
            };
            
            Projeto.find = sinon.stub();
            Projeto.find.withArgs({ _id: fakeId }).resolves(defaultProjeto);

            const projetosController = new ProjetosController(Projeto);
            await projetosController.getById(request, response);
            
            sinon.assert.calledWith(response.send, defaultProjeto);            
        });
    });

    describe('create() projeto', () => {
        it('should save a new projeto successfully', async () => {
            const requestWithBody  = Object.assign(
                {},
                { body: defaultProjeto[0] },
                defaultRequest
            );
            const response =  {
                send: sinon.spy(),
                status: sinon.stub()
            };
            class fakeProjeto {
                save() {}
            }

            response.status.withArgs(201).returns(response);
            sinon
                .stub(fakeProjeto.prototype, 'save')
                .withArgs()
                .resolves();
            
            const projetosController = new ProjetosController(fakeProjeto);

            await projetosController.post(requestWithBody, response);
            sinon.assert.calledWith(response.send);
        });

        context('when an error occurs', () => {
            it('should return 422', async () => {
                const response = {
                    send: sinon.spy(),
                    status: sinon.stub()
                };

                class fakeProjeto {
                    save() {}
                }

                response.status.withArgs(422).returns(response);
                sinon
                    .stub(fakeProjeto.prototype, 'save')
                    .withArgs()
                    .rejects({message: 'Error' });

                const projetosController = new ProjetosController(fakeProjeto);

                await projetosController.post(defaultRequest, response);
                sinon.assert.calledWith(response.status, 422);
            });
        });
    });

    describe('update() projeto', () => {
        it('it should return 200 when a projeto has been updated', async () => {
            const fakeId = 'a-fake-id';
            const updatedProjeto = {
                _id: fakeId,
                name: 'Updated Projeto',
                description: 'Updated description',
                url: 'www.updatedurl.com'
            };

            const request = {
                params: {
                    id: fakeId
                },
                body: updatedProjeto
            };

            const response = {
                sendStatus: sinon.spy()
            };

            class fakeProjeto {
                static updateOne() {}
            }

            const updateOneStub = sinon.stub(fakeProjeto, 'updateOne');
            updateOneStub
                .withArgs({_id: fakeId}, updatedProjeto)
                .resolves(updatedProjeto);

            const projetosController = new ProjetosController(fakeProjeto);

            await projetosController.put(request, response);
            sinon.assert.calledWith(response.sendStatus, 200);
        });

        context('when an error occurs', () => {
            it('should return 422', async() => {
                const fakeId = 'a-fake-id';
                const updatedProjeto = {
                    _id: fakeId,
                    name: 'Updated Projeto',
                    description: 'Updated description',
                    url: 'www.updatedurl.com'
                };

                const request = {
                    params: {
                        id: fakeId
                    },
                    body: updatedProjeto
                };

                const response = {
                    send: sinon.spy(),
                    status: sinon.stub()
                }

                class fakeProjeto {
                    static updateOne() {}
                }
                
                const updateOneStub = sinon.stub(fakeProjeto, 'updateOne');
                updateOneStub
                    .withArgs({_id:fakeId}, updatedProjeto)
                    .rejects({ message: 'Error' });

                response.status.withArgs(422).returns(response);

                const projetosController = new ProjetosController(fakeProjeto);

                await projetosController.put(request, response);
                sinon.assert.calledWith(response.send, 'Error');
            });
        });

        describe('delete() projeto', () => {
            it('should return 204 when a projeto has been deleted', async() => {
                const fakeId = 'a-fake-id';
                const request = {
                    params:{
                        id: fakeId
                    }
                };

                const response = {
                    sendStatus: sinon.spy()
                };

                class fakeProjeto {
                    static deleteOne() {}
                }

                const deleteOneStub = sinon.stub(fakeProjeto, 'deleteOne');
                deleteOneStub.withArgs({ _id: fakeId }).resolves();

                const projetosController = new ProjetosController(fakeProjeto);

                await projetosController.delete(request, response);
                sinon.assert.calledWith(response.sendStatus, 204);
            });

            context('when an error occurs', () => {
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
                    }

                    class fakeProjeto {
                        static deleteOne() {}
                    }

                    const deleteOneStub = sinon.stub(fakeProjeto, 'deleteOne');
                    deleteOneStub.withArgs({_id: fakeId}).rejects({ message: 'Error' });
                    response.status.withArgs(400).returns(response);

                    const projetosController = new ProjetosController(fakeProjeto);

                    await projetosController.delete(request, response);
                    sinon.assert.calledWith(response.send, 'Error');
                });
            });
        });
    });
});