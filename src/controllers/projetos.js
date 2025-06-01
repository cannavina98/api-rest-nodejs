class ProjetosController {
    constructor(Projeto){
        this.Projeto = Projeto
    }

    async get (req, res){
        try{
            const projects = await this.Projeto.find({});
            
            res.send( projects );
        } catch(err){
            res.status(400).send(err.message);      
        }
    }

    async getById (req, res){
        const id = req.params.id
        if(!id){
            return res.status(404).json({message: "Projeto não encontrado"});
        }
        try{
            const objproject = await this.Projeto.find({_id: id});
            res.send(objproject)
        } catch(err) {
            res.status(400).send(err.message)
        }
    }

    async post (req, res){        
        //Criar um novo projeto
        const newProject = new this.Projeto(req.body);
        try{
            await newProject.save();
            res.status(201).send(newProject);
        } catch(err) {
            res.status(422).send(err.message);
        }
    }

    async put (req, res){
        try{
            await this.Projeto.updateOne({_id: req.params.id}, req.body);
            res.sendStatus(200)
        } catch (err) {
            res.status(422).send(err.message);
        }
    }

    async delete (req, res){
        try{
            await this.Projeto.deleteOne({_id: req.params.id});
            res.sendStatus(204);
        } catch (err) {
            res.status(400).send(err.message);
        }
    }
}

export default ProjetosController;