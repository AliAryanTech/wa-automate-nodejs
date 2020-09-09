const meow = require('meow');
const wa = require('../dist');
const { create, SimpleListener, generatePostmanJson, ev } = wa;
const path = require('path');
const express = require('express');
const app = express();
const fs = require('fs');
const uuidAPIKey = require('uuid-apikey');
const p2s = require('postman-2-swagger');
const swaggerUi = require('swagger-ui-express');
const terminalLink = require('terminal-link');

const extraFlags = {};
const configWithCases = require('./config-schema.json');

configWithCases.map(({ type, key }) => {
	if (key === "popup") type = "number"; extraFlags[key] = {
		type
	}
});
const configParamText = configWithCases.map(o => `      --${o.p}\t\t${o.p.length < 14 ? `\t` : ``}${o.p.length < 6 ? `\t` : ``}${o.description}`).join("\n")

const cli = meow(`
	Usage
	  $ @open-wa/wa-automate

	Options
      --no-api, -n \t\t\tDon't expose the api. This may be useful if you just want to set the webhooks
      --port, -p \t\t\tSet the port for the api. Default to 8002
      --host, -h \t\t\tSet the hostname for the service. Default: localhost
      --webhook, -w \t\t\twebhook to use for the listeners
      --key, -k \t\t\tspecify an api key to use as a check for all requests. If you add -k by itself, a key will be autogenerated for you.
      --config, -c \t\t\tThe relative json file that contains the config. By default the system will look for config.json which will override any config variables set. Default: './config.json'
      --session, -s \t\t\tA base64 string representing the session data.
      --keep-alive, -a \t\tIf set, the system will force the session to refocus in this process. This will prevent you from opening a whatsapp session anywhere else.
      --use-session-id-in-path, -i \tIf set, all API paths will include the session id. default to false and the default session Id is 'session'.
      --generate-api-docs, -d \t\tGenerate postman collection and expose api docs to open in browser.
      --session-data-only, -o \t\tKill the process when the sesion data is saved.
      --license, -l \t\t\tThe license key you want to use for this server. License keys are used to unlock features. Learn more here https://github.com/open-wa/wa-automate-nodejs#license-key
${configParamText}
	  --skip-save-postman-collection \t\t\tDon't save the postman collection.
	  --in-docker \t\t\tGrab config options from the environment variables
	  --api-host \t\t\tThe easy API may be sitting behind a reverse proxy. In this case set --api-host in order to make sure the api docs and api explorer are working properly. You will need to include the protocol as well.

	Please check here for more information on some of the above mentioned parameters: https://open-wa.github.io/wa-automate-nodejs/interfaces/configobject.html

	Examples
	  $ open-wa -p 8080 --disable-spins -a
	  
`, {
	flags: {
		port: {
			type: 'number',
			alias: 'p',
			default: 8002
		},
		host: {
			type: 'string',
			alias: 'h',
			default: 'localhost'
		},
		apiHost: {
			type: 'string',
		},
		webhook: {
			type: 'string',
			alias: 'w'
		},
		key: {
			type: 'string',
			alias: 'k'
		},
		config: {
			type: 'string',
			alias: 'w'
		},
		session: {
			type: 'string',
			alias: 's'
		},
		noApi: {
			type: 'boolean',
			alias: 'n',
			default: false
		},
		licenseKey: {
			type: 'string',
			alias: 'l'
		},
		keepAlive: {
			type: 'boolean',
			alias: 'a'
		},
		useSessionIdInPath: {
			type: 'boolean',
			alias: 'i'
		},
		generateApiDocs: {
			type: 'boolean',
			alias: 'd',
			default: true
		},
		sessionDataOnly: {
			type: 'boolean',
			alias: 'o',
			default: false
		},
		inDocker: {
			type: 'boolean',
			default: false
		},
		skipSavePostmanCollection: {
			type: 'boolean',
			default: false
		},
		...extraFlags,
		popup: { 
			type: 'boolean',
			default: false
		},
		popupPort: {
		type: 'number',
		}
	},
	booleanDefault: undefined
});

app.use(express.json({ limit: '200mb' })) //add the limit option so we can send base64 data through the api
const c = cli.flags;
const PORT = c.port;
let config = {};
if (c && c.config) {
	//get the config file
	const configJsonPath = path.join(path.resolve(process.cwd()), c.config || `config.json`);
	if (fs.existsSync(configJsonPath)) {
		try {
			config = JSON.parse(fs.readFileSync(configJsonPath));
		} catch (error) {
			throw `Unable to parse config file as JSON. Please make sure ${configJsonPath} is a valid JSON config file`;
		}
	} else throw `config not found at ${configJsonPath}`;
} else {
	config = {
		...c
	};
}

if (c && c.session) {
	c.sessionData = c.session;
}

if (c && c.licenseKey) {
	config = {
		...config,
		licenseKey: c.licenseKey
	}
}

if(c && c.popup) {
	config = {
		...config,
		popup: PORT
	}
}

if (!(c.key == null) && c.key == "") {
	//generate the key
	c.key = uuidAPIKey.create().apiKey;
}

if(c.sessionDataOnly){
	ev.on(`sessionData.**`, async (sessionData, sessionId) =>{
		fs.writeFile(`${sessionId}.data.json`, JSON.stringify(sessionData), (err) => {
			if (err) { console.error(err); return; }
			else 
			console.log(`Session data saved: ${sessionId}.data.json\nClosing.`);
			process.exit();
		  });
	  })
}

create({ ...config })
	.then(async (client) => {
		if (c && c.webhook) Object.keys(SimpleListener).map(eventKey => client.registerWebhook(SimpleListener[eventKey], c.webhook))

		if(c && c.keepAlive) client.onStateChanged(state=>{
			if(state==="CONFLICT" || state==="UNLAUNCHED") client.forceRefocus();
		  });

		if (!(c && c.noApi)) {
			if(c && c.key) {
				console.log(`Please use the following api key for requests as a header:\nkey: ${c.key}`)
				app.use((req, res, next) => {
					const apiKey = req.get('key')
					if (!apiKey || apiKey !== c.key) {
					  res.status(401).json({error: 'unauthorised'})
					} else {
					  next()
					}
				  })
			}

			if(c && c.generateApiDocs) {
				console.log('Generating API Docs');
				if(!c.sessionId) c.sessionId = 'session';
				const postmanCollection = await generatePostmanJson({
					...c,
					...config
				});
				console.log(`Postman collection generated: open-wa-${c.sessionId}.postman_collection.json`);
				const swCol = p2s.default(postmanCollection);
				/**
				 * Fix swagger docs by removing the content type as a required paramater
				 */
				Object.keys(swCol.paths).forEach(p => {
					let path = swCol.paths[p].post;
					let index = [...path.parameters].findIndex(({name})=>name=="Content-Type");
					if(index > -1) path.parameters.splice(index, 1);
				});
				app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swCol));
			}
			
			app.use(client.middleware((c && c.useSessionIdInPath)));
			app.listen(PORT, () => console.log(`\n• Listening on port ${PORT}!`));
			const apiDocsUrl = c.apiHost ? `${c.apiHost}/api-docs/ `: `${c.host.includes('http') ? '' : 'http://'}${c.host}:${PORT}/api-docs/ `;
			const link = terminalLink('API Explorer', apiDocsUrl);
			if(c && c.generateApiDocs)  console.log(`\nCheck out the API here: ${link}`)

		}
	})
	.catch(e => console.log('Error', e.message));