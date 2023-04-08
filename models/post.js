const db = require('./db');

const Post = db.sequelize.define('postagens', {
	titulo:{
	type: db.Sequelize.STRING
	},
	conteudo:{
	type: db.Sequelize.TEXT
	}
})

module.exports = Post;

// Cudado ao usar o Post.sync ele deve ser usado somente na criação da tabela
// se ele for disparado novamente ele apagara todos os registros existentes

// Post.sync({force: true})
