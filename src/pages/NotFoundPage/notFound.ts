import styled from "styled-components";

export const StyledNotFound = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0 10px;
  width: 100vw;
  height: 70vh;

  .nav__container {
    display: flex;
    align-items: center;
    height: 50px;
  }

  h1,
  h2 {
    font-size: 26px;
    color: #ffffff;
  }

  img {
    width: 90%;
    max-width: 900px;
    height: auto;
  }

  h3 {
    margin-top: 10px;
    color: var(--primary);
    text-align: center;
  }
`;
