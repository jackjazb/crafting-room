import type { NextPage } from "next";

const NotFoundPage: NextPage = () => {
    return (
        <main>
            <section className="container">
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
