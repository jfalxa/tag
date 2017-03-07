# Tag

tag is a small library to do advance queries on a collection of documents that are tagged with many labels.


## Run a query

The libary default export is the `runQuery` function. It takes two arguments: `query` and `load`.

- `query` is the tag query you want to run, like `A and (B or not C)`.
- `load` is a function that loads the needed data into the algorithm.


## Making a query

The query language is simple, you have 3 operators: `and`, `or` and `not`.

You can use them to combine tags into a query. For example:
- `A and B`: returns the documents that have both the tags A and B
- `A and not B`: returns the documents that have the tag A but not the tag B
- `A or B`: returns the documents that have the tag A and also the ones with the tag B

If you want to add many tags into one operation, you can separate the first ones with a comma:
- `A, B or C`: returns the documents with the tag A and also those which have B or C

To create more complex queries, you can use parenthesis to group some operations:
- `A and (B or C)`: will return the documents that both have the tag A and either the tag B or C


## Loading data

tag is made to run directly in memory so you'll need to feed it data directly. To do that, you'll have to implement your own `load` function and pass it to `runQuery`.

The function will receive an array of tags as first argument. You can use it to only load the list of documents for these tags only from you database.

`runQuery` then expect your function to return a simple object mapping all those tags to their related documents.

```JS
{
    A : [1, 2, 3, 4, 5],
    B : [3, 4, 5, 6, 7]
}
```
