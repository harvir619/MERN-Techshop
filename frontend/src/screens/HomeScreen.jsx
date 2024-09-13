import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link, useParams } from 'react-router-dom'
import Paginate from '../components/Paginate'
import ProductCarousel from '../components/ProductCarousel'
import Meta from '../components/Meta'

const HomeScreen = () => {
    const {pageNumber,keyword} = useParams()
    const { data, isLoading, isError } = useGetProductsQuery({pageNumber,keyword})
    
  return (
      <>
          {keyword?<Link to='/' className='btn btn-light my-3'>Go Back</Link>:<ProductCarousel/>}
          {isLoading ? (<Loader />) : isError ? 
              <Message variant={"danger"}>
                  {isError?.data?.message || isError.error}
                  </Message>
                  :
              (<>
                  <Meta/>
                  <h1>Latest Products</h1>
                  {data.products ? (
                      <Row>
                    {data.products.map((product) => (
                        <Col key={product._id}   sm={12} md={6} lg={4} xl={3}>
                            <h3 style={{height:'2.3em',overflow:'hidden',textOverflow:'ellipsis'}}>{product.name}</h3>
                            <Product product={product}/>
                        </Col>
                    ))}
                      </Row>)
                    : <Loader />}
                    <Paginate  pages={data.pages} page={data.page} keyword={keyword} />

          </>)}

      </> 
  )
}

export default HomeScreen