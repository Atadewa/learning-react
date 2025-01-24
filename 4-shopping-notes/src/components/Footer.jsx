export default function Footer({ items }){
    if (items.length === 0) {
      return <footer className="stats"> Your shopping list is empty. </footer>
    }
    const totalItems = items.length;
    const checkedItems = items.filter((item) => item.checked === true).length;
    const percentage = Math.round(checkedItems / totalItems * 100);
  
    return <footer className="stats"> There are { totalItems } items on the shopping list, { checkedItems } items have been purchased ({ percentage }%) </footer>;
  }