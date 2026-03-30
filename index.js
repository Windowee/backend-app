// DOT ENV
import dotenv from 'dotenv';
import fs from 'fs';
dotenv.config();


// EXPRESS
import express from'express';
const app=express();
const PORT=process.env.PORT||3000;
app.use(express.static('public'));
const root_dir=process.cwd();
process.env.FRONTENDS.trim().split(',').forEach(route=>{
	route=route.trim()
	const dir='public'+route;
	app.get(`${route}/*`,(req,res,next)=>{
		fs.stat(dir+req.path.substr(route.length),(err,stats)=>{
			if(!err&&stats.isFile())
				return next();
			res.sendFile(root_dir+'/'+dir+'/'+'index.html');
		});
	});
});



// BODY PARSER
import body_parser from'body-parser';
app.use(body_parser.json());


// API ROUTES
import v3 from'./src/v3/index.js';
app.use(v3);


// GUI ROUTES
app.set('view engine','ejs');
app.set('views','./res/gui');
import gui from'./src/gui/index.js';
app.use(gui);

app.use((req,res,next)=>res.sendFile(root_dir+'/public/index.html'));

// SERVE
app.listen(PORT,()=>{
	console.log(`Server is running on http://localhost:${PORT}/`);
});

