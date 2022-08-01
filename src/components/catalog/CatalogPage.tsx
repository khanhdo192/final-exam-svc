import { useEffect, useRef, useState } from 'react';
import capacitys from '../../assets/fake-data/capacity.js';
import { IProductItemDetail } from '../../interfaces/ProductItem.js';
import { searchproduct } from '../../services/product';
import ButtonDunk from '../checkout/ButtonDunk';
import Grid from '../common/Grid';
import ProductCard from '../product/ProductCard';
import useDebounce from './../../hooks/useDebounce';
import CheckBox from './../common/Checkbox';
import Helmet from './../common/Helmet';
import querystring from 'querystring';
import Pagination from './Pagination';
import Spinner from 'react-bootstrap/Spinner';
import { useSearchParams } from 'react-router-dom';
import { setTimeout } from 'timers/promises';
import useOnClickOutside from '../../hooks/useOnClickOutside';

interface IFilter {
  capacity: string[];
}
interface ICapacity {
  capacity: string;
}
// const initFilter: IFilter = {
//   capacity: [],
// };
const initFilter: IFilter = {
  capacity: [],
};

const CatalogPage = () => {
  // list product
  const [searchParams, setSearchParams] = useSearchParams();
  // let updatedSearchParams = new URLSearchParams(searchParams.toString());
  // updatedSearchParams.set('operation', 'edit');
  // setSearchParams(updatedSearchParams.toString());

  const [sortParams, setSortParams] = useSearchParams();
  const [capacityParams, setCapacityParams] = useSearchParams();
  const capacityQuery = capacityParams.get('query') || '';

  const [searchProduct, setSearchProduct] = useState<string>(searchParams.get('keyword') || '');
  const [productCatalog, setProductCatalog] = useState<IProductItemDetail[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  // sort by
  const [sortValue, setSortValue] = useState<string>(sortParams.get('sort') || '');
  const [sortByName, setSortByName] = useState<string>('');
  const [sortByPrice, setSortByPrice] = useState<string>('');
  const [filter, setFilter] = useState(initFilter);

  // debounce search
  const debouncedSearchProduct: string = useDebounce<string>(searchProduct, 800);

  const keywordSearch = searchParams.get('keyword') || '';
  const keyword = searchParams.get('keyword') || '';
  const keywordSort = sortParams.get('sort') || '';
  let sort = sortParams.get('sort') || '';

  // pagination
  const [pageCount, setPageCount] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [postsPerPage, setPostsPerPage] = useState<number>(8);
  const [totalPosts, setTotalPosts] = useState<number>(0);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const currentPosts = productCatalog.slice(indexOfFirstPost, indexOfLastPost);
  // call api
  useEffect(() => {
    const searchItem = async (searchProduct: string) => {
      // filter by name , price
      if (sortValue === 'NameASC') {
        setSortByName('asc');
        setSortByPrice('');
      } else if (sortValue === 'NameDESC') {
        setSortByName('desc');
        setSortByPrice('');
      } else if (sortValue === 'PriceASC') {
        setSortByPrice('asc');
        setSortByName('');
      } else if (sortValue === 'PriceDESC') {
        setSortByPrice('desc');
        setSortByName('');
      } else if (sortValue === '') {
        setSortByName('');
        setSortByPrice('');
      }
      try {
        const res = await searchproduct(sortByName, sortByPrice, searchProduct, currentPage);
        setLoading(true);

        setPageCount(res.Data.TotalPage);
        setTotalPosts(res.Data.TotalCount);

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

    searchItem(searchProduct);
    return () => {
      setLoading(false);
    };
  }, [sortByName, sortByPrice, sortValue, debouncedSearchProduct, filter, currentPage]);

  //
  const searchHandle = (event: any) => {
    setSearchProduct(event.target.value);

    const keyword = event.target.value;
    if (keyword) {
      setSearchParams({ keyword, sort });
    } else {
      setSearchParams({ sort });
    }
  };

  const sortHandle = (event: any) => {
    setSortValue(event.target.value);
    const sort = event.target.value;
    if (sort) {
      setSortParams({ sort, keyword });
    } else {
      setSortParams({ keyword });
    }
  };

  // checkbox filter selected
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
  //pagination handle
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  //cleafilter

  const filterRef = useRef<HTMLDivElement>(null);
  const clickOutsidehandler = () => {
    filterRef.current?.classList.remove('active');
  };
  useOnClickOutside(filterRef, clickOutsidehandler);

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
                value={keywordSearch}
                onChange={searchHandle}
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
                onChange={sortHandle}
              >
                <option className="dunk-input" value="">
                  Default
                </option>
                <option className="dunk-input" value="NameASC">
                  Name: A - Z
                </option>
                <option className="dunk-input" value="NameDESC">
                  Name: Z - A
                </option>
                <option className="dunk-input" value="PriceASC">
                  Price: Low to High
                </option>
                <option className="dunk-input" value="PriceDESC">
                  Price: High to Low
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
                    onChange={(event: any) => filterSelect('CAPACITY', event.checked, item)}
                    checked={filter.capacity.includes(item.capacity)}
                    value={capacityQuery}
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
            {loading ? (
              productCatalog.map(item => (
                <ProductCard
                  key={`catalog-${item.Id}`}
                  image={item.Images[1].Link}
                  name={item.Name}
                  price={item.Price}
                  id={item.Id}
                />
              ))
            ) : (
              <Spinner animation="border" />
            )}
          </Grid>
          <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={paginate} />
        </div>
      </div>
    </Helmet>
  );
};

export default CatalogPage;
