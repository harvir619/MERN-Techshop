import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Loader from '../components/Loader'
import Message from '../components/Message'


const HomeScreen = () => {
    const { data: products, isLoading, isError } = useGetProductsQuery()
    
  return (
      <>
          {isLoading ? (<Loader />) : isError ? 
              <Message variant={"danger"}>
                  {isError?.data?.message || isError.error}
                  </Message>
                  :
              (<>
                  <h1>Latest Products</h1>
                  {products ? (
                      <Row>
                    {products.map((product) => (
                        <Col key={product._id}   sm={12} md={6} lg={4} xl={3}>
                            <h3>{product.name}</h3>
                            <Product product={product}/>
                        </Col>
                    ))}
                      </Row>)
                    : <Loader />}

          </>)}

      </> 
  )
}

export default HomeScreen