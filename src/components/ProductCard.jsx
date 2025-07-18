import styled from "styled-components";

export default function ProductCard({ brand, name, sale, price, image }) {
  return (
    <Card>
      <ImageWrapper>
        <ProductImage src={image} alt={name} />
      </ImageWrapper>
      <ProductBrand>{brand}</ProductBrand>
      <ProductName>{name}</ProductName>
      <PriceRow>
        {sale !== undefined && (
          <>
            <SalePercent>{sale}%</SalePercent>
            <OriginPrice>
              {(price / (1 - sale / 100)).toLocaleString()}원
            </OriginPrice>
          </>
        )}
        <ProductPrice>{price.toLocaleString()}원</ProductPrice>
      </PriceRow>
    </Card>
  );
}

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  width: 240px;
  margin: 6px;
  align-items: center;
  padding: 0 0 16px 0;
  text-align: left;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: box-shadow 0.2s;
  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  display: flex;
  flex-direction: column;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 320px; /* 고정 세로 크기 */
  overflow: hidden;
  border-radius: 12px 12px 0 0;
  background: #f7f7f7;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  display: block;
`;

const ProductBrand = styled.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: #222;
  margin: 14px 0 4px 12px;
`;

const ProductName = styled.h3`
  font-size: 1.05rem;
  font-weight: 400;
  color: #444;
  margin: 0 0 10px 12px;
  line-height: 1.3;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 6px;
  margin-left: 12px;
`;

const SalePercent = styled.span`
  color: #e23c3c;
  font-weight: 700;
  font-size: 1.1rem;
`;
const OriginPrice = styled.span`
  color: #bbb;
  font-size: 0.95rem;
  text-decoration: line-through;
`;

const ProductPrice = styled.span`
  color: #222;
  font-weight: bold;
  font-size: 1.1rem;
`;
