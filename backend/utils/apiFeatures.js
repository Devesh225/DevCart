const { remove } = require("../models/productModel");

class ApiFeatures {
    constructor(query, queryStr) {
        this.query = query; // MONGODB QUERY
        this.queryStr = queryStr; // SEARCH STRING
    }
    
    search() {
        const keyword = this.queryStr.keyword ? {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i", // CASE INSENSITIVE
            }
         } : {};

         this.query = this.query.find({...keyword});
         return this;
    }

    filter() { 
        // CATEGORY FILTER
        const queryCopy = {...this.queryStr}; // NOT A REFERENCE, ACTUAL COPY
        const removeFields = ["keyword", "page", "limit"]; // THESE QUERY SHOULD BE SKIPPED.
        removeFields.forEach((key) => {
            delete queryCopy[key];
        });

        // PRICE AND RATING FILTER (RANGEWISE PRICE, AND RATING) :-
        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        this.query = this.query.find(JSON.parse(queryStr));
        return this;

    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1; // VALUE OF CURRENT PAGE FROM THE QUERY STRING.
        const skip = resultPerPage * (currentPage - 1); // HOW MANY PRODUCTS WE NEED TO SKIP. SO, FOR THE FIRST PAGE 0 PRODUCTS ARE SKIPPED. FOR THE SECOND PAGE, resultsPerPage items are skipped.
        this.query = this.query.limit(resultPerPage).skip(skip); // productModel.find().limit(resultsPerPage).skip(skip);
        return this;
    }
}

module.exports = ApiFeatures;