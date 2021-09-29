import React, { useState, useEffect, useCallback } from "react";
import { Page, Card, Button, Form, TextField } from "@shopify/polaris";
import gql from "graphql-tag";
import { useMutation, useQuery } from "react-apollo";

import Navigation from "../../components/Navigation/Navigation";

const Reports = () => {
  const [code, setCode] = useState();
  const orderIds = gql`
    {
      orders(first: 50) {
        edges {
          node {
            id
            discountCode
            currentSubtotalLineItemsQuantity
            cartDiscountAmountSet {
              shopMoney {
                amount
              }
            }
            currentTotalPriceSet {
              shopMoney {
                amount
              }
            }
          }
        }
      }
    }
  `;
  const handleCodeChange = useCallback((value) => setCode(value), []);
  const { data, loading, error } = useQuery(orderIds);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  let ids = [];
  let amount = [];
  let specificDiscount = [];
  let noOfProducts = [];
  let noOfProductsOnDiscount = [];
  data.orders.edges.map((item) => {
    if (item.node.discountCode) {
      ids.push(item.node.id);
      amount.push(
        parseFloat(item.node.currentTotalPriceSet["shopMoney"].amount)
      );
      noOfProductsOnDiscount.push(
        parseInt(item.node.currentSubtotalLineItemsQuantity)
      );
    }
    noOfProducts.push(parseInt(item.node.currentSubtotalLineItemsQuantity));
    console.log(parseInt(item.node.currentSubtotalLineItemsQuantity));
  });
  let sales = 0;
  if (code) {
    data.orders.edges.map((item) => {
      if (item.node.discountCode === code) {
        specificDiscount.push(
          parseFloat(item.node.currentTotalPriceSet["shopMoney"].amount)
        );
      }
    });

    for (let i = 0; i < specificDiscount.length; i++) {
      sales += specificDiscount[i];
    }
    console.log(sales);
  }

  let sum = 0;
  for (let i = 0; i < amount.length; i++) {
    sum += amount[i];
  }

  let noProducts = 0;
  for (let i = 0; i < noOfProducts.length; i++) {
    noProducts += noOfProducts[i];
  }
  let noProductsDS = 0;
  for (let i = 0; i < noOfProductsOnDiscount.length; i++) {
    noProductsDS += noOfProductsOnDiscount[i];
  }
  console.log(noProducts);
  return (
    <>
      <Navigation></Navigation>
      <Page>
        <Card sectioned title="Campaign">
          <p>Number of times discount applied: {ids.length} </p>
          <p>Sales: ${sum} </p>
        </Card>
        <Card sectioned title="Influencer profile">
          <TextField
            label="Enter influencer code"
            value={code}
            onChange={handleCodeChange}
            type="text"
          />
          {code ? (
            <>
              <p>
                Times the influencer code got used: {specificDiscount.length}
              </p>
              <p>Sales: ${sales}</p>
            </>
          ) : (
            ""
          )}
        </Card>
        <Card sectioned title="Product">
          <p>Number of products sold: {noProducts} </p>
          <p>Sold on discount: {noProductsDS} </p>
        </Card>
      </Page>
    </>
  );
};
export default Reports;
