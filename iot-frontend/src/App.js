import "./app.css";
import React, { useState, useEffect } from "react";
import Amplify, { graphqlOperation, API, Auth } from "aws-amplify";
import { onCreateIncomingData, onUpdatedUser } from "./graphql/subscriptions";
import { withAuthenticator } from "@aws-amplify/ui-react";
import { dataByTimestamp, getUserDeviceMapping } from "./graphql/queries";
import { createUser } from "./graphql/mutations";
import awsmobile from "./aws-exports";
import Container from "./components/container/Container";
import Header from "./components/header/Header";
import Card from "./components/card/Card";
import Loader from "./components/loader/loader";
Amplify.configure(awsmobile);
function App() {
  const [data, setData] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [subscribed, setSubscribed] = useState(false);
  const [DBUser, setDBUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const clientid = localStorage.getItem("userId");
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    try {
      const data = await API.graphql(
        graphqlOperation(dataByTimestamp, {
          deviceId: "test_mqtt",
          limit: 1,
          timestamp: { lt: new Date().getTime() },
          sortDirection: "DESC",
        })
      );
      setData(data?.data.dataByTimestamp?.items[0]);
    } catch (e) {
      return e;
    }
  };

  let createSubscription;
  let onUserUpdated;
  const setupSubscription = () => {
    createSubscription = API.graphql(
      graphqlOperation(onCreateIncomingData)
    ).subscribe({
      next: (data) => {
        setData(data?.value?.data?.onCreateIncomingData);
        setSubscribed(true);
      },
      error: (err) => {
        return err;
      },
    });

    onUserUpdated = API.graphql(graphqlOperation(onUpdatedUser)).subscribe({
      next: (data) => {
        if (data?.value?.data?.onUpdatedUser?.clientId == clientid) {
          checkUserDB();
        }
      },
      error: (err) => {
        return err;
      },
    });
  };

  const checkAuth = async () => {
    const user = await Auth.currentAuthenticatedUser();
    setCurrentUser(user);
    localStorage.setItem("userId", user.attributes.sub);
    setUserId(user.attributes.sub);
  };

  useEffect(() => {
    fetchData();
    checkAuth();
  }, []);

  useEffect(() => {
    setupSubscription();
    return () => {
      createSubscription.unsubscribe();
      onUserUpdated.unsubscribe();
    };
  }, []);

  const checkUserDB = async () => {
    setLoading(true);
    try {
      const user = await API.graphql(
        graphqlOperation(getUserDeviceMapping, {
          deviceId: "test_mqtt",
          clientId: currentUser?.attributes?.sub,
        })
      );
      setDBUser(user.data.getUserDeviceMapping);
      setLoading(false);
    } catch (e) {
      return e;
    }
  };
  useEffect(() => {
    checkUserDB();
  }, [currentUser]);

  return (
    <div>
      <div>
        <Header />
      </div>
      <Container>
        {loading && DBUser ? (
          <div className='heading'>
            <Loader width='50' height='50' color='#f57733' />
          </div>
        ) : !DBUser && !loading ? (
          <h2 className='heading'>
            Currently, there is no device associated with your account
          </h2>
        ) : (
          <div>
            <h2 className='mainHeading'>{data?.deviceId}</h2>
            <div className='cardMain'>
              <Card
                title='Temperature'
                tempReading={data?.payload?.currentTemp}
                temperature
                unit='Celcius'
                user={currentUser}
                subscribed={subscribed}
                setSubscribed={setSubscribed}
                appsyncProp='currentTemp'
              />
              <Card
                title='Pressure'
                reading={data?.payload?.pressure}
                unit='bar'
                appsyncProp='pressure'
              />
              <Card
                title='UV Index'
                reading={data?.payload?.uvIndex}
                appsyncProp='uvIndex'
              />
              <Card
                title='Energy Consumption'
                reading={data?.payload?.energyConsumption}
                unit='kw'
                appsyncProp='energyConsumption'
              />
              <Card
                title='Water Consumption'
                reading={data?.payload?.waterConsumption}
                unit='litre'
                appsyncProp='waterConsumption'
              />
            </div>
          </div>
        )}
      </Container>
    </div>
  );
}

export default withAuthenticator(App, true);
