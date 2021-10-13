import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addItem,
  setColumn,
  setSearchTerm,
  selectColumns,
} from "./additems.slice";
import Select from "../../components/Select";

const Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  font-size: 18px;
  padding: 10px;
  margin: 0px 0px 10px 0px;
  background: rgb(155, 161, 171);
  border: 2px solid white;
  ::placeholder {
    color: BFC3C9;
  }
  display: block;
  min-width: 200px;
`;

const ButtonWrapper = styled.div`
  position: absolute;
  top: 150px;
  bottom: calc(0px +150px);
  width: 100%;
  padding-bottom: 100px;
`;

const Button = styled.button`
  font-size: 18px;
  background: rgb(155, 161, 171);
  border: 2px solid white;
  padding: 10px;
  margin: 10px 0px 10px 0px;
  flex: auto;
  align-items: center;
  width: 100%;
  cursor: pointer;
`;

const SearchLabel = styled.div`
  font-size: 14px;
  color: white;
  display: inline-block;
  text-transform: uppercase;
  padding-bottom: 5px;
`;

export const AddItems = () => {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState("");
  const columns = useSelector(selectColumns);
  const addItemHandler = () => {
    dispatch(addItem(inputValue));
    setInputValue("");
  };

  useEffect(() => {
    dispatch(setSearchTerm(""));
  }, []);

  return (
    <>
      <Input
        type="text"
        placeholder="Name"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></Input>
      <Select
        defaultValue={"DEFAULT"}
        onChange={(e) => dispatch(setColumn(e))}
        options={columns}
      />
      <ButtonWrapper>
        <Button onClick={addItemHandler}>Add Items</Button>
        <SearchLabel>Search and Item</SearchLabel>
        <Input
          type="text"
          data-testid="search"
          placeholder="Search Items"
          onChange={(e) => dispatch(setSearchTerm(e.target.value))}
        />
      </ButtonWrapper>
    </>
  );
};

export default AddItems;
