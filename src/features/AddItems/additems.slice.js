import { createSlice, createSelector } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: 'items', 
  initialState: {
    items: {
      1:[{id: 1, value: 'first task', columnId:0 },{id: 2, value: 'Seconds task', columnId:0 }],
      2:[{id: 1, value: 'first task', columnId:1 },{id: 2, value: 'Seconds task', columnId:1 }],
    },
    searchTerm:"",
    columns:[
      { id:0, label : "Select Columns", selected: true },
      { id:1, label : "Column 1", selected: false }, 
      { id:2, label:"Column 2", selected:false }
    ]
  },
  reducers: {
    setSearchTerm(state, action){
      const value = action.payload;
      state.searchTerm = value;
    },
    setColumn(state, action){
      state.columns = state.columns.map((col) => ({ 
        ...col, 
        selected: parseInt(action.payload) === col.id 
      }));
    },
    addItem(state, action) { 
      const selectedColumn = state.columns.filter((col) => col.selected === true);
      const columnId = selectedColumn.length > 0 ? selectedColumn[0]['id']: 0;
      if(columnId){
        const lastItemId = state.items[columnId][state.items[columnId].length - 1]?.id || 0
        state.items[columnId].push({
          id: lastItemId + 1, value: action.payload, columnId
        })
      }
    },
    removeItem(state, action) {
      state.items[action.payload.column] = state.items[action.payload.column].filter(item => item.id !== action.payload.item.id)
    }
  }
})

const selectColumnId = (state, columnId) => columnId;
const selectListItems = (state) => state.lists.items;
const selectSearchTerm = (state) => state.lists.searchTerm;

export const makeSelectItemsByColumn = () => {
  const selectFilteredItems = createSelector(
    // First input selector: all todos
    [selectColumnId, selectListItems, selectSearchTerm],
    // Output selector: receives both values
    (columnId, items, term) => {
      if (!term) {
        return items[columnId]
      }
      // Return either active or completed todos based on filter
      return items[columnId].filter(item => {
        if(item.value.toLowerCase().includes(term)){
          return item;
        }
    })
    }
  )
  return selectFilteredItems
}

export const selectFilteredItems = createSelector(
  // First input selector: all todos
  [selectColumnId, selectListItems, selectSearchTerm],
  // Output selector: receives both values
  (columnId, items, term) => {
    if (!term) {
      return items
    }
    // Return either active or completed todos based on filter
    return columns.map(col => {
      items[columnId] = items[columnId].filter(item => {
      if(item.value.toLowerCase().includes(term)){
        return item;
      }
  })})
  }
)

export const { addItem, removeItem, setColumn, setSearchTerm  } = itemSlice.actions

export default itemSlice.reducer