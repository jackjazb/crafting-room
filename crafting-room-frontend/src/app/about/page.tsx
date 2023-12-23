import { NextPage } from 'next';
import styles from './AboutPage.module.css';
import { strapi } from '@/lib/api/strapi-client';
import { StrapiImage } from '@/components/strapi-image/strapi-image';
import { markdown, markdownInline } from '@/lib/utils';

const AboutPage: NextPage = async () => {
    const res = await strapi.getAboutPage();
    const aboutPage = res.data;

    return (
        <div className='container'>
            <StrapiImage
                className={styles.image}
                image={aboutPage.attributes.image.data}
                format='medium'
                priority
                fallbackColor={false}
            />

            <h1 dangerouslySetInnerHTML={markdownInline(aboutPage.attributes.header)} />

            <div
                className={styles.content}
                dangerouslySetInnerHTML={markdown(aboutPage.attributes.content)}
            />

            {/*
            This will require some extra thought and conferring with Archie.

            All working except actual storing of emails.

            <h1>Subscribe</h1>
            <p>Subscribe to our mailing list.</p>
            <SubscribeForm />

            */}
            {aboutPage.attributes.contact && (
                <>
                    <h1>
                        Contact
                    </h1>
                    <div //TODO -> check if this is renderInline in strapi. if it isnt a RTE, then turn this into a <a href="mailto:[EMAIL]">
                        className={styles.content}
                        dangerouslySetInnerHTML={markdown(aboutPage.attributes.contact)}
                    />
                </>
            )}
        </div>
    );
};

export default AboutPage;