import { useState } from "react";
import Item from "./Item";

export default function GroceryList({ items, onDeleteItem, onToggleItem, onClearItems }){
    const[sortBy, setSortBy] = useState('input')
    
    let sortedItems;
  
    switch (sortBy) {
      case 'name':
        sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
        break;
  
      case 'checked':
        sortedItems = items.slice().sort((a, b) => a.checked-b.checked);
        break;
    
      default:
        sortedItems = items;
        break;
    }
  
    return(
      <>
        <div className="list">
          <ul>
            {
              sortedItems.map((item) => 
                <Item item={ item } key={item.id} onDeleteItem={ onDeleteItem } onToggleItem={ onToggleItem }/>
              )
            }
          </ul>
        </div>
  
        <div className="actions">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="input">Sort by input order</option>
            <option value="name">Sort by item name</option>
            <option value="checked">Sort by checked</option>
          </select>
          <button type="button" onClick={onClearItems}>Clear List</button>
        </div>
      </>
    );
  }