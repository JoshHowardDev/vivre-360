const tempUser = {
  userId: 42,
  sex: 'M',
  age: 33,
  pregnantOrLactating: 'N',
  height: 74,
  weight: 200,
  activityLevel: 1,
  calories: { rda: 2805 },
  fat: { rda: 86, min: 62, max: 109 },
  sat_fat: { rda: 0 },
  trans_fat: { rda: 0 },
  cholesterol: { rda: 0 },
  sodium: { rda: 1500 },
  carbs: { rda: 386, min: 316, max: 456 },
  fiber: { rda: 38 },
  // RDA Not given on USDA site
  sugars: {},
  protein: { rda: 73 },
  // RDA Not given on USDA site
  caffeine: {},
  // USDA site gives units in mcg. 0.3mcg = 1IU
  a: { rda: 3000, min: 3000, max: 10000 },
  b1: { rda: 1.2, min: 1.2 },
  b2: { rda: 1.3, min: 1.3 },
  b3: { rda: 16, min: 16, max: 35 },
  b5: { rda: 5, min: 5 },
  b6: { rda: 1.3, min: 1.3, max: 100 },
  b9: { rda: 400, min: 400, max: 1000 },
  b12: { rda: 2.4, min: 2.4 },
  c: { rda: 90, min: 90, max: 2000 },
  // USDA site gives units in g. 1g = 1,000mg
  choline: { rda: 550, min: 550, max: 3500 },
  // USDA site gives units in mcg. 0.3mcg = 1IU
  d: { rda: 50, min: 50, max: 333 },
  e: { rda: 15, min: 15, max: 1000 },
  k: { rda: 120 },
  calcium: { rda: 1000, min: 1000, max: 2500 },
  // USDA site gives units in mcg. 1,000mcg = 1mg
  copper: { rda: 0.9, min: 0.9, max: 10 },
  iron: { rda: 8, min: 8, max: 45 },
  magnesium: { rda: 420, min: 420 },
  manganese: { rda: 2.3, min: 2.3, max: 11 },
  // USDA site gives units in g. 1g = 1,000mg
  phosphorus: { rda: 700, min: 700, max: 4000 },
  potassium: { rda: 3400, min: 3400 },
  selenium: { rda: 55, min: 55, max: 400 },
  zinc: { rda: 11, min: 11, max: 40 },
};

export default tempUser;
