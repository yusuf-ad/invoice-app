### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, read, update, and delete invoices
- Receive form validations when trying to create/edit an invoice
- Save draft invoices, and mark pending invoices as paid
- Filter invoices by status (draft/pending/paid)
- Toggle light and dark mode
- **Bonus**: Keep track of any changes, even after refreshing the browser (`localStorage` could be used for this if you're not building out a full-stack app)

# React Best Practices

## Components

### Helper Functions

👎 **Avoid:** Reading from the component's state.
👍 **Best Practice:** Extract and pass only necessary values.

👍 **Best Practice:** Avoid hardcoding markup for navigation, filters, or lists. Use a configuration object and loop through items.

### Error Boundaries

### Props Handling

👎 **Avoid:** Passing related values individually.
👍 **Best Practice:** Use an object to hold related values.

👎 **Avoid:** Using short-circuit operators.
👍 **Best Practice:** Use a ternary operator instead.

👎 **Avoid:** Nested ternaries in JSX.
👍 **Best Practice:** Place complex ternaries inside their own component.

👎 **Avoid:** Writing loops within markup.
👍 **Best Practice:** Extract loops into their own component.

### Default Props

👍 **Best Practice:** Assign default props when destructuring.

### Nested Render Functions

👎 **Avoid:** Using nested render functions.

## State Management

### Reducer with Context

👎 **Avoid:** Too many separate pieces of state.
👍 **Best Practice:** Unify state using a reducer.

### Hooks vs. HOCs and Render Props

👎 **Avoid:** Using render props.
👍 **Best Practice:** Prefer hooks for simplicity and readability.

### Data Fetching

👍 **Best Practice:** Utilize data fetching libraries.

### State Management Libraries

## Component Mental Models

### Stateless & Stateful

## Application Structure

### Grouping

👎 **Avoid:** Grouping by technical details.
👍 **Best Practice:** Group by module/domain.

### Common Module

👍 **Best Practice:** Create a common module for reusable components like buttons, inputs, and cards.

### Path Handling

👎 **Avoid:** Relative paths.
👍 **Best Practice:** Use absolute paths for stability.

### External Components

👎 **Avoid:** Importing external components directly.
👍 **Best Practice:** Export the component and reference it internally.

### Folder Structure

👍 **Best Practice:** Organize components into folders.

## Performance

### Optimization

👍 **Best Practice:** Prioritize readable and maintainable components before optimizing for performance.

### Bundle Size

👍 **Best Practice:** Monitor and manage bundle size.

### Rerenders

👍 **Best Practice:** Avoid unnecessary rerenders caused by callbacks, arrays, and objects.

### Testing

👍 **Best Practice:** Ensure correct rendering through testing.

React components should not have any business logic.

Their main focus should be:

1. displaying/updating UI.
2. responding to users' interactions.

Another difference is that mutations don't share state like useQuery does. You can invoke the same useQuery call multiple times in different components and will get the same, cached result returned to you - but this won't work for mutations.

In this context, you should use user.save().

The User.save() method is not correct because User is likely the model class, and the save() method is an instance method, not a static method.

You want to save the specific user instance that you've updated, not the entire User model.

Remove the default styles for checkbox

```html
<input type="checkbox" className="appearance-none" />
```

```js
function ItemsList() {
  // ...

  function handleUpdateItem(id, updatedItem) {
    const newItems = items.map((item) => item.id === id ? updatedItem : item);

    setItems(newItems);
  }

  // ...

  return (
    <>
      {/* ... */}
      {items?.map((item) => (
        <ItemRow
          key={item.id}
          currentItem={item}
          id={item.id}
          removeItem={handleRemoveItem}
          updateItem={handleUpdateItem} // pass the new function as a prop
        />
      ))}
      {/* ... */}
    </>
  );
}

function ItemRow({ currentItem, id, removeItem, updateItem }) { // add the new prop here
  const [item, setItem] = useState(currentItem);

  // ...

  function handleItemChange(e, field) {
    const updatedItem = { ...item, [field]: e.target.value };
    setItem(updatedItem);
    updateItem(id, updatedItem); // update the item in the parent component
  }

  // ...

  return (
    <div ref={formRow}>
      {/* ... */}
      <input
        {/* ... */}
        onChange={(e) => handleItemChange(e, 'itemName')}
      />
      {/* ... */}
      <input
        {/* ... */}
        onChange={(e) => {
          if (e.target.value >= 0) {
            handleItemChange(e, 'itemQty');
          }
        }}
      />
      {/* ... */}
      <input
        {/* ... */}
        onChange={(e) => {
          if (e.target.value >= 0) {
            handleItemChange(e, 'itemPrice');
          }
        }}
      />
      {/* ... */}
    </div>
  );
}
```
