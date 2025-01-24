import { useState } from "react";

const groceryItems = [
  {
    id: 1,
    name: 'Coffee',
    quantity: 5,
    checked: true,
  },
  {
    id: 2,
    name: 'Sugar',
    quantity: 4,
    checked: false,
  },
  {
    id: 3,
    name: 'Mineral Water',
    quantity: 3,
    checked: false,
  }
];

export default function App() {
  const [items, setItems] = useState(groceryItems);

  function handleAddItem(newItem){
    setItems([...items, newItem]);
  }

  function handleDeleteItem(id){
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id){
    setItems((items) => items.map((item) => item.id === id ? {...item, checked: !item.checked} : item));
  }

  function handleClearItems(){
    setItems([]);
  }

  return (
    <div className="app">
      <Header />
      <Form onAddItem={ handleAddItem }/>
      <GroceryList items={ items } onDeleteItem={ handleDeleteItem } onToggleItem={ handleToggleItem } onClearItems={ handleClearItems }/>
      <Footer items={ items }/>
    </div>
  );
}

function Header(){
  return <h1>My Shopping Notes 📝</h1>;
}

function Form({ onAddItem }){
  const[name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e){
    e.preventDefault();

    if (!name) {
      setQuantity(1);
      return;
    }
    
    const newItem = {
      id: Date.now(),
      name,
      quantity,
      checked: false,
    }
    onAddItem(newItem);
    
    setQuantity(1);
    setName('');
  }

  const quantityNum = [...Array(20)].map((data, index) => (
    <option value={index + 1} key={index + 1}>{index + 1}</option>
  ));
  return (
    <form className="add-form" onSubmit={ handleSubmit }>
      <h3>What are we shopping for today?</h3>
      <div>
        <select value={ quantity } onChange={(e) => setQuantity(Number(e.target.value)) }>
          {quantityNum}
        </select>
        <input type="text" placeholder="item name..." value={ name } onChange={(e) => setName(e.target.value)} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
}

function GroceryList({ items, onDeleteItem, onToggleItem, onClearItems }){
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

function Item({ item, onDeleteItem, onToggleItem }){
  return(
    <li key={item.id}>
    <input type="checkbox" checked={item.checked} onChange={() => onToggleItem(item.id)}/>
    <span style={ item.checked? { textDecoration: "line-through" } : {}}>{item.quantity} {item.name}</span>
    <button onClick={() => onDeleteItem(item.id)}>&times;</button>
  </li>
  );
}

function Footer({ items }){
  if (items.length === 0) {
    return <footer className="stats"> Your shopping list is empty. </footer>
  }
  const totalItems = items.length;
  const checkedItems = items.filter((item) => item.checked === true).length;
  const percentage = Math.round(checkedItems / totalItems * 100);

  return <footer className="stats"> There are { totalItems } items on the shopping list, { checkedItems } items have been purchased ({ percentage }%) </footer>;
}
