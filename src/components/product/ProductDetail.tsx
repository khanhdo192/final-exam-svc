import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { HomepageRequest } from '../../interfaces/auth';
import { IProductItemDetail } from '../../interfaces/ProductItem';
import { homepageproduct, productdetail } from '../../services/product';
import Helmet from '../common/Helmet';
import Section, { SectionBody, SectionTitle } from '../home/Section';
import SlideProduct from '../home/SlideProduct';
import ProductView from './ProductView';

const ProductDetail = () => {
  const { productId } = useParams();
  const [productDetail, setProductDetail] = useState<IProductItemDetail | undefined>();
  const [products, setProducts] = useState([] as any);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await productdetail(productId);
        setProductDetail(res.Data);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [productId]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [productDetail]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res: HomepageRequest = await homepageproduct();
        setProducts(res.Data[0].Products);
      } catch (error) {
        throw error;
      }
    };
    getData();
  }, []);

  if (!productDetail) {
    return <div>Loading</div>;
  }
  return (
    <Helmet title={productDetail?.Name}>
      <Section>
        <SectionBody>
          <ProductView product={productDetail} />
        </SectionBody>
      </Section>

      <Section>
        <SectionTitle>Khám phá thêm</SectionTitle>
        <SectionBody>
          <SlideProduct products={products} />
        </SectionBody>
      </Section>
    </Helmet>
  );
};

export default ProductDetail;
