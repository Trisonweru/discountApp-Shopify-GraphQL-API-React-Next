import { useState } from "react";
import styles from "./Home.module.css";

function Home() {
  const [discountSelected, setDiscountSelected] = useState("percentage");
  const [periodChecked, setPeriodChecked] = useState(true);
  const [regionChecked, setRegionChecked] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(false);
  const [startsAt, setStartsAt] = useState();
  const [endsAt, setEndssAt] = useState();
  const [countriesSelected, setCountriesSelected] = useState([]);
  const [selectedCountryText, setSelectedCountryText] = useState([]);
  const [limitChecked, setLimitChecked] = useState(false);
  const [handle, setHandle] = useState();
  const [name, setName] = useState();
  const [code, setCode] = useState();
  const [discountValue, setDiscountValue] = useState(false);
  return (
    <div className={styles.HomeContainer}>
      <form>
        <div className={styles.formGroup}>
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
          <div className={styles.inputWrapper}>
            <label>
              {discountSelected === "percentage"
                ? "Percentage Discount"
                : discountSelected === "buyxgety"
                ? "Buy Amount"
                : discountSelected === "dollarAmount"
                ? "Discount Amount"
                : discountSelected === "minimumAmount"
                ? "Minimum Amount"
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
                  className={styles.formInputDate}
                  onChange={(e) => setStartsAt(e.target.value)}
                />
              </div>
              <div>
                <label>Ends At</label>
                <input
                  type="date"
                  name="amount"
                  placeholder="Value"
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
            defaultChecked={regionChecked}
            onChange={(e) => setRegionChecked(!regionChecked)}
            className={styles.checkBox}
          />
          <label>Region Specific</label>
        </div>
        {regionChecked ? (
          <div className={styles.inputWrapper}>
            <label>Select regions</label>
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
              <div className={styles.Countries}>
                {selectedCountryText.map((item, index) => {
                  return <span key={index}>{`${item}, `}</span>;
                })}
              </div>
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

// import React, { useState, useCallback } from "react";
// import {
//   Heading,
//   Page,
//   FormLayout,
//   TextField,
//   Button,
//   Form,
// } from "@shopify/polaris";
// import gql from "graphql-tag";
// import { useMutation } from "react-apollo";
// import { useRouter } from "next/router";

// const Index = () => {
//   const [title, setTitle] = useState("Hello");
//   const [starts, setStarts] = useState("2021-08-17");
//   const [ends, setEnds] = useState("2021-08-17");
//   const [limit, setLimit] = useState("10");
//   const [value, setValue] = useState("0.1");
//   const [code, setCode] = useState("Discount2021");

//   const router = useRouter();

//   const discountQuery = gql`
//     mutation {
//       discountCodeBasicCreate(
//         basicCodeDiscount: {
//           title: "${title}"
//           startsAt: "${starts}"
//           endsAt: "${ends}"
//           usageLimit: ${parseInt(limit)}
//           appliesOncePerCustomer: true
//           customerSelection: { all: true }
//           code: "${code}"
//           customerGets: {
//             value: {
//               percentage:${value}
//             }
//             items: { all: true }
//           }
//         }
//       ) {
//         userErrors {
//           field
//           message
//           code
//         }
//         codeDiscountNode {
//           id
//           codeDiscount {
//             ... on DiscountCodeBasic {
//               title
//               summary
//               status
//               codes(first: 10) {
//                 edges {
//                   node {
//                     code
//                   }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   `;
//   const handleTitleChange = useCallback((value) => setTitle(value), []);
//   const handleStartsChange = useCallback((value) => setStarts(value), []);
//   const handleEndsChange = useCallback((value) => setEnds(value), []);
//   const handleLimitChange = useCallback((value) => setLimit(value), []);
//   const handleCodeChange = useCallback((value) => setCode(value), []);
//   const handleValueChange = useCallback((value) => setValue(value), []);
//   const [
//     handleSubmit,
//     { data, loading, error, called },
//   ] = useMutation(discountQuery, { errorPolicy: "none" });
//   if (loading) {
//     return <div>Loading</div>;
//   }
//   if (error) {
//     console.log(error.message);
//   }
//   let payload = { title: title, code: code };
//   if (data) {
//     fetch("http://127.0.0.1:5000/", {
//       method: "POST",
//       body: JSON.stringify(payload),
//       header: {
//         "Content-Type": "application/json",
//       },
//     })
//       .then((res) => {
//         res.text;
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   }

//   return (
//     <Page>
//       <Heading>Create a discount code</Heading>

//       <Form noValidate onSubmit={handleSubmit}>
//         <FormLayout>
//           <TextField
//             value={title}
//             onChange={handleTitleChange}
//             label="Title"
//             type="text"
//           />
//           <TextField
//             label="Starts at"
//             onChange={handleStartsChange}
//             value={starts}
//             type="text"
//           />
//           <TextField
//             label="Ends at"
//             onChange={handleEndsChange}
//             value={ends}
//             type="text"
//           />
//           <TextField
//             label="User limit"
//             onChange={handleLimitChange}
//             value={limit}
//             type="text"
//           />
//           <TextField
//             label="Discount Code"
//             onChange={handleCodeChange}
//             value={code}
//             type="text"
//           />
//           <TextField
//             label="Enter percentage value"
//             value={value}
//             onChange={handleValueChange}
//             type="text"
//           />

//           <Button submit>Submit</Button>
//         </FormLayout>
//       </Form>

//       <Heading style="margin-top:20px">Reports</Heading>
//     </Page>
//   );
// };

// export default Index;
