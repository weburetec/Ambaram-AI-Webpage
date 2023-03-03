import React, { useEffect, useState } from "react";
import "../Css_Files/edit.scss";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import Input from "../../controls/input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOneData, updatePrice } from "../../Redux/Actions/priceAction";
import { AiFillPlusCircle } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { BsDot } from "react-icons/bs";

const Edit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { getPrice } = useSelector((s) => s.priceReducer);

  const [individualFeatureInput, setIndividualFeatureInput] = useState("");
  const [individualFeatureList, setIndividualFeatureList] = useState([]);

  const [individualPlanFeatureInput, setIndividualPlanFeatureInput] = useState("");
  const [individualPlanFeatureList, setIndividualPlanFeatureList] = useState([]);

  const [basicFeatureInput, setBasicFeatureInput] = useState("");
  const [basicFeatureList, setBasicFeatureList] = useState([]);

  const [basicPlanFeatureInput, setBasicPlanFeatureInput] = useState("");
  const [basicPlanFeatureList, setBasicPlanFeatureList] = useState([]);  

  const [standardFeatureInput, setStandardFeatureInput] = useState("");
  const [standardFeatureList, setStandardFeatureList] = useState([]);

  const [standardPlanFeatureInput, setStandardPlanFeatureInput] = useState("");
  const [standardPlanFeatureList, setStandardPlanFeatureList] = useState([]);  

  const [proFeatureInput, setProFeatureInput] = useState("");
  const [proFeatureList, setProFeatureList] = useState([]);

  const [proPlanFeatureInput, setProPlanFeatureInput] = useState("");
  const [proPlanFeatureList, setProPlanFeatureList] = useState([]);

  const [enterpriseFeatureInput, setEnterpriseFeatureInput] = useState("");
  const [enterpriseFeatureList, setEnterpriseFeatureList] = useState([]);

  const [enterprisePlanFeatureInput, setEnterprisePlanFeatureInput] = useState("");
  const [enterprisePlanFeatureList, setEnterprisePlanFeatureList] = useState([]);

  useEffect(() => {
    dispatch(getOneData("63f5c489f130d24050545c4a"));
  }, []);

  useEffect(()=>{
     setIndividualFeatureList(getPrice.individualFeature);
     setIndividualPlanFeatureList(getPrice.individualPlanFeature);
     setBasicFeatureList(getPrice.basicFeature);
     setBasicPlanFeatureList(getPrice.basicPlanFeature);
     setStandardFeatureList(getPrice.standardFeature);
     setStandardPlanFeatureList(getPrice.standardPlanFeature);
     setProFeatureList(getPrice.proFeature);
     setProPlanFeatureList(getPrice.proPlanFeature);
     setEnterpriseFeatureList(getPrice.enterpriseFeature);
     setEnterprisePlanFeatureList(getPrice.enterprisePlanFeature);
    },[getPrice])

  //validation
  const signInValidationSchema = Yup.object().shape({
    basic: Yup.number()
      .required("Basic price is Required")
      .positive("Must be Positive"),
    standard: Yup.number()
      .required("Standard price is Required")
      .positive("Must be Positive"),
    pro: Yup.number()
      .required("Pro price is Required")
      .positive("Must be Positive"),
    individual: Yup.number()
      .required("Individual price is Required"),
    enterprise: Yup.string().required("Enterprise is Required"),  
  });

  //formhandler
  const signInHandler = async (values) => {
    let obj = {
      basic: values.basic,
      standard: values.standard,
      pro: values.pro,
      enterprise: values.enterprise,
      individual: values.individual,
      individualFeature: individualFeatureList,
      individualPlanFeature:individualPlanFeatureList,
      basicFeature: basicFeatureList,
      basicPlanFeature: basicPlanFeatureList,
      standardFeature: standardFeatureList,
      standardPlanFeature: standardPlanFeatureList,
      proFeature: proFeatureList,
      proPlanFeature: proPlanFeatureList,
      enterpriseFeature: enterpriseFeatureList,
      enterprisePlanFeature: enterprisePlanFeatureList,
    };
    dispatch(updatePrice({ obj, navigate }));
  };

  const handleAdd = (setList, featureList, setInput, featureInput) => {
    if (featureInput === "") {
      return;
    }
    setList([...featureList, featureInput]);
    setInput("");
  };

  const handleDelete = (id, featureList, setList) => {
    let Filter = featureList.filter((e, i) => i !== id);
    setList(Filter);
  };

  return (
    <>
      <div className="editPage">
        <Formik
          initialValues={{
            individual: getPrice.individual,
            basic: getPrice.basic,
            standard: getPrice.standard,
            pro: getPrice.pro,
            enterprise: getPrice.enterprise,
          }}
          onSubmit={signInHandler}
          validationSchema={signInValidationSchema}
          enableReinitialize
        >
          {({
            handleChange,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            handleBlur,
            setFieldValue,
          }) => (
            <Form onSubmit={handleSubmit} autoComplete="off">
              <div className="formContainer">
                <div className="form">
                  <p className="batch">Individual</p>
                  <Input
                    label="Individual Price"
                    name="individual"
                    value={values.individual}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />

                  <div className="features">
                    <Input
                      label="Individual plan includes:"
                      name="Individual"
                      type="text"
                      onChange={(e) =>
                        setIndividualFeatureInput(e.target.value)
                      }
                      onBlur={handleBlur}
                    />

                    <div>
                      <AiFillPlusCircle
                        onClick={() =>
                          handleAdd(
                            setIndividualFeatureList,
                            individualFeatureList,
                            setIndividualFeatureInput,
                            individualFeatureInput
                          )
                        }
                        size={35}
                      />
                    </div>
                  </div>
                  {individualFeatureList?.map((e, i) => (
                    <div key={i} className="tags">
                      <div className="tags">
                        <div>
                          <BsDot size={20} />
                        </div>

                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever
                          onClick={() =>
                            handleDelete(
                              i,
                              individualFeatureList,
                              setIndividualFeatureList
                            )
                          }
                          size={20}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter plan features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter team features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter wall features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                  
                  <div className="features">
                    <Input label="Enter file features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter product features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter manage features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter dashboard features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                   
                </div>

                <div className="form">
                  <p className="batch">Basic</p>

                  <Input
                    label="Basic Price"
                    name="basic"
                    value={values.basic}
                    type="number"
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="features">
                    <Input
                      label="Includes Individual, plus:"
                      name="basicFeature"
                      type="text"
                      onChange={(e) => setBasicFeatureInput(e.target.value)}
                      onBlur={handleBlur}
                    />

                    <div>
                      <AiFillPlusCircle
                        onClick={() =>
                          handleAdd(
                            setBasicFeatureList,
                            basicFeatureList,
                            setBasicFeatureInput,
                            basicFeatureInput
                          )
                        }
                        size={35}
                      />
                    </div>
                  </div>
                  {basicFeatureList?.map((e, i) => (
                    <div key={i} className="tags">
                      <div className="tags">
                        <div>
                          <BsDot size={20} />
                        </div>

                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever
                          onClick={() =>
                            handleDelete(
                              i,
                              basicFeatureList,
                              setBasicFeatureList
                            )
                          }
                          size={20}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter plan features here:" name="Individual" type="text" onChange={(e) => setBasicPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setBasicPlanFeatureList, basicPlanFeatureList, setBasicPlanFeatureInput, basicPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {basicPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, basicPlanFeatureList, setBasicPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter team features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter wall features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                  
                  <div className="features">
                    <Input label="Enter file features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter product features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter manage features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter dashboard features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                   
                </div>

                <div className="form">
                  <p className="batch">Standard</p>

                  <Input
                    label="Standard Price"
                    name="standard"
                    type="number"
                    value={values.standard}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="features">
                    <Input
                      label="Includes Basic, plus:"
                      name="standardFeature"
                      type="text"
                      onChange={(e) => setStandardFeatureInput(e.target.value)}
                      onBlur={handleBlur}
                    />

                    <div>
                      <AiFillPlusCircle
                        onClick={() =>
                          handleAdd(
                            setStandardFeatureList,
                            standardFeatureList,
                            setStandardFeatureInput,
                            standardFeatureInput
                          )
                        }
                        size={35}
                      />
                    </div>
                  </div>
                  {standardFeatureList?.map((e, i) => (
                    <div key={i} className="tags">
                      <div className="tags">
                        <div>
                          <BsDot size={20} />
                        </div>

                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever
                          onClick={() =>
                            handleDelete(
                              i,
                              standardFeatureList,
                              setStandardFeatureList
                            )
                          }
                          size={20}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter plan features here:" name="Individual" type="text" onChange={(e) => setStandardPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setStandardPlanFeatureList, standardPlanFeatureList, setStandardPlanFeatureInput, standardPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {standardPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, standardPlanFeatureList, setStandardPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter team features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter wall features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                  
                  <div className="features">
                    <Input label="Enter file features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter product features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter manage features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter dashboard features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                   
                </div>
              </div>

              <div className="formContainer">
                <div className="form">
                  <p className="batch">Pro</p>
                  <Input
                    label="Pro Price"
                    name="pro"
                    type="number"
                    value={values.pro}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="features">
                    <Input
                      label="Includes Standard, plus:"
                      name="proFeature"
                      type="text"
                      onChange={(e) => setProFeatureInput(e.target.value)}
                      onBlur={handleBlur}
                    />

                    <div>
                      <AiFillPlusCircle
                        onClick={() =>
                          handleAdd(
                            setProFeatureList,
                            proFeatureList,
                            setProFeatureInput,
                            proFeatureInput
                          )
                        }
                        size={35}
                      />
                    </div>
                  </div>
                  {proFeatureList?.map((e, i) => (
                    <div key={i} className="tags">
                      <div className="tags">
                        <div>
                          <BsDot size={20} />
                        </div>

                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever
                          onClick={() =>
                            handleDelete(i, proFeatureList, setProFeatureList)
                          }
                          size={20}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter plan features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter team features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter wall features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                  
                  <div className="features">
                    <Input label="Enter file features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter product features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter manage features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter dashboard features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                   
                </div>

                <div className="form">
                  <p className="batch">Enterprise</p>
                  <Input
                    label="Enterprise Price"
                    name="enterprise"
                    type="text"
                    value={values.enterprise}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <div className="features">
                    <Input
                      label="Includes Pro, plus:"
                      name="enterpriseFeature"
                      type="text"
                      onChange={(e) =>
                        setEnterpriseFeatureInput(e.target.value)
                      }
                      onBlur={handleBlur}
                    />

                    <div>
                      <AiFillPlusCircle
                        onClick={() =>
                          handleAdd(
                            setEnterpriseFeatureList,
                            enterpriseFeatureList,
                            setEnterpriseFeatureInput,
                            enterpriseFeatureInput
                          )
                        }
                        size={35}
                      />
                    </div>
                  </div>
                  {enterpriseFeatureList?.map((e, i) => (
                    <div key={i} className="tags">
                      <div className="tags">
                        <div>
                          <BsDot size={20} />
                        </div>

                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever
                          onClick={() =>
                            handleDelete(
                              i,
                              enterpriseFeatureList,
                              setEnterpriseFeatureList
                            )
                          }
                          size={20}
                        />
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter plan features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter team features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter wall features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                  
                  <div className="features">
                    <Input label="Enter file features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}
                  <div className="features">
                    <Input label="Enter product features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter manage features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}   
                  <div className="features">
                    <Input label="Enter dashboard features here:" name="Individual" type="text" onChange={(e) => setIndividualPlanFeatureInput(e.target.value)} onBlur={handleBlur}/>                  
                    <div>
                      <AiFillPlusCircle onClick={() => handleAdd(setIndividualPlanFeatureList, individualPlanFeatureList, setIndividualPlanFeatureInput, individualPlanFeatureInput)} size={35}/>
                    </div>
                  </div>
                    {individualPlanFeatureList?.map((e, i) => (<div key={i} className="tags">
                      <div className="tags">
                        <div><BsDot size={20}/></div>
                        <p>{e}</p>
                      </div>
                      <div>
                        <MdDeleteForever onClick={() => handleDelete(i, individualPlanFeatureList, setIndividualPlanFeatureList)} size={20}/>
                      </div>
                    </div>
                  ))}                   
                </div>
              </div>
              <div className="formContainer">
                <button className="submit" onClick={handleSubmit}>
                  Update Prices
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Edit;
