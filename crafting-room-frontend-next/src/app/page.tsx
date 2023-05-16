import { Homepage, strapiFetch } from "@/lib/strapi-client";
import { Loading } from "@/components/loading/Loading";
import { ReleaseGrid } from "@/components/releases/ReleaseGrid";
import styles from './Home.module.css';
import { NextPage } from "next/types";

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

interface HomeProps {
  homepage: Homepage;
}

const Page = async () => {
  const homepage = await getHomepage();

  const featureImageUrl = process.env.STRAPI_URL + homepage.attributes.feature.data.attributes.images.data[0].attributes.url;
  console.log(featureImageUrl);
  return (
    <div>
      <a href={`articles/${homepage.attributes.feature.data.attributes.title}`}>
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

export default Page;