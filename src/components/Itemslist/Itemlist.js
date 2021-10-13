import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { makeSelectItemsByColumn } from "../../features/AddItems/additems.slice";
import { removeItem } from "../../features/AddItems/additems.slice";
const ItemListContainer = styled.ul`
  list-style-type: none;
  width: 100%;
  margin: 0px;
  padding-inline-start: 0px;
  overflow: hidden;
  min-width: 100px;
`;

const ItemListRow = styled.li`
  display: flex;
  align-items: center;
  background-color: rgb(188, 192, 199);
  color: white;
  padding: 0.5rem;
  svg {
    margin-left: auto;
    cursor: pointer;
    order: 2;
    min-height: 1rem;
    min-width: 1rem;
  }
  span {
    min-height: 18px;
  }

  &:nth-child(odd) {
    background-color: rgb(242, 243, 244);
    color: rgb(133, 139, 152);
  }
`;
const RemoveIcon = ({ removeItem, title }) => (
  <span onClick={removeItem}>
  <svg
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 512 512"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{title}</title>
    <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z"></path>
  </svg>
  </span>
);

const ColumnHeading = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  background-color: #515d71;
  height: 45px;
`;

export const Itemlist = ({ column }) => {
  const dispatch = useDispatch();
  const selectItemsByColumn = useMemo(makeSelectItemsByColumn, [])

  const itemsByColumn = useSelector(state =>
    selectItemsByColumn(state, column)
  )
  const handleRemoveItem = ({item, column}) => {
    dispatch(removeItem({ item, column }));
  }
  return (
    <>
      <ColumnHeading>{`Column ${column}`}</ColumnHeading>
      <ItemListContainer>
        {itemsByColumn.map((item) => (
          <ItemListRow key={item.id}>
            <span>{item.value}</span>
            <RemoveIcon title={`${item.value} ${column}`} removeItem={() => handleRemoveItem({item, column}) } />
          </ItemListRow>
        ))}
      </ItemListContainer>
    </>
  );
};
