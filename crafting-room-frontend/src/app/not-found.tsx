import type { NextPage } from 'next';

const NotFoundPage: NextPage = () => {
    return (
        <main>
            <section className='container'>
                <h1>
                    404
                </h1>
                <span>
                    Sorry, the requested content could not be found.
                </span>
            </section>
        </main>
    );
};

export default NotFoundPage;
