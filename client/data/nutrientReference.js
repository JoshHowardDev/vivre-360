const nutrientReference = {
  _id: { units: '', type: 'info', displayName: 'ID' },
  userid: { units: '', type: 'info', displayName: 'User ID' },
  units: { units: '', type: 'info', displayName: 'Units' },
  name: { units: '', type: 'info', displayName: 'Description' },
  calories: { units: 'calories', type: 'label', displayName: 'Calories' },
  fat: { units: 'g', type: 'label', displayName: 'Total Fat' },
  sat_fat: { units: 'g', type: 'label', displayName: 'Saturated Fat' },
  trans_fat: { units: 'g', type: 'label', displayName: 'Trans Fat' },
  cholesterol: { units: 'mg', type: 'label', displayName: 'Cholesterol' },
  sodium: { units: 'mg', type: 'label', displayName: 'Sodium' },
  carbs: { units: 'g', type: 'label', displayName: 'Total Carbohydrates' },
  fiber: { units: 'g', type: 'label', displayName: 'Dietary Fiber' },
  sugars: { units: 'g', type: 'label', displayName: 'Total Sugars' },
  protein: { units: 'g', type: 'label', displayName: 'Protein' },
  caffeine: { units: 'mg', type: 'label', displayName: 'Caffeine' },
  a: { units: 'IU', type: 'vitamin', displayName: 'Vitamin A' },
  b1: { units: 'mg', type: 'vitamin', displayName: 'Thiamin (B1)' },
  b2: { units: 'mg', type: 'vitamin', displayName: 'Riboflavin (B2)' },
  b3: { units: 'mg', type: 'vitamin', displayName: 'Niacin (B3)' },
  b5: { units: 'mg', type: 'vitamin', displayName: 'Pantothenic Acid (B5)' },
  b6: { units: 'mg', type: 'vitamin', displayName: 'Vitamin B6' },
  b9: { units: 'mcg', type: 'vitamin', displayName: 'Folate (B9)' },
  b12: { units: 'mcg', type: 'vitamin', displayName: 'Vitamin B12' },
  c: { units: 'mg', type: 'vitamin', displayName: 'Vitamin C' },
  choline: { units: 'mg', type: 'mineral', displayName: 'Choline' },
  d: { units: 'IU', type: 'vitamin', displayName: 'Vitamin D' },
  e: { units: 'mg', type: 'vitamin', displayName: 'Vitamin E' },
  k: { units: 'mcg', type: 'vitamin', displayName: 'Vitamin K' },
  calcium: { units: 'mg', type: 'mineral', displayName: 'Calcium' },
  copper: { units: 'mg', type: 'mineral', displayName: 'Copper' },
  iron: { units: 'mg', type: 'mineral', displayName: 'Iron' },
  magnesium: { units: 'mg', type: 'mineral', displayName: 'Magnesium' },
  manganese: { units: 'mg', type: 'mineral', displayName: 'Manganese' },
  phosphorus: { units: 'mg', type: 'mineral', displayName: 'Phosphorus' },
  potassium: { units: 'mg', type: 'mineral', displayName: 'Potassium' },
  selenium: { units: 'mcg', type: 'mineral', displayName: 'Selenium' },
  zinc: { units: 'mg', type: 'mineral', displayName: 'Zinc' },
};

// function addProperty() {
//   Object.entries(nutrientReference).forEach(([key, value]) => {
//     const row = `${key}: { units: '${value.units}'
//                   , type: '${value.type}', displayName: '${value.displayName}' },`;
//     console.log(row);
//   });
// }
// addProperty();

export default nutrientReference;
