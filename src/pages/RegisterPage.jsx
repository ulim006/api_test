import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const RegisterPage = () => {
  const [email, setEmail] = useState(""); // 이메일
  const [username, setUsername] = useState(""); // 닉네임
  const [password, setPassword] = useState(""); // 비밀번호
  const [usernameAvailable, setUsernameAvailable] = useState(null); // 닉네임 중복 여부

  const navigate = useNavigate();

  const checkUsername = () => {
    if (username.trim().length === 0) return alert("닉네임을 입력해주세요.");

    // GET 요청 = 닉네임 중복 확인
    axios
      .get("http://localhost:4173/check-username", { params: { username } })
      .then((res) => {
        setUsernameAvailable(!res.data.exists);
      })
      .catch((err) => {
        setUsernameAvailable(false);
      })
      .finally(() => {
        console.log("Username check finished");
      });
  };

  const register = () => {
    if (!email || !username || !password || !usernameAvailable) {
      alert("모든 항목을 확인해주세요");
      return;
    }

    // POST 요청 = 회원가입
    axios
      .post("http://localhost:4173/register", { email, username, password }) //포스트요청을 보내는 구조임! 외우기...
      .then((res) => {
        if (res.data.success) alert("회원가입 성공!");
        navigate("/login");
      })
      .catch((err) => {
        alert("회원가입 실패");
      })
      .finally(() => {
        console.log("회원가입 요청 완료.");
      });
  };

  return (
    <Container>
      <h2>회원가입</h2>
      <Input
        placeholder="이메일"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="아이디"
        value={username}
        required
        onChange={(e) => setUsername(e.target.value)}
      />
      <Button onClick={checkUsername}>아이디 중복 확인</Button>
      {usernameAvailable != null && (
        <Message available={usernameAvailable}>
          {usernameAvailable
            ? "사용 가능한 아이디입니다"
            : "이미 사용 중인 아이디입니다"}
        </Message>
      )}
      <Input
        placeholder="비밀번호"
        type="password"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={register}>회원가입</Button>
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
  margin: 5rem auto;
  padding: 2rem;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    background-color: #218838;
  }
`;

const Message = styled.p`
  color: ${(props) => (props.available ? "green" : "red")};
`;

export default RegisterPage;
