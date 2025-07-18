import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 100px;
  position: relative;
`;

export const Logo = styled.h1`
  color: #1c1c1c;
  font-size: 30px;
  font-style: normal;
  font-weight: 700;
  flex: 0 0 auto;
  cursor: pointer;
`;

export const CenterNav = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

export const NavItem = styled.div`
  color: ${({ $red }) => ($red ? "#e23c3c" : "gray")};
  font-weight: 500;
  cursor: pointer;
  white-space: nowrap; // 줄바꿈 방지

  &.active {
    color: black;
    font-weight: bold;
    border-bottom: 2px solid black;
  }
`;

export const RightNav = styled.div`
  flex: 0 0 auto;
`;
