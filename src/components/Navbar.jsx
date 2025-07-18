import { useNavigate } from "react-router-dom";
import {
  HeaderWrapper,
  Logo,
  CenterNav,
  Nav,
  NavItem,
  RightNav,
} from "./Navbar.styles";
import { useState } from "react";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <HeaderWrapper>
      <Logo onClick={() => navigate("/")}>EQL</Logo>
      <CenterNav>
        <Nav>
          <NavItem $red onClick={() => navigate("/")}>
            HOME
          </NavItem>
          <NavItem onClick={() => navigate("/admin")}>관리자페이지</NavItem>
        </Nav>
      </CenterNav>
      <RightNav>
        <NavItem onClick={() => navigate("/login")}>로그인</NavItem>
      </RightNav>
    </HeaderWrapper>
  );
}
