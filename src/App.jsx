import { useState, useEffect } from "react";
import ProductCard from "./components/ProductCard";
import styled from "styled-components";
import axios from "axios";
import AddProduct from "./components/AddProduct";

export default function App() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    axios
      .get("http://localhost:4000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => {
        alert("상품 데이터를 불러오지 못했습니다.");
      });
  }, []);

  const handleAddProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  };

  const getSortedProducts = () => {
    if (sortOrder === "asc") {
      return [...products].sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "desc") {
      return [...products].sort((a, b) => b.price - a.price);
    }
    return products;
  };

  const sortedProducts = getSortedProducts();

  return (
    <Wrapper>
      <Title>Outer 아우터</Title>
      <AddProduct onAdd={handleAddProduct} />
      <InfoRow>
        <ProductCount>{products.length}개의 상품이 있습니다.</ProductCount>
        <SortSelect
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="default">기본순</option>
          <option value="asc">낮은가격순</option>
          <option value="desc">높은가격순</option>
        </SortSelect>
      </InfoRow>
      <ProductList>
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            brand={product.brand}
            name={product.name}
            price={product.price}
            sale={product.sale}
            image={product.image}
          />
        ))}
      </ProductList>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 24px;
`;

const Title = styled.p`
  font-weight: 700;
  font-size: 2rem;
  margin-bottom: 20px;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ProductCount = styled.span`
  font-size: 1.1rem;
  color: #555;
`;

const SortSelect = styled.select`
  background: #fff;
  border: 1px solid #ddd;
  color: #333;
  padding: 8px 16px;
  font-size: 1rem;
  font-weight: 500;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.2s;
  &:hover {
    border-color: #646cff;
  }
`;

const ProductList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  justify-content: flex-start;
`;
