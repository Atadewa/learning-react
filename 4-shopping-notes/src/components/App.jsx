import { useState } from "react";
import Header from "./Header";
import Form from "./Form";
import GroceryList from "./GroceryList";
import Footer from "./Footer";

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