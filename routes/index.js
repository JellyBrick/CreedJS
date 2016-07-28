module.experts = app => {
	app.get('/', (req, res) => res.render('home', {title: 'MineJet:Powerful MC:PE Server Manager'}));
}