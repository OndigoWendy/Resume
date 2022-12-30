import React, { useState, useEffect } from 'react';
import Typewriter from 'typewriter-effect';
import Fade from 'react-reveal';
import endpoints from '../constants/endpoints';
import Social from './Social';
import FallbackSpinner from './FallbackSpinner';
import { useLoadScript } from '@react-google-maps/api';
import { GoogleMap, Marker } from '@react-google-maps/api';

const styles = {
  nameStyle: {
    fontSize: '5em',
  },
  inlineChild: {
    display: 'inline-block',
  },
  mainContainer: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

 function Home() {
  const [data, setData] = useState(null);

  const libraries = ['places'];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAvNcw4PwN72DeAzyvhn9AOFh9t2vII9VE',
    libraries,
  });

  function renderMap() {
    if (loadError) return 'Error loading the map';
    if (!isLoaded) return 'Loading the map';

    const mapContainerStyle = {
      width: '400px',
      height: '400px',
    };

    const center = {
      lat: -34.397,
      lng: 150.644,
    };

    return (
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
      >
        <Marker position={center} />
      </GoogleMap>
    );
  }

  useEffect(() => {
    fetch(endpoints.home, {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((res) => setData(res))
      .catch((err) => err);
  }, []);

  return data ? (
    <Fade>
      <div style={styles.mainContainer}>
        <h1 style={styles.nameStyle}>{data?.name}</h1>
        <div style={{ flexDirection: 'row' }}>
          <h2 style={styles.inlineChild}>I&apos;m&nbsp;</h2>
          <Typewriter
            options={{
              loop: true,
              autoStart: true,
              strings: data?.roles,
            }}
          />
        </div>
        <Social />
      </div>
      <div>
        {renderMap()}
      </div>
    </Fade>
  ) : <FallbackSpinner />;
          }

export default Home;