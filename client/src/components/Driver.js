
import React, { useEffect, useState } from 'react'; // changed
import {
  Breadcrumb, Col, Row
} from 'react-bootstrap'; // changed
import { Redirect } from 'react-router-dom';

import TripCard from './TripCard'; // new
import { isDriver } from '../services/AuthService';
import { getTrips } from '../services/TripService'; // new

function Driver (props) {
  // new
  const [trips, setTrips] = useState([]);

  // new
  useEffect(() => {
    const loadTrips = async () => {
      const { response, isError } = await getTrips();
      if (isError) {
        setTrips([]);
      } else {
        setTrips(response.data);
      }
    }
    loadTrips();
  }, []);

  if (!isDriver()) {
    return <Redirect to='/' />
  }

  // new
  const getCurrentTrips = () => {
    return trips.filter(trip => {
      return trip.driver !== null && trip.status !== 'COMPLETED';
    });
  };

  // new
  const getRequestedTrips = () => {
    return trips.filter(trip => {
      return trip.status === 'REQUESTED';
    });
  };

  // new
  const getCompletedTrips = () => {
    return trips.filter(trip => {
      return trip.status === 'COMPLETED';
    });
  };

return (
  <Row>
    <Col lg={12}>
      <Breadcrumb>
        <Breadcrumb.Item href='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Dashboard</Breadcrumb.Item>
      </Breadcrumb>

      {/* changed */}
      <TripCard
        title='Current Trip'
        trips={getCurrentTrips()}
        group='rider'
        otherGroup='driver'
      />

      {/* changed */}
      <TripCard
        title='Recent Trips'
        trips={getCompletedTrips()}
        group='rider'
        otherGroup='driver'
      />

    </Col>
  </Row>
);
}

export default Driver;