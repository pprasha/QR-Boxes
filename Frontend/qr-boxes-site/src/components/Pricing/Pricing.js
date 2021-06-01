import React from 'react';
import {PricingTable, PricingSlot, PricingDetail} from 'react-pricing-table';
import { useHistory } from 'react-router-dom';
import "./Pricing.css"

function Pricing() {
  // constructor(props) {
  //   super(props);
  //   this.tooltipRef = React.createRef();
  // }

    // const {
    //   text,
    //   tooltipText,
    //   placement,
    //   textClass,
    //   tooltipClass,
    // } = this.props;
    const history = useHistory();

    const SignUp = () => {
      history.push("/signup");
    }

    return (
<PricingTable  highlightColor='#4CAF50'>
    <PricingSlot  buttonClass="pricing-button" onClick={SignUp} buttonText='SIGN UP' title='FREE' priceText='$0/month'>
        <PricingDetail> <b>15</b> boxes</PricingDetail>
        {/* <PricingDetail> <b>5 GB</b> storage</PricingDetail>
        <PricingDetail> <b>5</b> users</PricingDetail>
        <PricingDetail strikethrough> <b>Time tracking</b></PricingDetail> */}
    </PricingSlot>
    <PricingSlot buttonClass="pricing-button" highlighted onClick={SignUp} buttonText='SIGN UP' title='BASIC' priceText='$24/month'>
        <PricingDetail> <b>35</b> boxes</PricingDetail>
        {/* <PricingDetail> <b>15 GB</b> storage</PricingDetail>
        <PricingDetail> <b>Unlimited</b> users</PricingDetail>
        <PricingDetail> <b>Time tracking</b></PricingDetail> */}
    </PricingSlot>
    <PricingSlot  buttonClass="pricing-button" onClick={SignUp} buttonText='SIGN UP' title='PROFESSIONAL' priceText='$99/month'>
        <PricingDetail> <b>100</b> boxes</PricingDetail>
        {/* <PricingDetail> <b>30 GB</b> storage</PricingDetail>
        <PricingDetail> <b>Unlimited</b> users</PricingDetail>
        <PricingDetail> <b>Time tracking</b></PricingDetail> */}
    </PricingSlot>
    <PricingSlot  buttonClass="pricing-button" onClick={SignUp} buttonText='SIGN UP' title='ENTERPRISE' priceText='$200/month'>
        <PricingDetail> <b>Unlimited</b> boxes</PricingDetail>
        {/* <PricingDetail> <b>75 GB</b> storage</PricingDetail>
        <PricingDetail> <b>Unlimited</b> users</PricingDetail>
        <PricingDetail> <b>Time tracking</b></PricingDetail> */}
    </PricingSlot>
</PricingTable>
    );
}

export default Pricing;