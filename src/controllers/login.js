class LoginController {
    constructor(User, AuthService){
        this.User = User
        this.AuthService = AuthService
    }

    async login (req, res){
        const { email, senha } = req.body;
        const user = await this.User.findOne({email: email});

        if (email != user.email){
            return res.send('Usuário não encontrado')
        }
        const auth = new this.AuthService(this.User);
        const userAuth = await auth.authenticate(req.body); 

        if(!userAuth){
            return res.send('cant auth')
        }

        const token = this.AuthService.generateToken({
            name: user.name,
            email: user.email,
            birthDate: user.birthDate,
            password: user.password,
            role: user.role
        });
        if(!token){
            return res.send('something happened')
        }
        req.session.user = { id:user._id, email:user.email, role: user.role};
        
        res.status(200).json({message: `Bem vindo ${user.name}!`})
    }

    async verifySession (req, res){
        if(!req.session.user){
            return res.redirect('/login');
        }

        res.redirect('/api-docs', {user: req.session.user})
    }

    async logout (req, res){
        req.session.destroy();
        res.redirect('/login');
    }

}

export default LoginController