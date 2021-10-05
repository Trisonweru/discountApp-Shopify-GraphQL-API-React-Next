import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { ResourcePicker } from "@shopify/app-bridge-react";
import gql from "graphql-tag";
import { useMutation } from "react-apollo";
import { useRouter } from "next/dist/client/router";
import { UilTimes } from "@iconscout/react-unicons";
function Home() {
  const [discountSelected, setDiscountSelected] = useState("percentage");
  const [periodChecked, setPeriodChecked] = useState(true);
  const [regionChecked, setRegionChecked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [startsAt, setStartsAt] = useState(
    new Date().toISOString().substr(0, 10)
  );
  const [endsAt, setEndssAt] = useState(new Date().toISOString().substr(0, 10));
  const [countriesSelected, setCountriesSelected] = useState([]);
  const [selectedCountryText, setSelectedCountryText] = useState([]);
  const [limitChecked, setLimitChecked] = useState(false);
  const [handle, setHandle] = useState();
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [discountValue, setDiscountValue] = useState();
  const [limitValue, setLimitValue] = useState();
  const [applyOn, setApplyOn] = useState();
  const [customerBuys, setCustomerBuys] = useState();
  //drop dublicated countries
  const newSelectedCountryText = [...new Set(selectedCountryText)];
  //drop dublicated countries codes
  const newCountriesSelected = [...new Set(countriesSelected)];
  // const [collection, setCollection] = useState(false);
  // const [product, setProduct] = useState(false);
  const [collectionIds, setCollectionIds] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [collectionBuysIds, setCollectionBuysIds] = useState([]);
  const [productBuysIds, setProductBuysIds] = useState([]);
  const [buyscollection, setBuysCollection] = useState(false);
  const [buysproduct, setBuysProduct] = useState(false);
  const [discountBuyAmount, setDiscountBuyAmount] = useState();
  const [discountQuantity, setDiscountQuantity] = useState();
  const [minimunRequirement, setMinimumRequirement] = useState();
  const [discountBuyQuantity, setDiscountBuyQuantity] = useState();
  const [alertPass, setAlertPass] = useState(false);
  const [alertFail, setAlertFail] = useState(false);
  const [formError, setFormErrors] = useState();
  const [error, setError] = useState();

  const router = useRouter();

  useEffect(() => {
    setDiscountSelected("percentage");
    setPeriodChecked(true);
    setRegionChecked(false);
    setSelectedCountry(false);
    setCountriesSelected([]);
    setSelectedCountryText([]);
    setLimitChecked(false);
    setHandle("");
    setName("");
    setCode("");
    setDiscountValue("");
    setLimitValue("");
    setApplyOn("");
    setCustomerBuys("");
    // setCollection(false);
    // setProduct(false);
    setCollectionIds([]);
    setProductIds([]);
    setCollectionBuysIds([]);
    setProductBuysIds([]);
    setBuysCollection(false);
    setBuysProduct(false);
    setDiscountBuyAmount("");
    setDiscountQuantity("");
    setMinimumRequirement("");
    setDiscountBuyQuantity("");
    setFormErrors();
    setAlertFail(false);
    setAlertPass(false);
  }, []);

  const handleClose = (index) => {
    newSelectedCountryText.reverse().splice(index, 1);
    newCountriesSelected.reverse().splice(index, 1);

    setCountriesSelected(newCountriesSelected.reverse());
    setSelectedCountryText(newSelectedCountryText.reverse());
  };

  const date = new Date();
  const defaultDate = date.toISOString().split("T")[0];
  // Percentage discount GraphQL Queries

  const percentageDiscountAll = gql`
  mutation {
    discountCodeBasicCreate(
      basicCodeDiscount: {
        title: "${name}"
        startsAt: "${startsAt ? startsAt : defaultDate}"
        endsAt: "${endsAt ? endsAt : null}"
        usageLimit: ${limitValue ? parseInt(limitValue) : null}
        appliesOncePerCustomer: true
        customerSelection: { all: true }
        code: "${code}"
    customerGets: {
      value: {
        percentage:${parseFloat(discountValue)}
      }
      items:{all:true}
    }}
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  const percentageDiscountSelection = gql`
  mutation {
    discountCodeBasicCreate(
      basicCodeDiscount: {
        title: "${name}"
        startsAt: "${startsAt ? startsAt : defaultDate}"
        endsAt: "${endsAt ? endsAt : null}"
        usageLimit: ${limitValue ? parseInt(limitValue) : null}
        appliesOncePerCustomer: true
        customerSelection: { all: true }
        code: "${code}"
    customerGets: {
      value: {
        percentage:${parseFloat(discountValue)}
      },
      items: {collections: {add: ${JSON.stringify(collectionIds)}}}
    }}
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const percentageDiscountProduct = gql`
  mutation {
    discountCodeBasicCreate(
      basicCodeDiscount: {
        title: "${name}"
        startsAt: "${startsAt ? startsAt : defaultDate}"
        endsAt: "${endsAt ? endsAt : null}"
        usageLimit: ${limitValue ? parseInt(limitValue) : null}
        appliesOncePerCustomer: true
        customerSelection: { all: true }
        code: "${code}"
    customerGets: {
      value: {
        percentage:${parseFloat(discountValue)}
      },
      items: {products: {productsToAdd: ${JSON.stringify(productIds)}}}
    }}
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const dollarDiscountAll = gql`
  mutation {
    discountCodeBasicCreate(
      basicCodeDiscount: {
        title: "${name}"
        startsAt: "${startsAt ? startsAt : defaultDate}"
        endsAt: "${endsAt ? endsAt : null}"
        usageLimit: ${limitValue ? parseInt(limitValue) : null}
        appliesOncePerCustomer: true
        customerSelection: { all: true }
        code: "${code}"
    customerGets: {
      value: {
        discountAmount:{amount:${parseFloat(
          discountValue
        )}, appliesOnEachItem:false}
      }
      items:{all:true}
    }}
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  const dollarDiscountCollection = gql`
  mutation {
    discountCodeBasicCreate(
      basicCodeDiscount: {
        title: "${name}"
        startsAt: "${startsAt ? startsAt : defaultDate}"
        endsAt: "${endsAt ? endsAt : null}"
        usageLimit: ${limitValue ? parseInt(limitValue) : null}
        appliesOncePerCustomer: true
        customerSelection: { all: true }
        code: "${code}"
    customerGets: {
      value: {
        discountAmount:{amount:${parseFloat(
          discountValue
        )}, appliesOnEachItem:false}
      }
      items:{collections: {add: ${JSON.stringify(collectionIds)}}}
    }}
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  const dollarDiscountProduct = gql`
  mutation {
    discountCodeBasicCreate(
      basicCodeDiscount: {
        title: "${name}"
        startsAt: "${startsAt ? startsAt : defaultDate}"
        endsAt: "${endsAt ? endsAt : null}"
        usageLimit: ${limitValue ? parseInt(limitValue) : null}
        appliesOncePerCustomer: true
        customerSelection: { all: true }
        code: "${code}"
    customerGets: {
      value: {
        discountAmount:{amount:${parseFloat(
          discountValue
        )}, appliesOnEachItem:false}
      }
      items:{products: {productsToAdd: ${JSON.stringify(productIds)}}}
    }}
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  //dollar amount with minimun requirements
  const dollarDiscountMinimunAll = gql`
  mutation {
    discountCodeBasicCreate(
      basicCodeDiscount: {
        title: "${name}"
        startsAt: "${startsAt ? startsAt : defaultDate}"
        endsAt: "${endsAt ? endsAt : null}"
        usageLimit: ${limitValue ? parseInt(limitValue) : null}
        appliesOncePerCustomer: true
        customerSelection: { all: true }
        code: "${code}"
    customerGets: {
      value: {
        discountAmount:{amount:${parseFloat(
          discountValue
        )}, appliesOnEachItem:false}
      }
      items:{all:true}
    }
    minimumRequirement:{subtotal:{greaterThanOrEqualToSubtotal:${parseFloat(
      minimunRequirement
    )}}}
  }
   
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
  `;
  const dollarDiscountMinimunCollection = gql`
  mutation {
    discountCodeBasicCreate(
      basicCodeDiscount: {
        title: "${name}"
        startsAt: "${startsAt ? startsAt : defaultDate}"
        endsAt: "${endsAt ? endsAt : null}"
        usageLimit: ${limitValue ? parseInt(limitValue) : null}
        appliesOncePerCustomer: true
        customerSelection: { all: true }
        code: "${code}"
    customerGets: {
      value: {
        discountAmount:{amount:${parseFloat(
          discountValue
        )}, appliesOnEachItem:false}
      }
      items:{collections: {add: ${JSON.stringify(collectionIds)}}}
    }
    minimumRequirement:{subtotal:{greaterThanOrEqualToSubtotal:${parseFloat(
      minimunRequirement
    )}}}
  }
   
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  const dollarDiscountMinimunProduct = gql`
  mutation {
    discountCodeBasicCreate(
      basicCodeDiscount: {
        title: "${name}"
        startsAt: "${startsAt ? startsAt : defaultDate}"
        endsAt: "${endsAt ? endsAt : null}"
        usageLimit: ${limitValue ? parseInt(limitValue) : null}
        appliesOncePerCustomer: true
        customerSelection: { all: true }
        code: "${code}"
    customerGets: {
      value: {
        discountAmount:{amount:${parseFloat(
          discountValue
        )}, appliesOnEachItem:false}
      }
      items:{products: {productsToAdd: ${JSON.stringify(productIds)}}}
    }
    minimumRequirement:{subtotal:{greaterThanOrEqualToSubtotal:${parseFloat(
      minimunRequirement
    )}}}
  }
   
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          ... on DiscountCodeBasic {
            title
            summary
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
  `;

  //Free shipping
  //It turns out for free shipping you need to verify the stores address.
  const freeShippingDiscount = gql`
  mutation {
    discountCodeFreeShippingCreate(
      freeShippingCodeDiscount: {
        code: "${code}"
        title: "${name}"
        startsAt: "${startsAt}"
        destination: { countries: { add: ${JSON.stringify(
          newCountriesSelected
        )} } }
        customerSelection: { all: true }
        usageLimit: ${limitValue ? parseFloat(limitValue) : null}
      }
    ) {
      userErrors {
        field
        message
        code
      }
      codeDiscountNode {
        id
        codeDiscount {
          __typename
          ... on DiscountCodeFreeShipping {
            title
            status
            codes(first: 10) {
              edges {
                node {
                  code
                }
              }
            }
          }
        }
      }
    }
  }
`;

  //Buy X and get Y
  const buyYgetXProducts = gql`
    mutation {
      discountCodeBxgyCreate(
        bxgyCodeDiscount: {
          title: "${name}"
          startsAt: "${startsAt}"
          endsAt: "${endsAt}"
          usageLimit: ${limitValue ? parseFloat(limitValue) : null}
          code: "${code}"
          customerSelection: { all: true }
          customerBuys: {
            value: { amount:  ${parseFloat(discountBuyAmount)} }
            items: {
            products: {productsToAdd: ${JSON.stringify(productBuysIds)}}
            }
          }
          customerGets: {
            value: {
              discountOnQuantity: {
                quantity: ${
                  discountQuantity ? JSON.stringify(discountQuantity) : 1
                }
                effect: { percentage:${parseFloat(discountValue)}}
              }
            }
            items: {
            products: {productsToAdd: ${JSON.stringify(productIds)}}
            }
          }
        }
      ) {
        userErrors {
          field
          message
          code
        }

        codeDiscountNode {
          id

          codeDiscount {
            ... on DiscountCodeBxgy {
              title

              summary

              status

              codes(first: 100) {
                edges {
                  node {
                    code
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const buyYgetXProductsQuantity = gql`
    mutation {
      discountCodeBxgyCreate(
        bxgyCodeDiscount: {
          title: "${name}"
          startsAt: "${startsAt}"
          endsAt: "${endsAt}"
          usageLimit: ${limitValue ? parseFloat(limitValue) : null}
          code: "${code}"
          customerSelection: { all: true }
          customerBuys: {
            value: { quantity:  "${parseFloat(discountBuyQuantity)}" }
            items: {
            products: {productsToAdd: ${JSON.stringify(productBuysIds)}}
            }
          }
          customerGets: {
            value: {
              discountOnQuantity: {
                quantity: ${
                  discountQuantity ? JSON.stringify(discountQuantity) : 1
                }
                effect: { percentage:${parseFloat(discountValue)}}
              }
            }
            items: {
            products: {productsToAdd: ${JSON.stringify(productIds)}}
            }
          }
        }
      ) {
        userErrors {
          field
          message
          code
        }

        codeDiscountNode {
          id

          codeDiscount {
            ... on DiscountCodeBxgy {
              title

              summary

              status

              codes(first: 100) {
                edges {
                  node {
                    code
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  /**${
              discountBuyAmount
                ? { amount: parseFloat(discountBuyAmount) }
                : discountBuyQuantity && {
                    quantity: parseInt(discountBuyQuantity),
                  }
  } */
  const buyYgetXCollection = gql`
    mutation {
      discountCodeBxgyCreate(
        bxgyCodeDiscount: {
          title: "${name}"
          startsAt: "${startsAt}"
          endsAt: "${endsAt}"
          usageLimit: ${limitValue ? parseFloat(limitValue) : null}
          code: "${code}"
          customerSelection: { all: true }
          customerBuys: {
            value: { amount: ${parseFloat(discountBuyAmount)} }
            items: {
            collections: {add: ${JSON.stringify(collectionBuysIds)}}
            }
          }
          customerGets: {
            value: {
              discountOnQuantity: {
                quantity: ${
                  discountQuantity ? JSON.stringify(discountQuantity) : 1
                }
                effect: { percentage:${parseFloat(discountValue)}}
              }
            }
            items: {
            collections: {add: ${JSON.stringify(collectionIds)}}
            }
          }
        }
      ) {
        userErrors {
          field
          message
          code
        }

        codeDiscountNode {
          id

          codeDiscount {
            ... on DiscountCodeBxgy {
              title

              summary

              status

              codes(first: 100) {
                edges {
                  node {
                    code
                  }
                }
              }
            }
          }
        }
      }
    }
  `;
  const buyYgetXCollectionQuantity = gql`
    mutation {
      discountCodeBxgyCreate(
        bxgyCodeDiscount: {
          title: "${name}"
          startsAt: "${startsAt}"
          endsAt: "${endsAt}"
          usageLimit: ${limitValue ? parseFloat(limitValue) : null}
          code: "${code}"
          customerSelection: { all: true }
          customerBuys: {
            value: { quantity: "${parseInt(discountBuyQuantity)}" }
            items: {
            collections: {add: ${JSON.stringify(collectionBuysIds)}}
            }
          }
          customerGets: {
            value: {
              discountOnQuantity: {
                quantity: ${
                  discountQuantity ? JSON.stringify(discountQuantity) : 1
                }
                effect: { percentage:${parseFloat(discountValue)}}
              }
            }
            items: {
            collections: {add: ${JSON.stringify(collectionIds)}}
            }
          }
        }
      ) {
        userErrors {
          field
          message
          code
        }

        codeDiscountNode {
          id

          codeDiscount {
            ... on DiscountCodeBxgy {
              title

              summary

              status

              codes(first: 100) {
                edges {
                  node {
                    code
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const handleCollectionSelection = (items) => {
    const coll = items.selection.map((item) => item.id);
    setCollectionIds(coll);
    setProductIds([]);
  };
  const handleProductSelection = (items) => {
    const prods = items.selection.map((item) => item.id);
    setProductIds(prods);
    setCollectionIds([]);
  };
  const handleCollectionBuysSelection = (items) => {
    const coll = items.selection.map((item) => item.id);
    setCollectionBuysIds(coll);
    setProductBuysIds([]);
    setBuysProduct(false);
    setBuysCollection(true);
  };
  const handleProductBuysSelection = (items) => {
    const prods = items.selection.map((item) => item.id);
    setProductBuysIds(prods);
    setCollectionBuysIds([]);
    setBuysProduct(true);
    setBuysCollection(false);
  };

  const [handlePercentageSubmit, { data, loading }] = useMutation(
    discountSelected === "percentage" && applyOn === "product"
      ? percentageDiscountProduct
      : discountSelected === "percentage" && applyOn === "collection"
      ? percentageDiscountSelection
      : discountSelected === "dollarAmount" && applyOn === "all"
      ? dollarDiscountAll
      : discountSelected === "dollarAmount" && applyOn === "collection"
      ? dollarDiscountCollection
      : discountSelected === "dollarAmount" && applyOn === "product"
      ? dollarDiscountProduct
      : discountSelected === "minimumAmount" && applyOn === "all"
      ? dollarDiscountMinimunAll
      : discountSelected === "minimumAmount" && applyOn === "collection"
      ? dollarDiscountMinimunCollection
      : discountSelected === "minimumAmount" && applyOn === "buysproduct"
      ? dollarDiscountMinimunProduct
      : discountSelected === "freeShipping"
      ? freeShippingDiscount
      : discountSelected === "buyxgety" &&
        customerBuys === "buysproduct" &&
        discountBuyAmount
      ? buyYgetXProducts
      : discountSelected === "buyxgety" &&
        customerBuys === "buysproduct" &&
        discountBuyQuantity
      ? buyYgetXProductsQuantity
      : discountSelected === "buyxgety" &&
        customerBuys === "buyscollection" &&
        discountBuyAmount
      ? buyYgetXCollection
      : discountSelected === "buyxgety" &&
        customerBuys === "buyscollection" &&
        discountBuyQuantity
      ? buyYgetXCollectionQuantity
      : percentageDiscountAll,
    {
      onError: (err) => {
        setError(err);
      },
    }
  );

  if (error) {
    console.log(error);
    return (
      <div className={styles.alertError}>
        Error occurred while processing your request . Try Again!
        <div>
          <button onClick={() => router.push("/")} className={styles.submitBtn}>
            Back home
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loading}>
        Processing your request. Kindly wait!
      </div>
    );
  }
  console.log(data);

  return (
    <div className={styles.HomeContainer}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (
            (discountSelected === "percentage" && !startsAt) ||
            (discountSelected === "percentage" && !endsAt) ||
            (discountSelected === "buyxgety" && !startsAt) ||
            (discountSelected === "buyxgety" && !endsAt) ||
            (discountSelected === "buyxgety" && !discountValue) ||
            (discountSelected === "minimumAmount" && !startsAt) ||
            (discountSelected === "minimumAmount" && !endsAt) ||
            (discountSelected === "dollarAmount" && !startsAt) ||
            (discountSelected === "dollarAmount" && !endsAt)
          ) {
            setFormErrors(true);
          } else {
            handlePercentageSubmit();
          }
        }}
      >
        <div className={styles.formGroup}>
          {alertPass || data ? (
            <div className={styles.alertSuccess}>
              Discount code created successfully
            </div>
          ) : alertFail ? (
            <div className={styles.alertError}>
              Error occurred while processing your request. Try Again!
            </div>
          ) : formError ? (
            <div className={styles.alertError}>
              Start date and End date required!
            </div>
          ) : (
            ""
          )}
          <div className={styles.GroupName}>Influencer</div>
          <div className={styles.inputWrapper}>
            <label>@handle</label>
            <input
              type="text"
              name="handle"
              placeholder="Influencer handle"
              className={styles.formInput}
              value={handle}
              onChange={(e) => setHandle(e.target.value)}
            />
          </div>
          <div className={styles.inputWrapper}>
            <label>Influencer name</label>
            <input
              type="text"
              name="name"
              placeholder="Influencer name"
              className={styles.formInput}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.GroupName}>Code</div>
          <div className={styles.inputWrapper}>
            <label>Code</label>
            <input
              type="text"
              name="code"
              placeholder="Code"
              className={styles.formInput}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.formGroup}>
          <div className={styles.GroupName}>Discount Settings</div>
          <div className={styles.inputWrapper}>
            <label>Discount Type</label>
            <select
              name="discount"
              size="1"
              className={styles.formInput}
              value={discountSelected}
              onChange={(e) => setDiscountSelected(e.target.value)}
            >
              <option value="percentage">Percentage</option>
              <option value="buyxgety">Buy X get Y</option>
              <option value="dollarAmount">$ Amount</option>
              <option value="minimumAmount">$ Amount with minimum</option>
              <option value="freeShipping">Free shipping</option>
            </select>
          </div>
          {discountSelected === "buyxgety" ? (
            <>
              {!discountBuyQuantity && (
                <div className={styles.inputWrapper}>
                  <label className={styles.discoutTypelbl}>
                    Customer buys (X Amount)
                  </label>
                  <input
                    type="text"
                    name="amount"
                    placeholder="Value amount"
                    className={styles.formInput}
                    value={discountBuyAmount}
                    onChange={(e) => setDiscountBuyAmount(e.target.value)}
                  />
                </div>
              )}
              {!discountBuyAmount && (
                <div className={styles.inputWrapper}>
                  <label className={styles.discoutTypelbl}>
                    Customer buys (X Quantity)
                  </label>
                  <input
                    type="text"
                    name="amount"
                    placeholder="Quantity"
                    className={styles.formInput}
                    value={discountBuyQuantity}
                    onChange={(e) => setDiscountBuyQuantity(e.target.value)}
                  />
                </div>
              )}
              <div className={styles.formGroup}>
                <div className={styles.inputWrapper}>
                  <label>Apply on </label>
                  <select
                    name="customerbuysapplyon"
                    size="1"
                    disabled={
                      discountSelected === "freeShipping" ? "disabled" : ""
                    }
                    className={styles.formInput}
                    value={customerBuys}
                    onChange={(e) => setCustomerBuys(e.target.value)}
                  >
                    <option value="appy_on">Apply on</option>
                    <option value="buyscollection">Collection</option>
                    <option value="buysproduct">Product</option>
                  </select>
                  {customerBuys === "buyscollection" ? (
                    <ResourcePicker
                      resourceType="Collection"
                      open={customerBuys === "buyscollection" ? true : false}
                      onCancel={() => setCustomerBuys("appy_on")}
                      onSelection={(items) => {
                        handleCollectionBuysSelection(items);
                      }}
                    />
                  ) : customerBuys === "buysproduct" ? (
                    <ResourcePicker
                      resourceType="Product"
                      open={customerBuys === "buysproduct" ? true : false}
                      onCancel={() => setCustomerBuys("appy_on")}
                      onSelection={(products) => {
                        handleProductBuysSelection(products);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          <div className={styles.inputWrapper}>
            <label className={styles.discoutTypelbl}>
              {discountSelected === "percentage"
                ? "Percentage Discount (between 0.0 and 1.0)"
                : discountSelected === "buyxgety"
                ? "Customer Gets (Y-percentage-between 0.0 & 1.0)"
                : discountSelected === "dollarAmount"
                ? "Discount Amount"
                : discountSelected === "minimumAmount"
                ? "Discount Amount"
                : discountSelected === "freeShipping"
                ? "Minimum Amount"
                : ""}
            </label>
            <input
              type="text"
              name="amount"
              placeholder="Value"
              className={styles.formInput}
              value={discountValue}
              onChange={(e) => setDiscountValue(e.target.value)}
            />
          </div>
          {discountSelected === "buyxgety" ? (
            <div className={styles.inputWrapper}>
              <label className={styles.discoutTypelbl}>Quantity</label>
              <input
                type="text"
                name="amount"
                placeholder="Value"
                className={styles.formInput}
                value={discountQuantity}
                onChange={(e) => setDiscountQuantity(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}
          {discountSelected === "minimumAmount" ? (
            <div className={styles.inputWrapper}>
              <label className={styles.discoutTypelbl}>
                Minimun Requirement
              </label>
              <input
                type="text"
                name="minimum amount"
                placeholder="Minimun amount"
                className={styles.formInput}
                value={minimunRequirement}
                onChange={(e) => setMinimumRequirement(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}
          <div className={styles.formGroup}>
            <div className={styles.GroupName}>Discount Application</div>
            <div className={styles.inputWrapper}>
              <label>Apply on </label>
              <select
                name="applyon"
                size="1"
                disabled={discountSelected === "freeShipping" ? "disabled" : ""}
                className={styles.formInput}
                value={applyOn}
                onChange={(e) => setApplyOn(e.target.value)}
              >
                <option>Select option</option>
                {discountSelected === "buyxgety" ? (
                  ""
                ) : (
                  <option value="all">All</option>
                )}

                {buyscollection ||
                discountSelected === "percentage" ||
                discountSelected === "dollarAmount" ||
                discountSelected === "minimumAmount" ? (
                  <option value="collection">Collection</option>
                ) : (
                  ""
                )}
                {buysproduct ||
                discountSelected === "percentage" ||
                discountSelected === "dollarAmount" ||
                discountSelected === "minimumAmount" ? (
                  <option value="product">Product</option>
                ) : (
                  ""
                )}
              </select>
              {applyOn === "collection" ? (
                <ResourcePicker
                  resourceType="Collection"
                  open={applyOn === "collection" ? true : false}
                  onCancel={() => setApplyOn("all")}
                  onSelection={(items) => {
                    handleCollectionSelection(items);
                  }}
                />
              ) : applyOn === "product" ? (
                <ResourcePicker
                  resourceType="Product"
                  open={applyOn === "product" ? true : false}
                  onCancel={() => setApplyOn("all")}
                  onSelection={(products) => {
                    handleProductSelection(products);
                  }}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={styles.inputWrapperCheckbox}>
            <input
              type="checkbox"
              name="amount"
              defaultChecked={periodChecked}
              onChange={(e) => setPeriodChecked(!periodChecked)}
              className={styles.checkBox}
            />
            <label>Set Discount Period</label>
          </div>
          {periodChecked ? (
            <div className={styles.inputWrapper}>
              <div>
                <label>Starts At</label>
                <input
                  type="date"
                  name="amount"
                  placeholder="Value"
                  value={startsAt}
                  className={styles.formInputDate}
                  onChange={(e) => setStartsAt(e.target.value)}
                />
              </div>
              <div>
                <label>Ends At</label>
                <input
                  type="date"
                  name="amount"
                  disabled={
                    discountSelected === "freeShipping" ? "disabled" : ""
                  }
                  placeholder="Value"
                  value={endsAt}
                  className={styles.formInputDate}
                  onChange={(e) => setEndssAt(e.target.value)}
                />
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className={styles.inputWrapperCheckbox}>
          <input
            type="checkbox"
            name="amount"
            disabled={
              discountSelected === "percentage" ||
              discountSelected === "buyxgety" ||
              discountSelected === "dollarAmount" ||
              discountSelected === "minimumAmount"
                ? "disabled"
                : ""
            }
            defaultChecked={regionChecked}
            onChange={(e) => setRegionChecked(!regionChecked)}
            className={styles.checkBox}
          />
          <label>Region Specific</label>
        </div>
        {regionChecked ? (
          <div className={styles.inputWrapper}>
            <label>
              {selectedCountryText.length > 0
                ? "Selected region(s)"
                : "Select region(s)"}
            </label>
            <div className={styles.CountrySelect}>
              {" "}
              <select
                id="country"
                name="country"
                size="1"
                className={styles.formInput}
                value={selectedCountry}
                onChange={(e) => {
                  setSelectedCountry(e.target.value);
                  setCountriesSelected([...countriesSelected, e.target.value]);
                  setSelectedCountryText([
                    ...selectedCountryText,
                    e.target.options[e.target.selectedIndex].text,
                  ]);
                }}
              >
                <option>Select country</option>
                <option value="AF" name="Afghanistan">
                  Afghanistan
                </option>
                <option value="AX">Aland Islands</option>
                <option value="AL">Albania</option>
                <option value="DZ">Algeria</option>
                <option value="AS">American Samoa</option>
                <option value="AD">Andorra</option>
                <option value="AO">Angola</option>
                <option value="AI">Anguilla</option>
                <option value="AQ">Antarctica</option>
                <option value="AG">Antigua and Barbuda</option>
                <option value="AR">Argentina</option>
                <option value="AM">Armenia</option>
                <option value="AW">Aruba</option>
                <option value="AU">Australia</option>
                <option value="AT">Austria</option>
                <option value="AZ">Azerbaijan</option>
                <option value="BS">Bahamas</option>
                <option value="BH">Bahrain</option>
                <option value="BD">Bangladesh</option>
                <option value="BB">Barbados</option>
                <option value="BY">Belarus</option>
                <option value="BE">Belgium</option>
                <option value="BZ">Belize</option>
                <option value="BJ">Benin</option>
                <option value="BM">Bermuda</option>
                <option value="BT">Bhutan</option>
                <option value="BO">Bolivia</option>
                <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                <option value="BA">Bosnia and Herzegovina</option>
                <option value="BW">Botswana</option>
                <option value="BV">Bouvet Island</option>
                <option value="BR">Brazil</option>
                <option value="IO">British Indian Ocean Territory</option>
                <option value="BN">Brunei Darussalam</option>
                <option value="BG">Bulgaria</option>
                <option value="BF">Burkina Faso</option>
                <option value="BI">Burundi</option>
                <option value="KH">Cambodia</option>
                <option value="CM">Cameroon</option>
                <option value="CA">Canada</option>
                <option value="CV">Cape Verde</option>
                <option value="KY">Cayman Islands</option>
                <option value="CF">Central African Republic</option>
                <option value="TD">Chad</option>
                <option value="CL">Chile</option>
                <option value="CN">China</option>
                <option value="CX">Christmas Island</option>
                <option value="CC">Cocos (Keeling) Islands</option>
                <option value="CO">Colombia</option>
                <option value="KM">Comoros</option>
                <option value="CG">Congo</option>
                <option value="CD">
                  Congo, Democratic Republic of the Congo
                </option>
                <option value="CK">Cook Islands</option>
                <option value="CR">Costa Rica</option>
                <option value="CI">Cote D'Ivoire</option>
                <option value="HR">Croatia</option>
                <option value="CU">Cuba</option>
                <option value="CW">Curacao</option>
                <option value="CY">Cyprus</option>
                <option value="CZ">Czech Republic</option>
                <option value="DK">Denmark</option>
                <option value="DJ">Djibouti</option>
                <option value="DM">Dominica</option>
                <option value="DO">Dominican Republic</option>
                <option value="EC">Ecuador</option>
                <option value="EG">Egypt</option>
                <option value="SV">El Salvador</option>
                <option value="GQ">Equatorial Guinea</option>
                <option value="ER">Eritrea</option>
                <option value="EE">Estonia</option>
                <option value="ET">Ethiopia</option>
                <option value="FK">Falkland Islands (Malvinas)</option>
                <option value="FO">Faroe Islands</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finland</option>
                <option value="FR">France</option>
                <option value="GF">French Guiana</option>
                <option value="PF">French Polynesia</option>
                <option value="TF">French Southern Territories</option>
                <option value="GA">Gabon</option>
                <option value="GM">Gambia</option>
                <option value="GE">Georgia</option>
                <option value="DE">Germany</option>
                <option value="GH">Ghana</option>
                <option value="GI">Gibraltar</option>
                <option value="GR">Greece</option>
                <option value="GL">Greenland</option>
                <option value="GD">Grenada</option>
                <option value="GP">Guadeloupe</option>
                <option value="GU">Guam</option>
                <option value="GT">Guatemala</option>
                <option value="GG">Guernsey</option>
                <option value="GN">Guinea</option>
                <option value="GW">Guinea-Bissau</option>
                <option value="GY">Guyana</option>
                <option value="HT">Haiti</option>
                <option value="HM">Heard Island and Mcdonald Islands</option>
                <option value="VA">Holy See (Vatican City State)</option>
                <option value="HN">Honduras</option>
                <option value="HK">Hong Kong</option>
                <option value="HU">Hungary</option>
                <option value="IS">Iceland</option>
                <option value="IN">India</option>
                <option value="ID">Indonesia</option>
                <option value="IR">Iran, Islamic Republic of</option>
                <option value="IQ">Iraq</option>
                <option value="IE">Ireland</option>
                <option value="IM">Isle of Man</option>
                <option value="IL">Israel</option>
                <option value="IT">Italy</option>
                <option value="JM">Jamaica</option>
                <option value="JP">Japan</option>
                <option value="JE">Jersey</option>
                <option value="JO">Jordan</option>
                <option value="KZ">Kazakhstan</option>
                <option value="KE">Kenya</option>
                <option value="KI">Kiribati</option>
                <option value="KP">
                  Korea, Democratic People's Republic of
                </option>
                <option value="KR">Korea, Republic of</option>
                <option value="XK">Kosovo</option>
                <option value="KW">Kuwait</option>
                <option value="KG">Kyrgyzstan</option>
                <option value="LA">Lao People's Democratic Republic</option>
                <option value="LV">Latvia</option>
                <option value="LB">Lebanon</option>
                <option value="LS">Lesotho</option>
                <option value="LR">Liberia</option>
                <option value="LY">Libyan Arab Jamahiriya</option>
                <option value="LI">Liechtenstein</option>
                <option value="LT">Lithuania</option>
                <option value="LU">Luxembourg</option>
                <option value="MO">Macao</option>
                <option value="MK">
                  Macedonia, the Former Yugoslav Republic of
                </option>
                <option value="MG">Madagascar</option>
                <option value="MW">Malawi</option>
                <option value="MY">Malaysia</option>
                <option value="MV">Maldives</option>
                <option value="ML">Mali</option>
                <option value="MT">Malta</option>
                <option value="MH">Marshall Islands</option>
                <option value="MQ">Martinique</option>
                <option value="MR">Mauritania</option>
                <option value="MU">Mauritius</option>
                <option value="YT">Mayotte</option>
                <option value="MX">Mexico</option>
                <option value="FM">Micronesia, Federated States of</option>
                <option value="MD">Moldova, Republic of</option>
                <option value="MC">Monaco</option>
                <option value="MN">Mongolia</option>
                <option value="ME">Montenegro</option>
                <option value="MS">Montserrat</option>
                <option value="MA">Morocco</option>
                <option value="MZ">Mozambique</option>
                <option value="MM">Myanmar</option>
                <option value="NA">Namibia</option>
                <option value="NR">Nauru</option>
                <option value="NP">Nepal</option>
                <option value="NL">Netherlands</option>
                <option value="AN">Netherlands Antilles</option>
                <option value="NC">New Caledonia</option>
                <option value="NZ">New Zealand</option>
                <option value="NI">Nicaragua</option>
                <option value="NE">Niger</option>
                <option value="NG">Nigeria</option>
                <option value="NU">Niue</option>
                <option value="NF">Norfolk Island</option>
                <option value="MP">Northern Mariana Islands</option>
                <option value="NO">Norway</option>
                <option value="OM">Oman</option>
                <option value="PK">Pakistan</option>
                <option value="PW">Palau</option>
                <option value="PS">Palestinian Territory, Occupied</option>
                <option value="PA">Panama</option>
                <option value="PG">Papua New Guinea</option>
                <option value="PY">Paraguay</option>
                <option value="PE">Peru</option>
                <option value="PH">Philippines</option>
                <option value="PN">Pitcairn</option>
                <option value="PL">Poland</option>
                <option value="PT">Portugal</option>
                <option value="PR">Puerto Rico</option>
                <option value="QA">Qatar</option>
                <option value="RE">Reunion</option>
                <option value="RO">Romania</option>
                <option value="RU">Russian Federation</option>
                <option value="RW">Rwanda</option>
                <option value="BL">Saint Barthelemy</option>
                <option value="SH">Saint Helena</option>
                <option value="KN">Saint Kitts and Nevis</option>
                <option value="LC">Saint Lucia</option>
                <option value="MF">Saint Martin</option>
                <option value="PM">Saint Pierre and Miquelon</option>
                <option value="VC">Saint Vincent and the Grenadines</option>
                <option value="WS">Samoa</option>
                <option value="SM">San Marino</option>
                <option value="ST">Sao Tome and Principe</option>
                <option value="SA">Saudi Arabia</option>
                <option value="SN">Senegal</option>
                <option value="RS">Serbia</option>
                <option value="CS">Serbia and Montenegro</option>
                <option value="SC">Seychelles</option>
                <option value="SL">Sierra Leone</option>
                <option value="SG">Singapore</option>
                <option value="SX">Sint Maarten</option>
                <option value="SK">Slovakia</option>
                <option value="SI">Slovenia</option>
                <option value="SB">Solomon Islands</option>
                <option value="SO">Somalia</option>
                <option value="ZA">South Africa</option>
                <option value="GS">
                  South Georgia and the South Sandwich Islands
                </option>
                <option value="SS">South Sudan</option>
                <option value="ES">Spain</option>
                <option value="LK">Sri Lanka</option>
                <option value="SD">Sudan</option>
                <option value="SR">Suriname</option>
                <option value="SJ">Svalbard and Jan Mayen</option>
                <option value="SZ">Swaziland</option>
                <option value="SE">Sweden</option>
                <option value="CH">Switzerland</option>
                <option value="SY">Syrian Arab Republic</option>
                <option value="TW">Taiwan, Province of China</option>
                <option value="TJ">Tajikistan</option>
                <option value="TZ">Tanzania, United Republic of</option>
                <option value="TH">Thailand</option>
                <option value="TL">Timor-Leste</option>
                <option value="TG">Togo</option>
                <option value="TK">Tokelau</option>
                <option value="TO">Tonga</option>
                <option value="TT">Trinidad and Tobago</option>
                <option value="TN">Tunisia</option>
                <option value="TR">Turkey</option>
                <option value="TM">Turkmenistan</option>
                <option value="TC">Turks and Caicos Islands</option>
                <option value="TV">Tuvalu</option>
                <option value="UG">Uganda</option>
                <option value="UA">Ukraine</option>
                <option value="AE">United Arab Emirates</option>
                <option value="GB">United Kingdom</option>
                <option value="US">United States</option>
                <option value="UM">United States Minor Outlying Islands</option>
                <option value="UY">Uruguay</option>
                <option value="UZ">Uzbekistan</option>
                <option value="VU">Vanuatu</option>
                <option value="VE">Venezuela</option>
                <option value="VN">Viet Nam</option>
                <option value="VG">Virgin Islands, British</option>
                <option value="VI">Virgin Islands, U.s.</option>
                <option value="WF">Wallis and Futuna</option>
                <option value="EH">Western Sahara</option>
                <option value="YE">Yemen</option>
                <option value="ZM">Zambia</option>
                <option value="ZW">Zimbabwe</option>
              </select>
              {selectedCountryText.length > 0 && (
                <div className={styles.Countries}>
                  {newSelectedCountryText.reverse().map((item, index) => {
                    return (
                      <div key={index} className={styles.country}>
                        <div>{`${item}`}</div>
                        <div
                          className={styles.close}
                          onClick={() => handleClose(index)}
                        >
                          <UilTimes size="20px" color="#fff" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : (
          ""
        )}

        <div className={styles.formGroup}>
          <div className={styles.GroupName}>Customer Limit</div>

          <div className={styles.inputWrapperCheckbox}>
            <input
              type="checkbox"
              name="limit"
              defaultChecked={limitChecked}
              onChange={(e) => setLimitChecked(!limitChecked)}
              className={styles.checkBox}
            />
            <label>Customer Limit</label>
          </div>
          {limitChecked ? (
            <div className={styles.inputWrapper}>
              <label>Set use limit</label>
              <input
                type="text"
                name="uselimit"
                placeholder="Enter limit"
                className={styles.formInput}
                value={limitValue}
                onChange={(e) => setLimitValue(e.target.value)}
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className={styles.submitWrapper}>
          <input
            type="submit"
            value="Create discount"
            className={styles.submitBtn}
          />
        </div>
      </form>
    </div>
  );
}

export default Home;
