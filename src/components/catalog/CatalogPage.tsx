import { useCallback, useEffect, useRef, useState } from 'react';
import capacitys from '../../assets/fake-data/capacity.js';
import { IProductItemDetail } from '../../interfaces/ProductItem.js';
import { searchproduct } from '../../services/auth';
import ButtonDunk from '../checkout/ButtonDunk';
import Grid from '../common/Grid';
import ProductCard from '../product/ProductCard';
import useDebounce from './../../hooks/useDebounce';
import CheckBox from './../common/Checkbox';
import Helmet from './../common/Helmet';

interface IFilter {
  capacity: string[];
}
interface ICapacity {
  capacity: string;
}
const initFilter: IFilter = {
  capacity: [],
};

const CatalogPage = () => {
  // list product
  const [searchProduct, setSearchProduct] = useState<string>('');
  const [productCatalog, setProductCatalog] = useState<IProductItemDetail[]>([]);

  // sort by
  const [sortValue, setSortValue] = useState<string>('');
  const [sortByName, setSortByName] = useState<boolean>(true);
  const [sortByPrice, setSortByPrice] = useState<boolean>(true);
  const [filter, setFilter] = useState(initFilter);

  // debounce search
  const debouncedSearchProduct: string = useDebounce<string>(searchProduct, 1000);

  // call api
  useEffect(() => {
    const searchItem = async (searchProduct: string) => {
      if (sortValue === 'Name') {
        setSortByName(false);
        setSortByPrice(true);
      } else if (sortValue === 'Sort') {
        setSortByName(true);
        setSortByPrice(true);
      }
      try {
        const res = await searchproduct(sortByName, sortByPrice, searchProduct);

        let temp = res.Data.Products;
        if (filter.capacity.length > 0) {
          temp = temp.filter((product: { Capacity: { Name: string } }) =>
            filter.capacity.includes(product.Capacity?.Name!),
          );
        }

        setProductCatalog(temp);
      } catch (err) {
        console.log(err);
      }
    };
    if (debouncedSearchProduct) {
      searchItem(debouncedSearchProduct);
    }
    searchItem(searchProduct);
  }, [sortByName, sortByPrice, sortValue, debouncedSearchProduct, filter]);

  // filter
  const getAllProducts = () => productCatalog;
  const productData = {
    getAllProducts,
  };
  const listProduct = productData.getAllProducts();
  console.log(listProduct);

  const filterSelect = (type: string, checked: boolean, item: ICapacity) => {
    if (checked) {
      switch (type) {
        case 'CAPACITY':
          setFilter({ ...filter, capacity: [...filter.capacity, item.capacity] });
          break;
      }
    } else {
      switch (type) {
        case 'CAPACITY':
          const newCapacity = filter.capacity.filter(e => e !== item.capacity);
          setFilter({ ...filter, capacity: newCapacity });
          break;
      }
    }
  };

  const filterRef = useRef<HTMLDivElement>(null);

  const showHideFilter = () => filterRef.current!.classList.toggle('active');

  const clearFilter = () => setFilter(initFilter);

  return (
    <Helmet title="Sản phẩm">
      <div className="catalog">
        <div className="catalog__filter" ref={filterRef}>
          <div className="catalog__filter__close" onClick={() => showHideFilter()}>
            <i className="bx bx-left-arrow-alt" />
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Search</div>
            <div className="catalog__filter__widget__content__search">
              <input
                className="dunk-input"
                type="text"
                onChange={e => {
                  setSearchProduct(e.target.value);
                }}
              />
              <i className="bx bx-search" />
            </div>
          </div>
          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Sort</div>
            <div className="catalog__filter__widget__content">
              <select
                id="sort"
                className="dunk-input"
                style={{ height: '60px' }}
                value={sortValue}
                onChange={e => setSortValue(e.target.value)}
              >
                <option className="dunk-input" value="Sort">
                  Default
                </option>
                {/* <option className="dunk-input" value="Price">
                  Price
                </option> */}
                <option className="dunk-input" value="Name">
                  Name
                </option>
              </select>
            </div>
          </div>

          <div className="catalog__filter__widget">
            <div className="catalog__filter__widget__title">Capacity</div>
            <div className="catalog__filter__widget__content">
              {capacitys.map((item, index) => (
                <div
                  key={`filter-capacity-${index}`}
                  className="catalog__filter__widget__content__item"
                >
                  <CheckBox
                    label={item.display}
                    onChange={(input: any) => filterSelect('CAPACITY', input.checked, item)}
                    checked={filter.capacity.includes(item.capacity)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="catalog__filter__widget">
            <ButtonDunk type="button" text="Clear filter" onClick={clearFilter} />
          </div>
        </div>
        <div className="catalog__filter__toggle">
          <ButtonDunk type="button" text="Filter" onClick={showHideFilter} />
        </div>
        <div className="catalog__content">
          <Grid col={3} mdCol={2} smCol={1} gap={20}>
            {productCatalog.map(item => (
              <ProductCard
                key={`catalog-${item.Id}`}
                image={item.Images[0].Link}
                name={item.Name}
                price={item.Price}
                id={item.Id}
              />
            ))}
          </Grid>
        </div>
      </div>
    </Helmet>
  );
};

export default CatalogPage;
