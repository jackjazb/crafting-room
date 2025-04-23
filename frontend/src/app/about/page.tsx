import { StrapiImage } from "@/components/strapi-image/StrapiImage";
import { content } from "@/lib/server/content";
import { md, mdi } from "@/lib/utils";
import type { NextPage } from "next";
import styles from "./AboutPage.module.scss";

const AboutPage: NextPage = async () => {
    const aboutPage = await content.aboutPage();// await cms.getAboutPage()
    // .catch(notFound);

    return (
        <main>
            <section>
                <StrapiImage
                    className={styles.image}
                    image={aboutPage.image}
                    format="xlarge"
                    priority
                    fallbackColor={false}
                />
            </section>

            <section className="container">
                <h1 dangerouslySetInnerHTML={mdi(aboutPage.header)} />
                <div dangerouslySetInnerHTML={md(aboutPage.content)} />
            </section>

            {/*
            This will require some extra thought and conferring with Archie.

            All working except actual storing of emails.

            <section>
            <h1>Subscribe</h1>
            <p>Subscribe to our mailing list.</p>
            <SubscribeForm />
            </section>

            */}

            {aboutPage.contact && (
                <section className="container">
                    <h1>
                        Contact
                    </h1>
                    <div dangerouslySetInnerHTML={md(aboutPage.contact)} />
                </section>
            )}
        </main>
    );
};

export default AboutPage;
