# PagosFiable.com Challenge

## Table of Contents

- [PagosFiable.com Challenge](#pagosfiablecom-challenge)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [Execution](#execution)
  - [Usage](#usage)
  - [Routes](#routes)
    - [Price Route](#price-route)
    - [Example Response for Price Route:](#example-response-for-price-route)
    - [Products Route](#products-route)
    - [Example Response for Products Route:](#example-response-for-products-route)

---

## Introduction

This repository contains the interview challenge solution for PagosFiable.com. It includes code for handling price and product-related functionalities.

## Installation

To install the necessary dependencies, run the following command:

```bash
npm install
```

## Execution

To start the application, run:

```bash
npm start
```

## Usage

Ensure that the application is running, then you can use the provided routes to access the functionality.

## Routes

### Price Route

-   **Endpoint**: `/price/{user_id}/{nombre_producto}`
-   **Description**: Retrieves price information for a product search.
-   **Controller Function**: `ControllerPrice`
-   **Logic**:
    -   Validates user_id and nombre_producto parameters.
    -   Retrieves user information.
    -   Searches for the product by name.
    -   Retrieves brand information for the product.
    -   Determines the price based on user's brand offers.
-   **Example**:
    ```http
    GET /price/123456/product_name
    ```

### Example Response for Price Route:

```json
{
    "user": {
        "Username": "example_user",
        "Email": "user@example.com"
    },
    "search": [
        {
            "ProductName": "product_name",
            "Brand": "brand_name",
            "Price": 25.99,
            "Stock": 10
        },
        {
            "ProductName": "another_product",
            "Brand": "another_brand",
            "Price": 19.99,
            "Stock": 5
        }
    ]
}
```

### Products Route

-   **Endpoint**: `/products`
-   **Description**: Retrieves products with sufficient stock.
-   **Controller Function**: `ControllerProducts`
-   **Logic**:
    -   Queries the database for products with stock greater than or equal to 1.
    -   Sends the found products back to the client.
-   **Example**:
    ```http
    GET /products
    ```

### Example Response for Products Route:

```json
[
    {
        "Name": "product_name",
        "Brand": "brand_id",
        "Price": 25.99,
        "OfferPrice": 23.99,
        "Stock": 10
    },
    {
        "Name": "another_product",
        "Brand": "another_brand_id",
        "Price": 19.99,
        "OfferPrice": 17.99,
        "Stock": 5
    }
]
```
