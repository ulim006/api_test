import React from "react";
import { useNavigate } from "react-router-dom";

export default function ManagerPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        margin: "40px auto",
        maxWidth: "800px",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "32px",
        padding: "0 16px",
      }}
    >
      {/* 상품 등록 카드 */}
      <div
        onClick={() => navigate("/admin/product/create")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          backgroundColor: "#f7f7f7",
          borderRadius: "16px",
          cursor: "pointer",
          boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
          transition: "all 0.25s ease",
          padding: "16px",
          color: "#2d6cdf",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#e8f1ff";
          e.target.style.boxShadow = "0 5px 15px rgba(29, 123, 252, 0.2)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#f7f7f7";
          e.target.style.boxShadow = "0 3px 12px rgba(0,0,0,0.08)";
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          상품 등록
        </div>
        <div style={{ color: "#666" }}>
          상품 정보를 입력하여 새로운 상품을 등록하세요.
        </div>
      </div>

      {/* 상품 수정 카드 */}
      <div
        onClick={() => navigate("/admin/product/edit")}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "200px",
          backgroundColor: "#f7f7f7",
          borderRadius: "16px",
          cursor: "pointer",
          boxShadow: "0 3px 12px rgba(0,0,0,0.08)",
          transition: "all 0.25s ease",
          padding: "16px",
          color: "#2d6cdf",
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#e8f1ff";
          e.target.style.boxShadow = "0 5px 15px rgba(29, 123, 252, 0.2)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#f7f7f7";
          e.target.style.boxShadow = "0 3px 12px rgba(0,0,0,0.08)";
        }}
      >
        <div
          style={{
            fontSize: "24px",
            fontWeight: 600,
            marginBottom: "8px",
          }}
        >
          상품 수정
        </div>
        <div style={{ color: "#666" }}>
          상품 ID로 조회하여 상품 정보를 수정하세요.
        </div>
      </div>
    </div>
  );
}
