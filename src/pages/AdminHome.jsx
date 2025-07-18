import { useNavigate } from "react-router-dom";

export default function AdminHome() {
  const navigate = useNavigate();

  const cards = [
    {
      title: "상품 수정",
      description: "등록된 상품 정보를 수정합니다.",
      path: "/admin/edit",
    },
    {
      title: "상품 등록",
      description: "새로운 상품을 등록합니다.",
      path: "/admin/create",
    },
  ];

  return (
    <div style={{ maxWidth: 800, margin: "50px auto", padding: "0 16px" }}>
      <h1 style={{ textAlign: "center", marginBottom: 40 }}>관리자 페이지</h1>
      <div
        style={{
          display: "flex",
          gap: 20,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {cards.map((card) => (
          <div
            key={card.path}
            onClick={() => navigate(card.path)}
            style={{
              width: 300,
              padding: 24,
              border: "1px solid #ddd",
              borderRadius: 12,
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
              cursor: "pointer",
              transition: "transform 0.2s ease",
            }}
            onMouseOver={(e) =>
              (e.currentTarget.style.transform = "scale(1.03)")
            }
            onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <h3 style={{ marginBottom: 10 }}>{card.title}</h3>
            <p style={{ color: "#555" }}>{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
