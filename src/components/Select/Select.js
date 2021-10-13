import React, { useState } from "react";
import styled from "styled-components";

const SelectStyle = styled.select`
  font-size: 18px;
  padding: 10px;
  margin: 0px;
  border: 2px solid white;
  background: rgb(155, 161, 171);
  ::placeholder {
    color: palevioletred;
  }
  display: block;
  width: 100%;
  option {
    font-weight: normal;
    display: block;
    white-space: nowrap;
    min-height: 2em;
    padding: 0px 2px 1px;
  }
`;

export const Select = ({ value, onChange, options }) => {
  let columnList =
    options.length > 0 &&
    options.map((item, i) => {
      return (
        <option key={i} value={item.id}>
          {item.label}
        </option>
      );
    });

  return (
    <>
      <label htmlFor="selectId">Select Column</label>
      <SelectStyle
        type="select"
        onChange={(e) => onChange(e.target.value)}
        placeholder="Name"
        value={value}
        data-testid="select"
        id="selectId"
      >
        <option value="0">-- Select a Column --</option>
        {columnList}
      </SelectStyle>
    </>
  );
};

export default React.memo(Select);
