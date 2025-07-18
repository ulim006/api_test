import { useState } from "react";
import axios from "axios";

export default function AddProduct({ onAdd }) {
  const [form, setForm] = useState({
    name: "",
    brand: "",
    price: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/products", form);
      alert("상품 등록 성공!");
      if (onAdd) onAdd(res.data);
    } catch (err) {
      alert("등록 실패");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="상품명"
      />
      <input
        name="brand"
        value={form.brand}
        onChange={handleChange}
        placeholder="브랜드"
      />
      <input
        name="price"
        value={form.price}
        onChange={handleChange}
        placeholder="가격"
        type="number"
      />
      <button type="submit">등록</button>
    </form>
  );
}
