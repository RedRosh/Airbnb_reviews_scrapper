# Airbnb_reviews_scrapper

The scrapper will get all the reviews of an airbnb room page .

## To use the project :

1. ```
   git clone https://github.com/RedRosh/Airbnb_reviews_scrapper.git
   ```
2. ```
   cd Airbnb_reviews_scrapper
   ```
3. ```
   npm install
   ```

## To run the project :

- ```
  npm start https://www.airbnb.com/rooms/16371091
  ```

## Airbnb_reviews_scrapper :

the scrapper takes as input a **url** of Airbnb room page and it'll return a **JSON** object with the following format :

```
    {
        reviewSummary : {
            numberOfReviews ,
            rating ,
            categories : {
                cleanliness ,
                accuracy ,
                communication ,
                location ,
                checkIn ,
                value
            }
        },
        reviews : [
            {
                reviewerImageUrl ,
                reviewerName ,
                reviewDate ,
                review
            },
            ...
        ]
    }
```

_Here is the result for the following [room page](https://www.airbnb.com/rooms/44477561?adults=2&check_in=2022-01-27&check_out=2022-01-29&previous_page_section_name=1000&federated_search_id=2623f5af-f921-4aaf-b1cf-00597ec40d3f&guests=1):_

![alt text](https://i.ibb.co/7GvxPMY/Screenshot-2022-01-29-023248.png)

## TODO

- [x] Init the project structure
- [x] Implementing the scrapper
- [x] Handle network errors
- [x] Add meaningful logs
