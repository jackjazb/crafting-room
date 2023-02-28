import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Error } from './components/Error';
import { Artists } from './pages/Artists';
import { Navbar } from './components/Navbar';
import { News } from './pages/News';
import { Home } from './pages/Home';
import { Store } from './pages/Store';
import { Events } from './pages/Events';
import { ArtistPage } from './pages/ArtistPage';
import { ArticlePage } from './components/ArticlePage';

import './css/skeleton.css';
import "./css/GlobalStyles.css";
import { Loading } from './components/Loading';
import { Footer } from './components/Footer';
import { BookingFlow } from './pages/BookingFlow';

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
		element: <ArtistPage />
	},
	{
		path: "news",
		element: <News />,
	},
	{
		path: "articles/:name",
		element: <ArticlePage />
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
		path: "bookingflow/:success",
		element: <BookingFlow />
	}
]);

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);

root.render(
	<React.StrictMode>
		<Navbar />
		<RouterProvider router={router} />
		<Footer />
	</React.StrictMode>
);
