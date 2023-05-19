import { Homepage, resolveImageUrl, strapiFetch } from "@/lib/strapi-client";
import { ReleaseGrid } from "@/components/release/ReleaseGrid";
import styles from './Home.module.css';

async function getHomepage(): Promise<Homepage> {
  const path = 'homepage';
  const params = {
    populate: {
      feature: {
        populate: "*"
      },
      releases: {
        populate: "*"
      }
    }
  };

  const response = await strapiFetch(path, params);
  return response?.data;
}

export default async function Home() {
  const homepage = await getHomepage();

  const featureImageUrl = resolveImageUrl(homepage.attributes.feature.data.attributes.images.data[0]);

  return (
    <div>
      <a href={`news/${homepage.attributes.feature.data.attributes.title}`}>
        <div className={styles.featuredImage} style={{ backgroundImage: `url(${featureImageUrl})` }}>
          <div className={styles.featureTitle}>{homepage.attributes.feature.data.attributes.title}</div>
        </div>
      </a>
      <div className={styles.featuredReleases}>
        <h1>Featured Releases</h1>
        <ReleaseGrid columns={4} releases={homepage.attributes.releases.data} />
      </div>
    </div >
  );
}