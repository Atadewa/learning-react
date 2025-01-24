import { useState } from "react";

export default function Form({ onAddItem }){
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