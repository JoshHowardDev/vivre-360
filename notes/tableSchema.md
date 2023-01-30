# Query String To Create Food Table
   CREATE TABLE food (
      _id SERIAL PRIMARY KEY,
      name varchar(255),
      calories decimal(19, 2),
      fat decimal(19, 9),
      sat_fat decimal(19, 9),
      trans_fat decimal(19, 9),
      cholesterol decimal(19, 9),
      sodium decimal(19, 9),
      carbs decimal(19, 9),
      fiber decimal(19, 9),
      sugars decimal(19, 9),
      protein decimal(19, 9),
      caffeine decimal(19, 9),
      a decimal(19, 9), 
      b1 decimal(19, 9), 
      b2 decimal(19, 9), 
      b3 decimal(19, 9), 
      b5 decimal(19, 9), 
      b6 decimal(19, 9), 
      b9 decimal(19, 9), 
      b12 decimal(19, 9), 
      c decimal(19, 9), 
      choline decimal(19, 9), 
      d decimal(19, 9), 
      e decimal(19, 9), 
      k decimal(19, 9), 
      calcium decimal(19, 9), 
      copper decimal(19, 9), 
      iron decimal(19, 9),
      magnesium decimal(19, 9),
      manganese decimal(19, 9),
      phosphorus decimal(19, 9),
      potassium decimal(19, 9),
      selenium decimal(19, 9),
      zinc decimal(19, 9)
    );

# Query String To Create Dishes Table
       CREATE TABLE dishes (
      _id SERIAL PRIMARY KEY,
      userId varchar(255),
      units varchar(255),
      name varchar(255),
      calories decimal(19, 2),
      fat decimal(19, 9),
      sat_fat decimal(19, 9),
      trans_fat decimal(19, 9),
      cholesterol decimal(19, 9),
      sodium decimal(19, 9),
      carbs decimal(19, 9),
      fiber decimal(19, 9),
      sugars decimal(19, 9),
      protein decimal(19, 9),
      caffeine decimal(19, 9),
      a decimal(19, 9), 
      b1 decimal(19, 9), 
      b2 decimal(19, 9), 
      b3 decimal(19, 9), 
      b5 decimal(19, 9), 
      b6 decimal(19, 9), 
      b9 decimal(19, 9), 
      b12 decimal(19, 9), 
      c decimal(19, 9), 
      choline decimal(19, 9), 
      d decimal(19, 9), 
      e decimal(19, 9), 
      k decimal(19, 9), 
      calcium decimal(19, 9), 
      copper decimal(19, 9), 
      iron decimal(19, 9),
      magnesium decimal(19, 9),
      manganese decimal(19, 9),
      phosphorus decimal(19, 9),
      potassium decimal(19, 9),
      selenium decimal(19, 9),
      zinc decimal(19, 9)
    );

# Query String To Create Servings Table
       CREATE TABLE servings (
      _id SERIAL PRIMARY KEY,
      food_id int references food(_id)
      name varchar(255),
      gramWeight decimal(9, 1)
      );

# Query String To Create googleUsers Table
      CREATE TABLE google_users (
      _id SERIAL PRIMARY KEY,
      google_id varchar(255),
      display_name varchar(255),
      family_name varchar(255),
      given_name varchar(255),
      email_verified boolean,
      verified boolean,
      language varchar(255),
      picture varchar(255)
      );