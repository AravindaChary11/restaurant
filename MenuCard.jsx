import React from 'react';

const MenuCard = () => {
  return (
    <div className="menu-card">
      <h2>Menu</h2>

      {/* Veg Dishes Section */}
      <div className="menu-section">
        <h3>Veg Dishes</h3>
        <ul>
          <li>Paneer Butter Masala</li>
          <li>Vegetable Biryani</li>
          <li>Dal Tadka</li>
        </ul>
      </div>

      {/* Non-Veg Dishes Section */}
      <div className="menu-section">
        <h3>Non-Veg Dishes</h3>
        <ul>
          <li>Chicken Curry</li>
          <li>Mutton Biryani</li>
          <li>Fish Fry</li>
        </ul>
      </div>

      {/* Beverages Section */}
      <div className="menu-section">
        <h3>Beverages</h3>
        <ul>
          <li>Fresh Lime Soda</li>
          <li>Masala Chai</li>
          <li>Cold Coffee</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuCard;
