import type { Metadata, NextPage } from 'next';

export const metadata: Metadata = {
    title: 'Crafting Room Recordings • Not Found'
};

const NotFoundPage: NextPage = () => {
    return (
        <main>
            <section className='container'>
                <h1>
                    404
                </h1>
                <p>
                    Sorry, the requested content could not be found.
                </p>
            </section>
        </main>
    );
};

export default NotFoundPage;
