import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { graphqlOperation, API } from "aws-amplify";
import { createOutgoingData } from "../../graphql/mutations";
import { dataByTimestamp } from "../../graphql/queries";
import { CgLoadbarSound } from "react-icons/cg";
import { MdDateRange } from "react-icons/md";
import Loader from "../loader/loader";
import axios from "axios";
import Modal from "../modal/Modal";
import "./card.css";
export default function Card({
  title,
  reading,
  tempReading,
  temperature,
  unit,
  user,
  subscribed,
  setSubscribed,
  appsyncProp,
}) {
  const shadowUrl =
    "https://eq2jsbqej7.execute-api.us-east-1.amazonaws.com/dev/shadow";
  const initialTemp = tempReading;
  const [temp, setTemp] = useState(null);
  const [desiredTemp, setDesiredTemp] = useState(null);
  const [notSubscription, setNotSubscription] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [graphData, setGraphData] = useState(null);
  useEffect(() => {
    !desiredTemp && setTemp(initialTemp);
    setNotSubscription(false);
  }, [initialTemp, notSubscription]);

  const incrementTemp = () => {
    setTemp(temp === 65 ? 65 : temp + 1);
    setDesiredTemp(temp === 65 ? 65 : temp + 1);
  };

  const decrementTemp = () => {
    setTemp(temp === 1 ? 1 : temp - 1);
    setDesiredTemp(temp === 1 ? 1 : temp - 1);
  };

  const addOutGoingData = async () => {
    try {
      if (desiredTemp) {
        const updateShadow = await axios({
          method: "post",
          url: shadowUrl,
          params: {
            setTemp: desiredTemp,
            thingName: "test_mqtt",
          },
        });
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
        setTemp(initialTemp);
      }
    } catch (e) {
      return e;
    }
  };

  const updateShadow = async () => {
    try {
      const res = await axios({
        method: "post",
        url: shadowUrl,
        params: {
          currentTemp: initialTemp,
          setTemp: desiredTemp,
          thingName: "test_mqtt",
        },
      });
      setSubscribed(false);
    } catch (e) {
      return e;
    }
  };

  useEffect(() => {
    const timer =
      desiredTemp &&
      setInterval(() => {
        addOutGoingData();
      }, 5000);
    return () => clearTimeout(timer);
  }, [desiredTemp]);

  useEffect(() => {
    subscribed && updateShadow();
  }, [subscribed]);

  const fetchGraphData = async () => {
    const oneYearBeforeNow = new Date();
    oneYearBeforeNow.setFullYear(oneYearBeforeNow.getFullYear() - 1);
    try {
      const data = await API.graphql(
        graphqlOperation(dataByTimestamp, {
          deviceId: "test_mqtt",
          limit: 20,
          timestamp: {
            between: [oneYearBeforeNow.getTime(), new Date().getTime()],
          },
        })
      );
      setGraphData(data?.data.dataByTimestamp?.items);
      setShowModal(true);
    } catch (e) {
      return e;
    }
  };
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
              <IoIosArrowUp title='Increase Temp' />
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
              <IoIosArrowDown title='Decrease Temp' />
            </div>
          )}
        </div>
        <div className='bottom'>
          <CgLoadbarSound
            size={30}
            color={"#f57733"}
            cursor='pointer'
            title='Show Graph'
            onClick={() => fetchGraphData()}
          />
          <p className='unit'>{unit}</p>
        </div>
      </div>

      {showModal && (
        <Modal
          setShowModal={setShowModal}
          reading={reading}
          tempReading={tempReading}
          appsyncProp={appsyncProp}
          graphData={graphData}
        />
      )}
    </div>
  );
}
