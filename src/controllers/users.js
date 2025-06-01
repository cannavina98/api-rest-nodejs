class UsersController{
    constructor(User, AuthService){
        this.User = User;
        this.AuthService = AuthService;
    }

    async get (req, res){
        try{
            const user = await this.User.find({});
            res.send(user);
        } catch(err){
            res.status(400).send(err.message);
        }

    }

    async getById (req, res){
        try {
            const user = await this.User.find({ _id: req.params.id })
            res.send(user);
        } catch(err){
            res.status(400).send(err.message);
        }
    }

    async post (req, res){
        const newUser = new this.User(req.body);
        try {
            await newUser.save();
            res.status(201).send(newUser);
        } catch(err){
            return res.status(422).send(err.message);
        }
    }

    async put (req, res){
        const body = req.body
        try{
            const user = await this.User.findById(req.params.id);
            user.name = body.name
            user.birthDate = body.birthDate
            user.email = body.email
            user.role = body.role
            if(body.password){
                user.password = body.password
            }
            await user.save();
            res.sendStatus(200);
        } catch(err) {
            res.status(422).send(err.message);
        }
    }

    async delete(req, res){
        try{
            await this.User.deleteOne({ _id: req.params.id });
            res.sendStatus(204);
        } catch(err){
            res.status(400).send(err.message);
        }
    }

    async authenticate (req, res){
        const authService = new this.AuthService(this.User);
        const user = await authService.authenticate(req.body);
        
        if(!user){
            return res.sendStatus(401);
        }

        const token = this.AuthService.generateToken({
            name: user.name,
            email: user.email,
            birthDate: user.birthDate,
            password: user.password,
            role: user.role
        });

        return res.send({token})
    }
}

export default UsersController;