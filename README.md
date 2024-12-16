# Product Management System

A dynamic web-based CRUD application for managing product inventory with real-time calculations and local storage capabilities.

## Features

- **Product Management**
  - Create new products with multiple attributes
  - Update existing product information
  - Delete individual products
  - Bulk create products with count feature
  - Delete all products with one click

- **Financial Calculations**
  - Real-time total price calculation
  - Support for taxes and advertising costs
  - Automatic discount calculations
  - Running total display

- **Search Capabilities**
  - Search by product title
  - Search by category
  - Real-time search results

- **Data Persistence**
  - Local storage integration
  - Automatic data saving
  - Data recovery after page reload

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/product-management-system.git
```

2. Open `index.html` in your web browser

## Usage

### Creating a Product

1. Fill in the product details:
   - Title
   - Price
   - Taxes
   - Advertising costs
   - Discount (optional)
   - Category

2. The total will be calculated automatically

3. Click "Create Product" to add the product to the system

### Bulk Creation

1. Enter the number of identical products in the "Count" field
2. Fill in the product details
3. Click "Create Product" to create multiple identical products

### Updating Products

1. Click the "Update" button on any product row
2. Modify the details in the form
3. Click "Update Product" to save changes

### Searching Products

1. Use the search bar to find products by title
2. Use the category search to filter by category
3. Results update in real-time as you type

### Deleting Products

- Click "Delete" on any product row to remove individual products
- Use "Delete All" to remove all products from the system

## Technical Details

### HTML Structure Required

```html
<!-- Form Elements -->
<input type="text" id="title">
<input type="number" id="price">
<input type="number" id="taxes">
<input type="number" id="ads">
<input type="number" id="discount">
<input type="number" id="count">
<input type="text" id="category">
<div class="total"></div>
<button class="btn-create">Create Product</button>

<!-- Search Elements -->
<input type="text" id="search">
<input type="text" id="searchCategory">

<!-- Table Structure -->
<table class="crud-table">
  <tbody>
    <!-- Products will be rendered here -->
  </tbody>
</table>

<button class="btn-delete-all">Delete All</button>
```

### CSS Classes

- `.success`: Applied to total when valid
- `.fail`: Applied to total when invalid
- `.btn-update`: Styling for update buttons
- `.btn-delete`: Styling for delete buttons
- `.btn-create`: Styling for create button
- `.btn-delete-all`: Styling for delete all button

## Dependencies

- No external libraries required
- Works with modern browsers supporting ES6+
- Requires local storage capability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Acknowledgments

- Built with vanilla JavaScript
- Uses modern ES6+ features
- Implements CRUD operations
- Local storage integration for data persistence

## Troubleshooting

### Common Issues

1. **Products not saving**
   - Check if local storage is enabled in your browser
   - Clear browser cache and try again

2. **Total not calculating**
   - Ensure all numeric fields contain valid numbers
   - Check for any JavaScript console errors

3. **Search not working**
   - Verify that product data exists
   - Check case sensitivity in search terms

### Support

For support, please open an issue in the GitHub repository or contact [your-email@example.com]
