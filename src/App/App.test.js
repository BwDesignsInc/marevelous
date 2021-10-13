import React from "react";
import { render, screen, fireEvent } from "../test/test.utils";
import userEvent from '@testing-library/user-event';
import { App } from "./App";

describe("<APP/>", () => {

  it('should correctly set default option', () => {
    render(<App />)
    expect(screen.getByRole('option', {name: '-- Select a Column --'}).selected).toBe(true)
  })

  it('should search based of the First search Term', () => {
    const { getAllByText} = render(<App />)
    userEvent.type(screen.getByTestId('search'), 'first');
    expect(getAllByText('first task')).toHaveLength(2);

  })

  it('should remove item when x it selected', () => {
    const initialState = {
        items: {
          1: [
            { id: 1, value: "first Item", columnId: 0 },
          ],
          2:[]
        },
        searchTerm: "",
        columns: [
          { id: 0, label: "Select Columns", selected: false },
          { id: 1, label: "Column 1", selected: true },
          { id: 2, label: "Column 2", selected: false },
        ],
      };
    const {container, debug, getByTitle} = render(<App />, { preloadedState:{ lists:initialState } });
    const buttonx = getByTitle('first Item 1');
    userEvent.click(buttonx);
    debug(container);
  })

});
