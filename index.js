const express = require('express');
const app = express();
const { engine } = require ('express-handlebars');
const bodyParser = require ('body-parser');
const Post = require('./models/post')
//template engine (main é o template padrão)
app.engine('handlebars', engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars');
app.set("views", "./views");
const cors = require('cors');
app.use(cors());

//BodyParser

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// rota
// Exibir
app.get('/', (req, res) => {
        Post.findAll({ 
        	order: [['createdAt', 'DESC']] 
        	}).then(function(posts) {
            res.render('home', {posts: posts})
        })
    })
//criar e coletar
app.get('/cad', function(req, res){
	res.render('./layouts/formulario')
})

app.post('/add', function(req, res){
	
	Post.create({
		titulo: req.body.titulo,
		conteudo: req.body.conteudo
		}).then(function(){
			res.redirect('/')
		}).catch(function(erro){
			res.send('Houve algum erro' + erro)
		})

	// res.send('Titulo: '+ req.body.titulo+' Conteudo: '+req.body.conteudo)
})
//atualizar 
app.get('/editar/:id', function(req, res) {
    Post.findByPk(req.params.id).then(function(post) {
        res.render('./layouts/editar', {post: post});
    }).catch(function(erro) {
        res.send('Essa postagem não existe');
    });
});

app.post('/update/:id', function(req, res) {
    Post.update({
        titulo: req.body.titulo,
        conteudo: req.body.conteudo
    }, {
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/');
    }).catch(function(erro) {
        res.send('Houve um erro ao atualizar a postagem: ' + erro);
    });
});

//apagar
app.get('/deletar/:id', function(req, res) {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(function() {
        res.redirect('/');
    }).catch(function(erro) {
        res.send('Houve um erro ao excluir a postagem: ' + erro);
    });
});


//porta
app.listen(8081, function(){
	console.log('Servidor rodando em 8081')
});

//Instale a dependencia | npm i -D handlebars@4.5.0