import React, { useState, useEffect } from "react";
import "./card.css";
import { graphqlOperation, API } from "aws-amplify";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CgLoadbarSound } from "react-icons/cg";
import { MdDateRange } from "react-icons/md";
import { createOutgoingData } from "../../graphql/mutations";
import Loader from "../loader/loader";
import axios from "axios";
export default function Card({
  title,
  reading,
  tempReading,
  temperature,
  unit,
  user,
  subscribed,
  setSubscribed,
}) {
  const initialTemp = tempReading;
  const [temp, setTemp] = useState(null);
  const [desiredTemp, setDesiredTemp] = useState(null);
  const [notSubscription, setNotSubscription] = useState(false);

  useEffect(() => {
    setTemp(initialTemp);
    setNotSubscription(false);
  }, [initialTemp, notSubscription]);

  const incrementTemp = () => {
    setTemp(temp + 1);
    setDesiredTemp(temp + 1);
  };

  const decrementTemp = () => {
    setTemp(temp - 1);
    setDesiredTemp(temp - 1);
  };

  const addOutGoingData = async () => {
    setDesiredTemp(null);
    try {
      if (desiredTemp) {
        const res = await API.graphql(
          graphqlOperation(createOutgoingData, {
            input: {
              deviceId: "test_mqtt",
              deviceType: "Water Heater",
              timestamp: new Date().getTime(),
              clientId: user?.attributes?.sub,
              payload: {
                setTemp: desiredTemp,
              },
            },
          })
        );
        setSubscribed(false);
        setDesiredTemp(null);
        console.log("res out", res);
      }
    } catch (e) {
      console.log("e", e);
    }
  };

  const updateShadow = async () => {
    try {
      const res = await axios({
        method: "post",
        url: "https://eq2jsbqej7.execute-api.us-east-1.amazonaws.com/dev/shadow",
        params: {
          temperature: temp,
          thingName: "test_mqtt",
        },
      });
      console.log("res", res);
      setSubscribed(false);
    } catch (e) {
      console.log("e", e);
    }
  };

  useEffect(() => {
    subscribed && desiredTemp && addOutGoingData();
  }, [subscribed]);

  useEffect(() => {
    subscribed && updateShadow();
  }, [subscribed]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!subscribed) {
        setNotSubscription(true);
      }
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <div className='card'>
        <div className='title'>
          <h2>{title}</h2>
          {temperature && (
            <MdDateRange color='#f57733' size='20' cursor='pointer' />
          )}
        </div>
        <div className='cardContent'>
          {temperature && (
            <div className='arrow' onClick={incrementTemp}>
              <IoIosArrowUp />
            </div>
          )}
          <div>
            {!reading && !tempReading ? (
              <Loader width='30' height='30' color='#f57733' />
            ) : (
              <p className='reading'>{temperature ? temp : reading}</p>
            )}
          </div>
          {temperature && (
            <div className='arrow' onClick={decrementTemp}>
              <IoIosArrowDown />
            </div>
          )}
        </div>
        <div className='bottom'>
          <CgLoadbarSound size={30} color={"#f57733"} />
          <p className='unit'>{unit}</p>
        </div>
      </div>
    </div>
  );
}
