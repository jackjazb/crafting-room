import type { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './AboutPage.module.scss';
import { cms } from '@/lib/server/services';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { md, mdi } from '@/lib/utils';

export const generateMetadata = async (): Promise<Metadata> => {
    const data = await cms.getAboutPage()
        .catch(notFound);

    return {
        title: 'Crafting Room Recordings • About',
        description: data.attributes.meta.description
    };
};

const AboutPage: NextPage = async () => {
    const data = await cms.getAboutPage()
        .catch(notFound);

    return (
        <main>
            <section>
                <StrapiImage
                    className={styles.image}
                    image={data.attributes.image.data}
                    format='xlarge'
                    priority
                    fallbackColor={false}
                />
            </section>

            <section className='container'>
                <h1 dangerouslySetInnerHTML={mdi(data.attributes.header)} />
                <div dangerouslySetInnerHTML={md(data.attributes.content)} />
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

            {data.attributes.contact && (
                <section className='container'>
                    <h1>
                        Contact
                    </h1>
                    {/* TODO: this should be converted to not be a RTE in strapi! */}
                    <div dangerouslySetInnerHTML={md(data.attributes.contact)} />
                </section>
            )}
        </main>
    );
};

export default AboutPage;
