# Health Track
Health Track is an application that allows users to track their food nutrients, essential vitamins and minerals, and compare to RDA (Recommended Dietary Allowances).

# Tasks
1. Import existing food data from the USDA database.
2. Back end functionality to search and retrieve food and food IDs.
3. Front end functionality to search through existing foods and submit request for more data.
4. Back end functionality to receive the request and query the DB for the food nutrients.
5. Front end functionality to display food nutrients.
6. Front end functionality to combine food items to create a recipe.
7. Back end functionality to add food to a Dishes database.
8. Front end functionality to combine dishes into days.
9. Back end functionality to save days to a Days database.
10. Create users who have user IDs and save dishes and days with reference to that user.
11. Refactor previous steps with users.

# Technical Hurdles
1. I decided to implement a SQL database rather than a NoSQL database because the structure of the data is very unifrom, tracking the same nutritional info for each record.
2. I debated on the best data type for each field, especially the precision and scale of the decimal and numeric options. Since deep decimal accuray is needed for some nutrients, float was not a viable option. I decided on the decimal type with a precision of 19 and a scale of 9 to track with very high accuracy.
3. The USDA database was a NoSQL database and had a significant amount of data that was not useful for this application, so I had to build a function to parse through the various nested objects and pull the relevant data before inserting it into my new SQL database. 
4. While trying to insert approximately 8,000 new records programmatically, the ElephantSQL database occasionally threw errors as a result of too many insertions in too short a time. To avoid this, I built a recursive function that utilizes setTimeout to implement a delay between insertions and not overwhelm the site's requirements.
5. The programmatic insertion of the initial import overwhelmed the Pool, so I utilized pg-native to insert records synchronously for the initial import of data but switched to using Pool to have asynchronous benefits for future individual queries.