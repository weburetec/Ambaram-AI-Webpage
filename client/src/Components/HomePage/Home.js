import React, { useEffect, useState } from "react";
import "../Css_Files/home.scss";
import Select from "react-select";
import Cards from "../ReUseableCards/Cards";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getOneData } from "../../Redux/Actions/priceAction";
import getStripe from "./getstripe";

const Home = () => {
  const [teamSize, setTeamSize] = useState(3);
  const [monthlyYearly, setMonthlyYearly] = useState("Yearly");
  const dispatch = useDispatch();
  const { getPrice } = useSelector((s) => s.priceReducer);

  useEffect(() => {
    dispatch(getOneData("63f5c489f130d24050545c4a"));
  }, []);

  const options = [
    { value: "3", label: "3 Seats" },
    { value: "5", label: "5 Seats" },
    { value: "10", label: "10 Seats" },
    { value: "15", label: "15 Seats" },
    { value: "20", label: "20 Seats" },
    { value: "25", label: "25 Seats" },
    { value: "30", label: "30 Seats" },
    { value: "35", label: "35 Seats" },
    { value: "40", label: "40 Seats" },
    { value: "45", label: "45 Seats" },
    { value: "50", label: "50 Seats" },
  ];

  async function handleCheckout() {
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout({
      lineItems: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      successUrl: `http://localhost:3000/success`,
      cancelUrl: `http://localhost:3000/cancel`,
      customerEmail: 'customer@email.com',
    });
    console.warn(error.message);
  }

  return (
    <div>
      <div className="topHeading">
        <img
          className="banner"
          src={process.env.PUBLIC_URL + "https://www.ambaram.ai/wp-content/uploads/2022/03/ambaram-header.jpg"}
          alt="banner image"
        />


        <div class="elementor-shape elementor-shape-bottom" data-negative="false">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 100" preserveAspectRatio="none">
            <path class="elementor-shape-fill" opacity="0.33" d="M473,67.3c-203.9,88.3-263.1-34-320.3,0C66,119.1,0,59.7,0,59.7V0h1000v59.7 c0,0-62.1,26.1-94.9,29.3c-32.8,3.3-62.8-12.3-75.8-22.1C806,49.6,745.3,8.7,694.9,4.7S492.4,59,473,67.3z"></path>
            <path class="elementor-shape-fill" opacity="0.66" d="M734,67.3c-45.5,0-77.2-23.2-129.1-39.1c-28.6-8.7-150.3-10.1-254,39.1 s-91.7-34.4-149.2,0C115.7,118.3,0,39.8,0,39.8V0h1000v36.5c0,0-28.2-18.5-92.1-18.5C810.2,18.1,775.7,67.3,734,67.3z"></path>
            <path class="elementor-shape-fill" d="M766.1,28.9c-200-57.5-266,65.5-395.1,19.5C242,1.8,242,5.4,184.8,20.6C128,35.8,132.3,44.9,89.9,52.5C28.6,63.7,0,0,0,0 h1000c0,0-9.9,40.9-83.6,48.1S829.6,47,766.1,28.9z"></path>
          </svg>		
        </div>
        <div>
          <h1 class="pt-155">
            A visual tool for collaboration and tracking work in one place <br/> Start
            for <span className="tagColor">free</span>.
          </h1>
        </div>  
        <p>Unlimited boards and workflows. No credit card needed.</p>
        <div className="getStartedBtnInHeading">
          <p>{`GET STARTED`}</p>
        </div>
      </div>
      <div className="daynmikButtons">
        <div className="dropDown">
          <label>Choose team size : </label>
          <Select
            options={options}
            name="purchaseOrderId"
            className="select"
            placeholder="Choose Seats"
            onChange={(val) => {
              setTeamSize("");
              setTeamSize(val.value);
            }}
          />
        </div>
        <div className="yearlyStyle">
          <p onClick={() => setMonthlyYearly("Yearly")}>Yearly| </p>
          <p onClick={() => setMonthlyYearly("Monthly")}>  Monthly</p>
        </div>
      </div>
      <div className="cards">
        <Cards
          color="#68df23"
          fontColor="#323338"
          heading="Individual"
          price={getPrice.individual}
          SubHeading="Individual plan"
          priceMonth="Up to 2 seats"
          features={getPrice.individualFeature}
        />
        <Cards
          color="#fd7e3b"
          heading="Basic"
          price={monthlyYearly === "Yearly" ? getPrice.basic : 10}
          SubHeading="Individual plus"
          priceMonth={`Total $${
            monthlyYearly === "Yearly"
              ? getPrice.basic * teamSize
              : 10 * teamSize
          } / month`}
          features={getPrice.basicFeature}
        />
        <Cards
          color="#f17074"
          heading="Standard"
          price={monthlyYearly === "Yearly" ? getPrice.standard : 12}
          SubHeading="Basic +"
          priceMonth={`Total $${
            monthlyYearly === "Yearly"
              ? getPrice.standard * teamSize
              : 12 * teamSize
          } / month`}
          features={getPrice.standardFeature}
        />
        <Cards
          color="#2774c6"
          heading="Pro"
          price={monthlyYearly === "Yearly" ? getPrice.pro : 20}
          SubHeading="Standard +"
          priceMonth={`Total $${
            monthlyYearly === "Yearly" ? getPrice.pro * teamSize : 20 * teamSize
          } / month`}
          features={getPrice.proFeature}
        />
        <Cards
          color="#527fff"
          heading="Enterprise"
          SubHeading="Pro +"
          features={getPrice.enterpriseFeature}
          text={getPrice.enterprise}
        />
      </div>

      <div className="featureList">
        <div className="listHeading">
          <h1>Complete features list</h1>
          <div>
            {/* <MdExpandLess size={50} color="#080808" /> */}
            <MdExpandMore size={50} color="#6161ff" />
          </div>
        </div>
        <div className="TableHeading">
          <div><h4>Features</h4></div>
          <div>
            <h4 style={{ color: "#68df23", textAlign:"center" }}>Individual</h4>
            <button className="tryFreebtn p-5" style={{justifyContent:"center"}} onClick={handleCheckout}>Checkout</button>
          </div>
          <div>
            <h4 style={{ color: "#fd7e3b" }}>Basic</h4>
            <button className="tryFreebtn">Try for free</button>
          </div>
          <div>
            <h4 style={{ color: "#f17074" }}>Standard</h4>
            <button className="tryFreebtn">Try for free</button>
          </div>
          <div>
            <h4 style={{ color: "#2774c6" }}>Pro</h4>
            <button className="tryFreebtn">Try for free</button>
          </div>
          <div>
            <h4 style={{ color: "#527fff" }}>Enterprise</h4>
            <button className="tryFreebtn">Contact us</button>
          </div>
        </div>
        
        <div className="CompletefeaturesList">
          <div className="essentials">
            <h2>Plan</h2>
          </div>
          <div>
            <div className="TableHeading">
              <div className="essentialsHead">
                <div class="leading-4 text-left">
                  <p>Plan Type</p>
                  <p>Maximum number of seats</p>
                  <p>Company Details</p>
                  <p>Email Setting</p>                  
                  <p>Notifications - Web</p>
                  <p>Notifications - Email</p>
                  <p>Role & Permission</p>                  
                  <p>Help & Support</p>
                  <p>Personal information</p>
                </div>
                <div class="leading-3">
                  <div>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  </div>
                </div>
              </div>
              <div>
                <p>features={getPrice.individualPlanFeature}</p>
              </div>
              <div>
                <p>features={getPrice.basicPlanFeature}</p>
              </div>
              <div>
                features={getPrice.standardPlanFeature}
              </div>
              <div>
                features={getPrice.proPlanFeature}
              </div>
              <div>
                features={getPrice.enterprisePlanFeature}
              </div>
            </div>
          </div>
        </div>

        <div className="CompletefeaturesList">
          <div className="essentials">
            <h2>Teams</h2>
          </div>
          <div>
            <div className="TableHeading">
              <div className="essentialsHead">
                <div class="leading-4 text-left">
                  <p>Create Team/ New Team </p>
                  <p>Add Team Member</p>
                  <p>Edit Team Info</p>
                  <p>Delete Team</p>                  
                  <p>Delete Team Member</p>
                  <p>Block Team Member</p>
                  <p>Team Member Email</p>                  
                  <p>Team Member Chat</p>
                  <p>Team Member Guest</p>
                </div>
                <div>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                </div>
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
            </div>
          </div>
        </div>

        <div className="CompletefeaturesList">
          <div className="essentials">
            <h2>Wall</h2>
          </div>
          <div>
            <div className="TableHeading">
              <div className="essentialsHead">
                <div class="leading-4 text-left">
                  <p>Choose you Team</p>
                  <p>Work in Progress</p>
                  <p>Reminder Self</p>
                  <p>Reminder Self</p>                  
                  <p>Product Collection</p>
                  <p>Product Collection Live</p>
                  <p>Filters</p>                  
                  <p>Product Folder</p>
                  <p>Product Bookmark</p>
                  <p>Product Share</p>                  
                  <p>Product Edit</p>
                  <p>Product Delete</p>
                  <p>Product Share a Link</p>                  
                  <p>Product Duplicate</p>
                  <p>Email Notification Before Delete</p>
                </div>
                <div>
                <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                </div>
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
            </div>
          </div>
        </div>

        <div className="CompletefeaturesList">
          <div className="essentials">
            <h2>Teams</h2>
          </div>
          <div>
            <div className="TableHeading">
              <div className="essentialsHead">
                <div class="leading-4 text-left">
                  <p>Create Team/ New Team </p>
                  <p>Add Team Member</p>
                  <p>Edit Team Info</p>
                  <p>Delete Team</p>                  
                  <p>Delete Team Member</p>
                  <p>Block Team Member</p>
                  <p>Team Member Email</p>                  
                  <p>Team Member Chat</p>
                  <p>Team Member Guest</p>
                </div>
                <div>
                <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                    <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                </div>
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
            </div>
          </div>
        </div>

        <div className="CompletefeaturesList">
          <div className="essentials">
            <h2>Create Product</h2>
          </div>
          <div>
            <div className="TableHeading">
              <div className="essentialsHead">
                <div class="leading-4 text-left">
                  <p>Choose Team</p>
                  <p>Unlimited Product upload</p>
                  <p>Unlimited File upload</p>
                  <p>Unlimited File upload</p>                  
                  <p>Unlimited Folder upload</p>
                  <p>Title</p>
                  <p>Description</p>                  
                  <p>Choose Deadline</p>
                  <p>Select or Add Tags</p>
                  <p>Select Category</p>
                  <p>Select Sub-category</p>
                  <p>Select Fabric Name</p>
                  <p>Price</p>                  
                  <p>Select Type of Wash</p>
                  <p>Machine Wash</p>
                  <p>Hand Wash</p>                  
                  <p>Select Pantone Colour</p>
                  <p>Select Season</p>
                  <p>File Storage</p>
                </div>
                <div>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                </div>
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
            </div>
          </div>
        </div>
         
        <div className="CompletefeaturesList">
          <div className="essentials">
            <h2>Manage</h2>
          </div>
          <div>
            <div className="TableHeading">
              <div className="essentialsHead">
                <div class="leading-4 text-left">
                  <p>Manage Season</p>
                  <p>Manage Tags</p>
                  <p>Manage Categories</p>
                  <p>Manage Fabrics</p>                  
                  <p>Color Library</p>
                </div>
                <div>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                </div>
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
            </div>
          </div>
        </div>
         
        <div className="CompletefeaturesList">
          <div className="essentials">
            <h2>Dashboard Support</h2>
          </div>
          <div>
            <div className="TableHeading">
              <div className="essentialsHead">
                <div class="leading-4 text-left">
                  <p>Dashboard</p>
                  <p>Self Serve knowledge base</p>
                  <p>24/7 customer support</p>
                  <p>Daily Live Webinars</p>                  
                  <p>99.9% uptime SLA</p>
                  <p>Dedicated customer success manager</p>
                </div>
                <div>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                  <p><AiOutlineInfoCircle size={16} color="gray" /></p>
                </div>
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
              <div>
                features={getPrice.individualPlanFeature}
              </div>
            </div>
          </div>
        </div>         

      </div>
    </div>
  );
};

export default Home;
