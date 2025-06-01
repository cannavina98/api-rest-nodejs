before(async () => {
    console.info('rodando')
    const app = await setupApp();
    global.app = app;
    global.request = supertest(app);
});

after(async () => await global.app.database.connection.close());