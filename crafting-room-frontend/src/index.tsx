import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Error } from './components/Error';
import { Artists } from './components/Artists';
import { Navbar } from './components/Navbar';
import { News } from './components/News';
import { Home } from './components/Home';
import { Store } from './components/Store';
import { Events } from './components/Events';
import { ArtistPage } from './components/ArtistPage';
import { ArticlePage } from './components/ArticlePage';

import './css/skeleton.css';
import "./css/GlobalStyles.css";
import { Loading } from './components/Loading';
import { Footer } from './components/Footer';

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
		errorElement: <Error />
	},
	{
		path: "artists",
		element: <Artists />,
	},
	{
		path: "artists/:name",
		element: <ArtistPage/>
	},
	{
		path: "news",
		element: <News />,
	},
	{
		path: "articles/:name",
		element: <ArticlePage/>
	},
	{
		path: "store",
		element: <Store />,
	},
	{
		path: "events",
		element: <Events />,
	},
	{
		path: "loading",
		element: <Loading />,
	}
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Navbar />
		<RouterProvider router={router} />
		<Footer/>
	</React.StrictMode>
);
