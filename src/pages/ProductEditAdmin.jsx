import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductEditAdmin({ onEdit }) {
  const [productId, setProductId] = useState(null);
  // 상품 기본 정보 (API에서 불러와도 수정하지 않음)
  const [baseInfo, setBaseInfo] = useState({
    image: "",
    name: "",
    rating: 0,
    reviews: 0,
    price: 0,
    soldout: false,
  });
  // **필터 정보 상태**
  const [filters, setFilters] = useState({
    type: "", // shoes, clothes (상품 종류)
    color: "", // red, blue, black, white, gray, etc.
    gender: "", // male, female, unisex
    clothesType: "", // shirt, jacket, pants, etc. (type이 clothes일 때만 표시)
    sort: "", // latest, oldest, high_rating
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // 최신 상품 ID 자동 조회
  useEffect(() => {
    const fetchLatestProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:4000/products");
        const products = res.data;
        if (products.length > 0) {
          const lastProduct = products[products.length - 1];
          setProductId(lastProduct.id);
          const productRes = await axios.get(
            `http://localhost:4000/products/${lastProduct.id}`
          );
          const product = productRes.data;
          setBaseInfo({
            image: product.image,
            name: product.name,
            rating: product.rating,
            reviews: product.reviews,
            price: product.price,
            soldout: product.soldout,
          });
          setFilters({
            type: product.type || "",
            color: product.color || "",
            gender: product.gender || "",
            clothesType: product.clothesType || "",
            sort: product.sort || "",
          });
          setMessage("✅ 마지막 상품 정보를 불러왔습니다.");
        } else {
          setMessage("❌ 등록된 상품이 없습니다.");
        }
      } catch (err) {
        setMessage("❌ 상품 정보를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProduct();
  }, []);

  // 상품 ID 수동 입력 핸들러
  const handleIdChange = (e) => {
    setProductId(e.target.value);
  };

  // 수동 불러오기 핸들러
  const handleLoad = async () => {
    if (!productId) {
      setMessage("상품 ID를 입력하세요.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:4000/products/${productId}`
      );
      const product = res.data;
      setBaseInfo({
        image: product.image,
        name: product.name,
        rating: product.rating,
        reviews: product.reviews,
        price: product.price,
        soldout: product.soldout,
      });
      setFilters({
        type: product.type || "",
        color: product.color || "",
        gender: product.gender || "",
        clothesType: product.clothesType || "",
        sort: product.sort || "",
      });
      setMessage(`✅ 상품 ID ${productId} 정보를 불러왔습니다.`);
    } catch (err) {
      setMessage("❌ 해당 상품이 존재하지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  // 필터 상태 변경
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 폼 제출(수정 요청)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productId) {
      setMessage("상품 ID가 설정되지 않았습니다.");
      return;
    }
    setLoading(true);
    setMessage("");
    try {
      const res = await axios.put(
        `http://localhost:4000/products/${productId}`,
        {
          ...baseInfo,
          ...filters,
        }
      );
      setMessage("✅ 상품이 성공적으로 수정되었습니다.");
      if (onEdit) onEdit(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setMessage("❌ 해당 상품이 존재하지 않습니다.");
      } else if (err.response?.status === 400) {
        setMessage("❌ 요청 데이터가 올바르지 않습니다.");
      } else {
        setMessage("❌ 상품 수정에 실패했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  // 옵션 목록
  const typeOptions = [
    { value: "", label: "상품 종류" },
    { value: "shoes", label: "신발" },
    { value: "clothes", label: "의류" },
  ];
  const colorOptions = [
    { value: "", label: "색상" },
    { value: "red", label: "빨강" },
    { value: "blue", label: "파랑" },
    { value: "black", label: "검정" },
    { value: "white", label: "하양" },
    { value: "gray", label: "회색" },
  ];
  const genderOptions = [
    { value: "", label: "성별" },
    { value: "male", label: "남성" },
    { value: "female", label: "여성" },
    { value: "unisex", label: "공용" },
  ];
  const clothesTypeOptions =
    filters.type === "clothes"
      ? [
          { value: "", label: "의류 종류" },
          { value: "shirt", label: "셔츠" },
          { value: "jacket", label: "자켓" },
          { value: "pants", label: "팬츠" },
          { value: "dress", label: "드레스" },
        ]
      : [];
  const sortOptions = [
    { value: "", label: "정렬 기준" },
    { value: "latest", label: "최신순" },
    { value: "oldest", label: "오래된순" },
    { value: "high_rating", label: "별점 높은 순" },
  ];

  return (
    <div style={{ maxWidth: 500, margin: "40px auto" }}>
      <div
        style={{
          padding: 32,
          border: "1px solid #ddd",
          borderRadius: 12,
          boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
          background: "#fff",
        }}
      >
        <h2 style={{ marginBottom: 24, textAlign: "center" }}>
          상품 수정 (관리자)
        </h2>

        {/* 상품 ID 입력 및 불러오기 */}
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="product-id" style={labelStyle}>
            상품 ID
          </label>
          <input
            id="product-id"
            type="number"
            min="1"
            value={productId || ""}
            onChange={handleIdChange}
            placeholder="수정할 상품 ID를 입력하세요"
            style={inputStyle}
          />
          <button
            type="button"
            onClick={handleLoad}
            disabled={loading || !productId}
            style={{
              marginTop: 8,
              padding: "8px 16px",
              background: "#eee",
              border: "none",
              borderRadius: 6,
              cursor: loading ? "not-allowed" : "pointer",
              width: "100%",
              fontWeight: 500,
            }}
          >
            불러오기
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* 상품 기본 정보 (조회 전용, 일부는 수정 불가) */}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="product-image" style={labelStyle}>
              이미지 URL
            </label>
            <input
              id="product-image"
              type="text"
              value={baseInfo.image}
              readOnly
              style={{
                ...inputStyle,
                backgroundColor: "#f0f0f0",
                cursor: "not-allowed",
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="product-name" style={labelStyle}>
              상품명
            </label>
            <input
              id="product-name"
              type="text"
              value={baseInfo.name}
              readOnly
              style={{
                ...inputStyle,
                backgroundColor: "#f0f0f0",
                cursor: "not-allowed",
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="product-price" style={labelStyle}>
              가격
            </label>
            <input
              id="product-price"
              type="number"
              value={baseInfo.price}
              readOnly
              style={{
                ...inputStyle,
                backgroundColor: "#f0f0f0",
                cursor: "not-allowed",
              }}
            />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="product-soldout" style={labelStyle}>
              품절 여부
            </label>
            <input
              id="product-soldout"
              type="checkbox"
              checked={baseInfo.soldout}
              readOnly
              style={{ marginLeft: 8 }}
            />{" "}
            {baseInfo.soldout ? "품절" : "판매중"}
          </div>

          {/* 필터 선택 영역 */}
          <FilterSelect
            label="상품 종류"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
            options={typeOptions}
          />
          <FilterSelect
            label="색상"
            name="color"
            value={filters.color}
            onChange={handleFilterChange}
            options={colorOptions}
          />
          <FilterSelect
            label="성별"
            name="gender"
            value={filters.gender}
            onChange={handleFilterChange}
            options={genderOptions}
          />
          {filters.type === "clothes" && (
            <FilterSelect
              label="의류 종류"
              name="clothesType"
              value={filters.clothesType}
              onChange={handleFilterChange}
              options={clothesTypeOptions}
            />
          )}
          <FilterSelect
            label="정렬 기준"
            name="sort"
            value={filters.sort}
            onChange={handleFilterChange}
            options={sortOptions}
          />

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "10px 0",
              background: "#2d6cdf",
              color: "#fff",
              fontWeight: 600,
              border: "none",
              borderRadius: 6,
              fontSize: 16,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "수정 중..." : "필터 정보 수정"}
          </button>
          {message && (
            <div
              style={{
                marginTop: 20,
                color: message.startsWith("✅") ? "#2d6cdf" : "#e74c3c",
                fontWeight: 500,
                textAlign: "center",
              }}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

// 필터 입력 컴포넌트 (select)
function FilterSelect({ label, name, value, onChange, options }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={`filter-${name}`} style={labelStyle}>
        {label}
      </label>
      <select
        id={`filter-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        required
        style={{ ...inputStyle, padding: "8px 10px", borderRadius: 6 }}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// 스타일
const labelStyle = {
  display: "block",
  marginBottom: 6,
  fontWeight: 500,
  fontSize: 15,
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #ccc",
  borderRadius: 6,
};
