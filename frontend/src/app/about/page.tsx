import type { NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './AboutPage.module.scss';
import { cms } from '@/lib/server/services';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { md, mdi } from '@/lib/utils';
import { Secret } from '@/components/secret/Secret';

const AboutPage: NextPage = async () => {
    const aboutPage = await cms.getAboutPage()
        .catch(notFound);

    return (
        <main>
            <Secret />
            <section>
                <StrapiImage
                    className={styles.image}
                    image={aboutPage.attributes.image.data}
                    format='xlarge'
                    priority
                    fallbackColor={false}
                />
            </section>

            <section className='container'>
                <h1 dangerouslySetInnerHTML={mdi(aboutPage.attributes.header)} />
                <div dangerouslySetInnerHTML={md(aboutPage.attributes.content)} />
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

            {aboutPage.attributes.contact && (
                <section className='container'>
                    <h1>
                        Contact
                    </h1>
                    {/* TODO: this should be converted to not be a RTE in strapi! */}
                    <div dangerouslySetInnerHTML={md(aboutPage.attributes.contact)} />
                </section>
            )}
        </main>
    );
};

export default AboutPage;
