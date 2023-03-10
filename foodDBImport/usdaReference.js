const usdaReference = {};

usdaReference.nutrientIds = {
  1008: { pgName: 'calories', usdaName: 'Energy', units: 'kcal' },
  1004: { pgName: 'fat', usdaName: 'Total lipid (fat)' },
  1258: { pgName: 'sat_fat', usdaName: 'Fatty acids, total saturated', units: 'g' },
  1257: { pgName: 'trans_fat', usdaName: 'Fatty acids, total trans', units: 'g' },
  1253: { pgName: 'cholesterol', usdaName: 'Cholesterol', units: 'mg' },
  1093: { pgName: 'sodium', usdaName: 'Sodium, Na', units: 'mg' },
  1005: { pgName: 'carbs', usdaName: 'Carbohydrate, by difference', units: 'g' },
  1079: { pgName: 'fiber', usdaName: 'Fiber, total dietary', units: 'g' },
  2000: { pgName: 'sugars', usdaName: 'Sugars, total including NLEA', units: 'g' },
  1003: { pgName: 'protein', usdaName: 'Protein', units: 'g' },
  1057: { pgName: 'caffeine', usdaName: 'Caffeine', units: 'mg' },
  1104: { pgName: 'a', usdaName: 'Vitamin A, IU', units: 'iu' },
  1165: { pgName: 'b1', usdaName: 'Thiamin', units: 'mg' },
  1166: { pgName: 'b2', usdaName: 'Riboflavin', units: 'mg' },
  1167: { pgName: 'b3', usdaName: 'Niacin', units: 'mg' },
  1170: { pgName: 'b5', usdaName: 'Pantothenic acid', units: 'mg' },
  1175: { pgName: 'b6', usdaName: 'Vitamin B-6', units: 'mg' },
  1177: { pgName: 'b9', usdaName: 'Folate, total', units: 'ug' },
  1178: { pgName: 'b12', usdaName: 'Vitamin B-12', units: 'ug' },
  1162: { pgName: 'c', usdaName: 'Vitamin C, total ascorbic acid', units: 'mg' },
  1180: { pgName: 'choline', usdaName: 'Choline, total', units: 'mg' },
  1110: { pgName: 'd', usdaName: 'Vitamin D (D2 + D3), International Units', units: 'iu' },
  1109: { pgName: 'e', usdaName: 'Vitamin E (alpha-tocopherol)', units: 'mg' },
  1185: { pgName: 'k', usdaName: 'Vitamin K (phylloquinone)', units: 'ug' },
  1087: { pgName: 'calcium', usdaName: 'Calcium, Ca', units: 'mg' },
  1098: { pgName: 'copper', usdaName: 'Copper, Cu', units: 'mg' },
  1089: { pgName: 'iron', usdaName: 'Iron, Fe', units: 'mg' },
  1090: { pgName: 'magnesium', usdaName: 'Magnesium, Mg', units: 'mg' },
  1101: { pgName: 'manganese', usdaName: 'Manganese, Mn', units: 'mg' },
  1091: { pgName: 'phosphorus', usdaName: 'Phosphorus, P', units: 'mg' },
  1092: { pgName: 'potassium', usdaName: 'Potassium, K', units: 'mg' },
  1103: { pgName: 'selenium', usdaName: 'Selenium, Se', units: 'ug' },
  1095: { pgName: 'zinc', usdaName: 'Zinc, Zn', units: 'mg' },
};

// Create set from keys for more performant searching
usdaReference.nutrientIdsSet = new Set(Object.keys(usdaReference.nutrientIds));

module.exports = usdaReference;
