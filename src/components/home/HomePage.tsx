import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import policy from '../../assets/fake-data/policy';
import { HomepageRequest } from '../../interfaces/auth';
import { homepageproduct } from '../../services/product';
import Grid from '../common/Grid';
import Helmet from '../common/Helmet';
import HeroSlider from '../slider/HeroSlider';
import PolicyCard from './PolicyCard';
import Section, { SectionBody, SectionTitle } from './Section';
import SlideProduct from './SlideProduct';

const HomePage = () => {
  const [products, setProducts] = useState([] as any);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productPerPage, setProductPerPage] = useState(2);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const res: HomepageRequest = await homepageproduct();
        setProducts(res.Data[0].Products);
        setLoading(false);
      } catch (error) {
        throw error;
      }
    };
    getData();
  }, []);

  if (!products) {
    return <div>Loading</div>;
  }

  return (
    <>
      <HeroSlider />
      <Helmet title="Trang chủ">
        <Section>
          <SectionBody>
            <Grid col={4} mdCol={2} smCol={1} gap={20}>
              {policy.map((item, index) => (
                <Link key={`policy-${index}`} to="#">
                  <PolicyCard name={item.name} icon={item.icon} />
                </Link>
              ))}
            </Grid>
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>iPhone</SectionTitle>
          <SectionBody>
            <SlideProduct products={products} />
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>iPad</SectionTitle>
          <SectionBody>
            <SlideProduct products={products} />
          </SectionBody>
        </Section>
        <Section>
          <SectionTitle>Macbook</SectionTitle>
          <SectionBody>
            <SlideProduct products={products} />
          </SectionBody>
        </Section>
      </Helmet>
    </>
  );
};

export default HomePage;
