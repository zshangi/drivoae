import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveVehicleUser, fetchVehicleUser, updateVehicleuserMain,delVehicleuser } from '../actions/userActions'
import { fetchMakes, fetchModels, fetchTrims } from '../actions/vehicleActions'
import { Row, Col } from 'react-bootstrap'
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet';



///////////////////////////////////////////////////////////////////////

const theme = createTheme();

export default function TermsScreen() {

  return (

        <Container fullwidth="true" >
         
      <Helmet>
        <meta charSet="utf-8" />
        <title>Drivo's Terms and Conditions</title>
        <meta name="description" content="Terms and Conditions" />
      </Helmet>
      <h1> TERMS & CONDITIONS FOR SALE OF TIRES & INSTALLATION SERVICES</h1>


                        <Box
            sx={{
              marginTop: 3,
              alignItems: 'left',
              textAlign: 'left'
            }}
          >
          
         
<h2>Definitions</h2>
<ul>

</ul>
<li>	<span className='textblue'>'Drivo.ae'</span> refers to Drivo Portal LLC, a company incorporated in [Location], UAE, with license number [License Number].</li>
<li>	<span className='textblue'>'Drivo.ae Site'</span> refers to the website accessible at http://www.Drivo.ae.</li>
<li>	<span className='textblue'>'Conditions'</span> refers to these terms and conditions for the sale of tires and tire installation services.</li>
<li>	<span className='textblue'>'Contract'</span> refers to the agreement for the purchase and sale of Goods, as evidenced by the Customer's Order and Order Confirmation.</li>
<li>	<span className='textblue'>'Customer'</span> refers to the individual whose offer for the Goods is accepted by Drivo.ae.</li>
<li>	<span className='textblue'>'Customer's Order'</span> refers to an order submitted by the Customer through the Drivo.ae Site.</li>
<li>	<span className='textblue'>'Sale'</span> refers to the service provided by Drivo.ae for the sale of tires and the subsequent arrangement for installation.</li>
<li>	<span className='textblue'>'Goods'</span> refers to the tires and services provided by Drivo.ae.</li>
<li>	<span className='textblue'>'Order Confirmation'</span> refers to the written confirmation by Drivo.ae of the acceptance of the Customer's Order.</li>
<li>	<span className='textblue'>'Writing'</span> includes electronic mail, facsimile transmission, and other comparable means of communication.</li>
<li>	<span className='textblue'>'Force Majeure'</span> refers to any unforeseeable circumstances that prevent a party from fulfilling a contract.</li>
<hr color='#61dafb'/>
<h2>1. Basis of the Sale</h2>
<p>1.1 Contract Formation
Drivo.ae shall sell and the Customer shall purchase the Goods in accordance with the Customer's Order and Order Confirmation, subject to these Conditions.
</p>1.2 Website Content
<p>The Customer acknowledges that the text, price lists, and other sales literature on the Drivo.ae Site are invitations to treat and not binding offers.
</p><p>1.3 Variation to Conditions
No variation to these Conditions shall be binding unless agreed in Writing between authorized representatives of the Customer and Drivo.ae.
</p><p>1.4 Representations
Drivo.ae's employees or agents are not authorized to make any representations concerning the Goods unless confirmed by Drivo.ae in Writing.
</p><p>1.5 Advice and Recommendations
Any advice or recommendation given by Drivo.ae or its employees or agents, which is not confirmed in Writing, is followed at the Customer's own risk.
</p><p>1.6 Errors and Omissions
Drivo.ae reserves the right to correct any typographical or other errors in any document without any liability.
</p>
<h2>2. Offers and Specifications</h2>
<p>2.1 Order Acceptance
The Customer's Order shall not be deemed accepted by Drivo.ae unless and until an Order Confirmation has been issued.
</p><p>2.2 Customer Responsibility
The Customer is responsible for ensuring the accuracy of the terms of the Customer's Order and for giving Drivo.ae any necessary information relating to the Goods in a timely manner.
</p><p>2.3 Goods Description
The quantity, quality, and description of the Goods shall be as set out in the Order Confirmation.
</p><p>2.4 Changes to Goods
Drivo.ae reserves the right to change the Goods, specifications, or prices at any time, without notice.
</p><p>2.5 Order Cancellation
The Customer may not cancel their Order after the Order Confirmation has been issued, except with the agreement in Writing of Drivo.ae and on terms that the Customer shall indemnify Drivo.ae in full against all loss.
</p><h2>3. Price of the Goods</h2>
<p>3.1 Pricing
The price of the Goods shall be as specified in the Order Confirmation or, where no price is quoted, as listed on the Drivo.ae Site at the time of the Order Confirmation.
</p><p>3.2 Price Changes
Drivo.ae reserves the right to increase the price of the Goods to reflect any increase in cost due to factors beyond Drivo.ae's control, any change requested by the Customer, or any delay caused by the Customer.
</p><p>3.3 VAT
All products and services priced on Drivo.ae include VAT where applicable.</p>
<h2>4. Terms of Payment</h2>
<p>4.1 Payment Timing
Payment for the Goods is due on the date of the Customer's Order, and Drivo.ae shall debit the Customer's credit/debit card on or after this date.
</p><p>4.2 Payment Obligation
The Customer is obliged to pay the price of the Goods on the date of the Order.
</p><p>4.3 Payment Failure
If the Customer fails to make payment, Drivo.ae shall be entitled to cancel the Contract, appropriate any payment made, and charge the Customer fees on unpaid amounts.
</p>
<h2>5. Delivery</h2>
<p>5.1 Delivery Method
Delivery of the Goods shall be made when the Goods are installed on the Customer's vehicle at the installation center specified in the Order Confirmation.
5.2 Delivery Timing
Any dates quoted for delivery are approximate and not guaranteed.
5.3 Failure to Take Delivery
If the Customer fails to take delivery, Drivo.ae may store the Goods, sell the Goods, or return the Goods to the supplier, charging the Customer for any costs incurred.
5.4 Proof of Delivery
Delivery shall be evidenced by the return of Drivo.ae's official packing/delivery note.
</p><h2>6. Risk and Property</h2>
<p>6.1 Risk Transfer
Risk of damage to or loss of the Goods shall pass to the Customer when the Customer is notified that the Goods have been installed and are ready for collection.
6.2 Title Transfer
Title to the Goods shall not pass to the Customer until all sums due have been paid in full.
6.3 Security Interest
The Customer shall not charge the Goods as security for any indebtedness.
</p><h2>7. Returns</h2>
<p>7.1 Return Policy
The Customer may return the Goods under certain conditions, as specified, and shall be responsible for the costs of returning the Goods.
7.2 Non-Returnable Items
Special promotion items, rare sizes, specialized tires, or race/track tires cannot be returned or refunded.
</p><h2>8. Liability</h2>
<p>8.1 Defects and Errors
Drivo.ae shall not be liable for any defects in the Goods arising from inaccuracies in the Customer's Order.
8.2 Limitations of Liability
Drivo.ae's liability is limited to the replacement or refund of defective Goods and shall not include any indirect or consequential losses.
8.3 Force Majeure
Drivo.ae shall not be liable for any failure to perform due to Force Majeure or other circumstances beyond its control.
</p><h2>9. General Terms</h2>
<p>9.1 Assignment
Drivo.ae may assign or subcontract its obligations under the Contract.
9.2 Notices
Any notices shall be in Writing and addressed to the registered office or principal place of business of the other party.
9.3 Governing Law
The Contract shall be governed by the laws of the United Arab Emirates.
9.4 Age Restrictions
Customers under the age of 18 are not permitted to use the Drivo.ae Site.
9.5 Severability
If any provision of these Conditions is held by any competent authority to be invalid or unenforceable in whole or in part, the validity of the other provisions of these Conditions and the remainder of the provision in question shall not be affected.
9.6 Waiver
No waiver by Drivo.ae of any breach of the Contract by the Customer shall be considered as a waiver of any subsequent breach of the same or any other provision.
9.7 Third-Party Rights
A person who is not a party to the Contract shall have no rights under or in connection with it.
9.8 Entire Agreement
These Conditions and any document expressly referred to in them represent the entire agreement between Drivo.ae and the Customer and supersede any prior agreement, understanding, or arrangement between Drivo.ae and the Customer, whether oral or in writing.
9.9 Amendments
Drivo.ae reserves the right to amend these Conditions at any time. Any amendments will be posted on the Drivo.ae Site, and it is the Customer's responsibility to review these Conditions regularly.
9.10 Dispute Resolution
Any disputes arising out of or in connection with the Contract shall be subject to the exclusive jurisdiction of the courts of the United Arab Emirates.
</p><hr/>
<h2>10. Contact Information</h2>
<p>For any questions or concerns regarding these Terms & Conditions, please contact:</p>
<p>Drivo Portal LLC</p>
<p>Address: </p>
<p>Email: Support@drivo.ae</p>
<p>Phone: 06 553 7006</p>


            </Box>
        
        </Container>

   );
}


