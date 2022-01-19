import React from 'react';
import { MemoryRouter as Router, Route } from 'react-router-dom';
import Page from './components/page';
import { List, ListItem } from './components/list';

// Pages
import About from './views/about';
import Game from './views/game';
import Library from './views/library';
import Repos from './views/repos/repos';
import Repo from './views/repos/repo';
import Settings from './views/settings';
import Skins from './views/skins/skins';
import SkinsCollection from './views/skins/collection';

const url = new URL(window.location.href);

export default function App(props: {
	standalone: boolean;
}) {
	return (
		<Router>
			<div className={`app${props.standalone ? ' standalone' : ''}`}>
			<div className="statusbar" />
			<div className="dialog-zone" />
			{!(url.protocol === 'http:' && (url.hostname === 'dinopolice.github.io' || url.hostname === 'dinopolice.github.io')) ? 
				<>
					<Route exact path="/" component={Library} />
					<Route exact path="/repos" component={Repos} />
					<Route exact path="/repos/:url" component={Repo} />
					<Route exact path="/about" component={About} />
					<Route exact path="/skins" component={Skins} />
					<Route exact path="/skins/:id" component={SkinsCollection} />
					<Route exact path="/game/:id" component={Game} />
					<Route exact path="/settings" component={Settings} />
				</> :
				(
					<HTTPBad />
				)
			}
			</div>
		</Router>
	);
}

function HTTPBad() {
	return (
		<Page>
			<div className="http-error">
				<h1>You're on HTTP.</h1>
				<p>You are using Eclipse on http, which has been depreciated. We do this because offline support, Google Drive, and a chunk of the new features are only possible when accessing Eclipse via https://. </p>
				<br/>
				<h3>How Can I Fix This?</h3>
				<p>By heading over to <a href="https://eclipseemu.me/play">https://eclipseemu.me/play</a>{
					//@ts-ignore
					(navigator.standalone) ? 
						<span> and readding Eclipse to your homescreen</span> : 
						null
				}.</p>
				<br/>
				<h3>How Do I Keep My Data?</h3>
				<p>By tapping/clicking on the button below.</p>
				<List>
					<ListItem 
						link="#"
						title="Export Backup" 
						media={<i className="f7-icons">arrow_down_doc_fill</i>}
						onClick={() => {
							alert('Hello');
						}}
					/>
				</List>
			</div>
		</Page>
	);
}
