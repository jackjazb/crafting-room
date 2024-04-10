import type { Metadata, NextPage } from 'next';
import { notFound } from 'next/navigation';
import styles from './Article.module.scss';
import { cms, media } from '@/lib/server/services';
import { StrapiImage } from '@/components/strapi-image/StrapiImage';
import { mdi, md, formatDate, cutString } from '@/lib/utils';

interface Props {
    params: { slug: string; };
}

export const generateMetadata = async (props: Props): Promise<Metadata> => {
    const { slug } = props.params;
    const data = await cms.getArticle({ slug })
        .catch(notFound);

    const description = cutString(data.attributes.content);

    return {
        title: `Crafting Room Recordings • News • ${data.attributes.title}`,
        description,
        openGraph: {
            //TODO: url is a pain - https://github.com/vercel/next.js/discussions/50189
            type: 'profile',
            title: data.attributes.title,
            description,
            images: media.resolveUrl(
                media.getImageFormat(data.attributes.images.data[0], 'xlarge').url
            )
        }
    };
};

const ArticlePage: NextPage<Props> = async props => {
    const { slug } = props.params;
    const data = await cms.getArticle({ slug })
        .catch(notFound);

    return (
        <main>
            <StrapiImage
                className={styles.image}
                image={data.attributes.images.data[0]}
                format='source'
                priority
            />

            <section className='container'>
                <hgroup>
                    <h1 dangerouslySetInnerHTML={mdi(data.attributes.title)} />
                    <p className={styles.subtitle}>
                        <span className={styles.date}>
                            {formatDate(data.attributes.createdAt, 'numeric')}
                        </span>
                        {' '}
                        ▸
                        {' '}
                        <span
                            className={styles.author}
                            dangerouslySetInnerHTML={mdi(data.attributes.author)}
                        />
                    </p>
                </hgroup>
                <div dangerouslySetInnerHTML={md(data.attributes.content)} />
            </section>
        </main>
    );
};

export default ArticlePage;
