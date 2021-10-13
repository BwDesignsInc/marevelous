import React from "react";
import AddItems from "../features/AddItems";
import { render, screen } from "../test/test.utils";
import userEvent from '@testing-library/user-event';
import { App } from "./App";
import { removeItem } from "../features/AddItems/additems.slice";
import { Itemlist } from "../components/Itemslist";

describe("<APP/>", () => {
  const initialState = {
    items: {
      1: [
        { id: 1, value: "first task", columnId: 0 },
        { id: 2, value: "Seconds task", columnId: 0 },
      ],
      2: [
        { id: 1, value: "first task", columnId: 1 },
        { id: 2, value: "Seconds task", columnId: 1 },
      ],
    },
    searchTerm: "",
    columns: [
      { id: 0, label: "Select Columns", selected: true },
      { id: 1, label: "Column 1", selected: false },
      { id: 2, label: "Column 2", selected: false },
    ],
  };

  it('should correctly set default option', () => {
    render(<App />)
    expect(screen.getByRole('option', {name: '-- Select a Column --'}).selected).toBe(true)
  })

  it('should search based of the First search Term', () => {
    const initialState = {
        items: {
          1: [
            { id: 1, value: "first item", columnId: 0 },
            { id: 2, value: "Seconds item", columnId: 0 },
          ],
          2: [
            { id: 1, value: "first task", columnId: 1 },
            { id: 2, value: "Seconds task", columnId: 1 },
          ],
        },
        searchTerm: "",
        columns: [
          { id: 0, label: "Select Columns", selected: false },
          { id: 1, label: "Column 1", selected: true },
          { id: 2, label: "Column 2", selected: false },
        ],
      };
    const {container, getAllByText} = render(<App />, initialState)
    userEvent.type(screen.getByTestId('search'), 'first');
    expect(getAllByText('first task')).toHaveLength(2);

  })

  it('should remove item when x it selected', () => {
    const initialState = {
        items: {
          1: [
            { id: 1, value: "first Item", columnId: 0 },
          ],
        },
        searchTerm: "",
        columns: [
          { id: 0, label: "Select Columns", selected: false },
          { id: 1, label: "Column 1", selected: true },
          { id: 2, label: "Column 2", selected: false },
        ],
      };
    const {container, debug, getByTitle} = render(<App removeItem={removeItem} />, initialState);
    userEvent.click(getByTitle('first task 1'));
    debug(screen.container);
  })

});
