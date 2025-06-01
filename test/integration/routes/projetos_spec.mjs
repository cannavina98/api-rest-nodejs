import Projeto from '../../../src/models/projeto.js';
import AuthService from '../../../src/services/auth.js';


describe('Routes: Projetos', () => {
    const defaultId = '56cb91bdc3464f14678934ca';
    const defaultProjeto = {
        name: 'Default Projeto',
        description: 'Projeto Description',
        url: 'www.projetourl.com'
    };

    const expectedProjeto = {
        __v: 0,
        _id: defaultId,
        name: 'Default Projeto',
        description: 'Projeto Description',
        url: 'www.projetourl.com'
    };

    const expectedAdminUser = {
        _id: defaultId,
        name: 'John Doe',
        email: 'john@doe.com',
        role: 'admin'
    };
    
    const authToken = AuthService.generateToken(expectedAdminUser);

    beforeEach(async () => {        
        try {
            await Projeto.deleteMany();
        } catch(err){
            console.error(err)
        }
        const projeto = new Projeto(defaultProjeto);
        projeto._id = '56cb91bdc3464f14678934ca';

        return await projeto.save();
    });

    afterEach(async () => await Projeto.deleteMany());

    describe('GET /projetos', () => {
        it('should return a list of products', done => {
            request
                .get('/projetos')
                .set({'x-access-token': authToken })
                .end((err, res) => {
                    expect(res.body).to.eql([expectedProjeto]);
                    done(err);
                });
        });
        
        context('when an id is specified', () => {
            it('should return 200 with one product', done => {
                request
                    .get(`/projetos/${defaultId}`)
                    .set({'x-access-token': authToken})
                    .end((err, res) => {
                        expect(res.statusCode).to.eql(200);
                        expect(res.body).to.eql([expectedProjeto]);
                        done(err);
                    });
            });
        });
    });
    
    describe('POST /projetos', () => {
        context('when posting a projeto', () => {
            it('should return a new product with status code 201', done => {
                const customId = '56cb91bdc3464f14678934ba';
                const newProjeto = Object.assign(
                    {},
                    {_id: customId, __v: 0},
                    defaultProjeto
                );

                const expectedSavedProjeto = {
                    __v: 0,
                    _id: customId,
                    name: 'Default Projeto',
                    description: 'Projeto Description',
                    url: 'www.projetourl.com'
                };
                
                request
                    .post('/projetos')
                    .set({'x-access-token': authToken})
                    .send(newProjeto)
                    .end((err, res) => {
                        expect(res.statusCode).to.eql(201);
                        expect(res.body).to.eql(expectedSavedProjeto);
                        done(err);
                    });
            });
        });
    });

    describe('PUT /projetos/:id', () => {
        context('when editing a product', () => {
            it('should update the product and return 200 as status code', done => {
                const customProjeto = {
                    name: 'Custom Name'
                };

                const updatedProjeto = Object.assign({}, customProjeto, defaultProjeto);

                request
                    .put(`/projetos/${defaultId}`)
                    .set({'x-access-token': authToken})
                    .send(updatedProjeto)
                    .end((err, res) => {
                        expect(res.status).to.eql(200);
                        done(err);
                    });
            });
        });
    });

    describe('DELETE /projetos/:id', () => {
        context('when deleting a projeto', () => {
            it('should delete a projeto and return 204 as status code', done => {
                request
                    .delete(`/projetos/${defaultId}`)
                    .set({ 'x-access-token':authToken })
                    .end((err, res) => {
                        expect(res.status).to.eql(204);
                        done(err);
                    });
            });
        });
    });
});