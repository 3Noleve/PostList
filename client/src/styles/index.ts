import styled from 'styled-components';

export const AppContainer = styled.body`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
`;

export const Title = styled.h1`
  font-size: 36px;
  margin: 0;
  margin-bottom: 20px;
`;

export const InputContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  flex: 1;
`;

export const TextArea = styled.textarea`
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
  flex: 1;
`;

export const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #0062cc;
  }
`;

export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PostCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  padding: 20px;
  background-color: #fff;
  margin-bottom: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
`;

export const PostTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 10px;
`;

export const PostDescription = styled.p`
  font-size: 16px;
  margin-bottom: 10px;
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

export const PostButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  margin-left: 10px;
  cursor: pointer;

  &:first-child {
    margin-left: 0;
  }
`;
