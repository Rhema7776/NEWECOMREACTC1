import React, { useRef } from "react";
import { Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../utils/Spinner";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import formatCurrency from "../utils/formatCurrency";
import { useStateContext } from "../lib/ContextApi";
import toast from "react-hot-toast";

export default function FeatureProducts({ error, data, loading }) {
  const scrollRef = useRef();
  const { increaseBagQuantity } = useStateContext();

  const scroll = (scrollOffset) => {
    scrollRef.current.scrollLeft += scrollOffset;
  };
  const featureProducts = data.filter(
    (product) => product.price >= 700 && product.price <= 5000
  );

  console.log(featureProducts);

  return (
    <Container className="mt-5 p-3">
      <h6 className="mt-5">Featured Products</h6>
      {loading && <Spinner />}
      {error ||
        (featureProducts && (
          <>
            {error && <p>{error.message}</p>}
            <div className="position-relative">
              <Container
                ref={scrollRef}
                style={{ scrollBehavior: "smooth" }}
                className="d-flex overflow-scroll scrollBody"
              >
                {featureProducts.slice(0, 9).map((product) => (
                  <div key={product.id} className="me-4">
                    <Link to={`/products/${product.id}`}>
                      <div style={{ width: "270px", height: "350px" }}>
                        <Image
                          src={product?.images[0]}
                          alt={product.title}
                          className=" w-100 h-100"
                        />
                      </div>
                    </Link>
                    <p className="text-dark">{product.title}</p>
                    <p>{formatCurrency(product.price)}</p>
                    <Button
                      variant="outline-dark"
                      className="border-none rounded-0"
                      onClick={() => {
                        increaseBagQuantity(product.id);
                        toast.success(`${product.title} added to bag`);
                      }}
                    >
                      ADD TO BAG
                    </Button>
                  </div>
                ))}
              </Container>
              <div className="d-none d-md-block w-100 position-absolute top-50">
                <div className="d-flex justify-content-between align-items-center">
                  <AiOutlineArrowLeft
                     size="2rem"
                     style={{ cursor: "pointer" }}
                     onClick={() => scroll(-500)}
                   />

                  <AiOutlineArrowRight
                     size="2rem"
                     style={{ cursor: "pointer" }}
                     onClick={() => scroll(500)}
                  />
                </div>
              </div>
            </div>
          </>
        ))}
    </Container>
  );
}
