import { stubFalse } from "lodash";
import reducer, { addItem, setColumn, setSearchTerm, removeItem } from "./additems.slice";

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual({
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
  });
});

test("should handle a Column being selected", () => {
  const previousState = {
    columns: [
      { id: 0, label: "Select Columns", selected: true },
      { id: 1, label: "Column 1", selected: false },
      { id: 2, label: "Column 2", selected: false },
    ],
  };

  expect(reducer(previousState, setColumn("1"))).toEqual({
    columns: [
      { id: 0, label: "Select Columns", selected: false },
      { id: 1, label: "Column 1", selected: true },
      { id: 2, label: "Column 2", selected: false },
    ],
  });
});

test("should handle a Item being added being selected", () => {
  const previousState = {
    items: {
      1: [],
      2: [],
    },
    columns: [
      { id: 0, label: "Select Columns", selected: false },
      { id: 1, label: "Column 1", selected: true },
      { id: 2, label: "Column 2", selected: false },
    ],
  };

  expect(reducer(previousState, addItem("This is a Test"))).toEqual({
    items: {
      1: [
        {
          columnId: 1,
          id: 1,
          value: "This is a Test",
        },
      ],
      2: [],
    },
    columns: [
      { id: 0, label: "Select Columns", selected: false },
      { id: 1, label: "Column 1", selected: true },
      { id: 2, label: "Column 2", selected: false },
    ],
  });
});

test("should handle a Item being removed being from column", () => {
    const previousState = {
      items: {
        1: [{
            columnId: 1,
            id: 1,
            value: "This is a Test",
          }],
        2: [],
      },
    };
  
    expect(reducer(previousState, removeItem({ item: {
        columnId: 1,
        id: 1,
        value: "This is a Test",
      } , column:1 }))).toEqual({
      items: {
        1: [],
        2: [],
      },
    });
  });
  
  test("should handle search Term being set", () => {
    const previousState = {
        searchTerm: "",
    };
  
    expect(reducer(previousState, setSearchTerm("dog"))).toEqual({
      searchTerm: "dog"
    });
  });