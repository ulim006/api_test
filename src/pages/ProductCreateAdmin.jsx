import { useState } from "react";
import axios from "axios";

export default function ProductCreateAdmin({ onCreate }) {
  const [form, setForm] = useState({
    image: "",
    name: "",
    rating: 0,
    reviews: 0,
    price: 0,
    soldout: false,
    color: "",
    size: "",
    gender: "",
    type: "",
    shoesType: "",
    clothesType: "",
    brand: "",
    etc: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // 폼 제출 핸들러
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 백엔드가 기대하는 JSON 구조
    const body = { ...form };
    if (!body.type) {
      setMessage("상품 종류를 선택하세요.");
      setLoading(false);
      return;
    }

    try {
      // Swagger와 동일한 엔드포인트로 수정
      const res = await axios.post("http://localhost:4000/type", body);
      setMessage("✅ 상품이 성공적으로 등록되었습니다.");
      if (onCreate) onCreate(res.data);
      setForm({
        image: "",
        name: "",
        rating: 0,
        reviews: 0,
        price: 0,
        soldout: false,
        color: "",
        size: "",
        gender: "",
        type: "",
        shoesType: "",
        clothesType: "",
        brand: "",
        etc: "",
      });
    } catch (err) {
      setMessage(
        `❌ 상품 등록에 실패했습니다. ${err.response?.data?.message || ""}`
      );
      console.error("상품 등록 실패:", err.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const typeOptions = [
    { value: "", label: "상품 종류(선택)" },
    { value: "shoes", label: "신발" },
    { value: "clothes", label: "의류" },
    { value: "bag", label: " 가방" },
  ];
  const colorOptions = [
    { value: "", label: "색상(선택)" },
    { value: "red", label: "빨강" },
    { value: "blue", label: "파랑" },
    { value: "black", label: "검정" },
    { value: "white", label: "하양" },
    { value: "gray", label: "회색" },
  ];
  const genderOptions = [
    { value: "", label: "성별(선택)" },
    { value: "male", label: "남성" },
    { value: "female", label: "여성" },
    { value: "unisex", label: "공용" },
  ];
  const sizeOptions = [
    { value: "", label: "사이즈(선택)" },
    { value: "S", label: "S" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "XL", label: "XL" },
    { value: "6", label: "6" },
    { value: "7", label: "7" },
    { value: "8", label: "8" },
    { value: "9", label: "9" },
    { value: "10", label: "10" },
  ];
  const shoesTypeOptions = [
    { value: "", label: "신발 종류(선택)" },
    { value: "sneakers", label: "스니커즈" },
    { value: "running", label: "러닝화" },
    { value: "boots", label: " 부츠" },
  ];
  const clothesTypeOptions = [
    { value: "", label: "의류 종류(선택)" },
    { value: "shirt", label: " 셔츠" },
    { value: "jacket", label: "자켓" },
    { value: "pants", label: "팬츠" },
    { value: "dress", label: "드레스" },
  ];
  const bagTypeOptions = [
    { value: "", label: "가방 종류(선택)" },
    { value: "backpack", label: " 백팩" },
    { value: "shoulderbag", label: "숄더백" },
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
          상품 등록 (관리자)
        </h2>
        <form onSubmit={handleSubmit}>
          <InputField
            label="상품 이미지 URL"
            name="image"
            value={form.image}
            onChange={handleChange}
            type="url"
          />
          <InputField
            label="상품명"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <InputField
            label="평점"
            name="rating"
            value={form.rating}
            onChange={handleChange}
            type="number"
            min="0"
            step="0.1"
            max="5"
          />
          <InputField
            label="리뷰 수"
            name="reviews"
            value={form.reviews}
            onChange={handleChange}
            type="number"
            min="0"
          />
          <InputField
            label="가격"
            name="price"
            value={form.price}
            onChange={handleChange}
            type="number"
            min="0"
            required
          />
          <FilterSelect
            label="상품 종류"
            name="type"
            value={form.type}
            onChange={handleChange}
            options={typeOptions}
            required
          />
          <FilterSelect
            label="색상"
            name="color"
            value={form.color}
            onChange={handleChange}
            options={colorOptions}
          />
          <FilterSelect
            label="사이즈"
            name="size"
            value={form.size}
            onChange={handleChange}
            options={sizeOptions}
          />
          <FilterSelect
            label="성별"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={genderOptions}
          />
          <InputField
            label="브랜드"
            name="brand"
            value={form.brand}
            onChange={handleChange}
          />
          <InputField
            label="기타"
            name="etc"
            value={form.etc}
            onChange={handleChange}
          />
          {form.type === "shoes" && (
            <FilterSelect
              label="신발 종류"
              name="shoesType"
              value={form.shoesType}
              onChange={handleChange}
              options={shoesTypeOptions}
            />
          )}
          {form.type === "clothes" && (
            <FilterSelect
              label="의류 종류"
              name="clothesType"
              value={form.clothesType}
              onChange={handleChange}
              options={clothesTypeOptions}
            />
          )}
          {form.type === "bag" && (
            <FilterSelect
              label="가방 종류"
              name="bagType"
              value={form.bagType}
              onChange={handleChange}
              options={bagTypeOptions}
            />
          )}
          <div style={{ marginBottom: 16 }}>
            <label htmlFor="product-soldout" style={labelStyle}>
              품절 여부
            </label>
            <input
              id="product-soldout"
              name="soldout"
              type="checkbox"
              checked={form.soldout}
              onChange={handleChange}
              style={{ marginLeft: 8 }}
            />{" "}
            {form.soldout ? "품절" : "판매중"}
          </div>
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
            {loading ? "등록 중..." : "상품 등록"}
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

function FilterSelect({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
}) {
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
        required={required}
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

function InputField({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder = "",
  min,
  required = false,
}) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label htmlFor={`product-${name}`} style={labelStyle}>
        {label}
      </label>
      <input
        id={`product-${name}`}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        min={min}
        required={required}
        style={inputStyle}
      />
    </div>
  );
}

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
