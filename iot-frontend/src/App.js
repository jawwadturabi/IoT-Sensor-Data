import "./app.css";
import React, { useState, useEffect } from "react";
import Amplify, { graphqlOperation, API, Auth } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { onCreateIncomingData } from "./graphql/subscriptions";
import { listIncomingDatas } from "./graphql/queries";
import awsmobile from "./aws-exports";
import Header from "./components/header/Header";
import Card from "./components/card/Card";
import Container from "./components/container/Container";
Amplify.configure(awsmobile);
function App() {
  const [data, setData] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [subscribed, setSubscribed] = useState(false);

  const fetchData = async () => {
    try {
      const data = await API.graphql(graphqlOperation(listIncomingDatas));
      setData(data?.data.listIncomingDatas?.items);
    } catch (e) {
      console.log("e", e);
    }
  };

  let createSubscription;

  function setupSubscription() {
    createSubscription = API.graphql(
      graphqlOperation(onCreateIncomingData)
    ).subscribe({
      next: (data) => {
        setData((prev) => [...prev, data?.value?.data?.onCreateIncomingData]);
        setSubscribed(true);
      },
      error: (err) => {
        console.log("subscription Error", err);
      },
    });
  }

  const checkAuth = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setCurrentUser(user);
  };

  useEffect(() => {
    fetchData();
    checkAuth();
  }, []);

  useEffect(() => {
    setupSubscription();
    return () => {
      createSubscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div>
        <Header />
      </div>
      <Container>
        <h2 className='mainHeading'>Iot Sensor</h2>
        <div className='cardMain'>
          <Card
            title='Temperature'
            tempReading={data[data?.length - 1]?.payload.currentTemp}
            temperature
            unit='Celcius'
            user={currentUser}
            subscribed={subscribed}
            setSubscribed={setSubscribed}
          />
          <Card
            title='Pressure'
            reading={data[data?.length - 1]?.payload.pressure}
            unit='bar'
          />
          <Card
            title='UV Index'
            reading={data[data?.length - 1]?.payload.uvIndex}
          />
          <Card
            title='Energy Consumption'
            reading={data[data?.length - 1]?.payload.energyConsumption}
            unit='kw'
          />
          <Card
            title='Water Consumption'
            reading={data[data?.length - 1]?.payload.waterConsumption}
            unit='litre'
          />
        </div>
      </Container>
    </div>
  );
}

export default withAuthenticator(App, true);
