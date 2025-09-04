import setupApp from "./app.js";
const port = 3000;
(async () => {
    try {
      const app = await setupApp();
      const server = app.listen(port, () =>
        console.info(`app running on port ${port}`)
      );
  
      const exitSignals = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
      exitSignals.map(sig =>
        process.on(sig, async () =>{
          try{
            await new Promise((resolve, reject) => {
              server.close(err=>{
                if (err) return reject(err);
                resolve();
              });
            });
              await app.database.connection.close();
              console.info('Database connection closed!');
              process.exit(0);
          } catch (err) {
            console.error('Error during shutdown: ', err);
            process.exit(1);
          }
          
        })
      );
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  })();