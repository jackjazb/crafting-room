import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import { Error } from './components/base/error/Error';
import { Artists } from './components/artists/Artists';
import { Navbar } from './components/base/navbar/Navbar';
import { News } from './components/news/News';
import { Home } from './components/home/Home';
import { Store } from './components/store/Store';
import { Events } from './components/events/Events';
import { ArtistPage } from './components/artists/ArtistPage';
import { ArticlePage } from './components/news/ArticlePage';

import './skeleton.css';
import "./Global.css";
import { Footer } from './components/base/footer/Footer';
import { BookingFlow } from './components/events/BookingFlow';

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
