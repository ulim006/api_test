import { useNavigate } from "react-router-dom";
const navigate = useNavigate();
<button
  type="button"
  onClick={() => navigate("/add")}
  style={{
    width: "100%",
    padding: "10px 0",
    background: "#28a745",
    color: "#fff",
    fontWeight: 600,
    border: "none",
    borderRadius: 6,
    fontSize: 16,
    marginTop: 12,
    cursor: "pointer",
  }}
>
  ➕ 새 상품 추가 페이지로 이동
</button>;
