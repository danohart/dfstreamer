import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { withData } from '../lib/withData';

export const ALL_EVENTS = gql`
  query ALL_EVENTS {
    events {
      title
      host
      date
      startTime
      endTime
    }
  }
`;

function tConvert(time) {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }
  return time.join(''); // return adjusted time or original string
}

function Events(props) {
  const { loading, error, data } = useQuery(ALL_EVENTS);
  if (loading) return <p>Loading ...</p>;
  if (error)
    return (
      <>
        <h3>Sorry, there was an error.</h3>
        <p>{error.message}</p>
      </>
    );
  console.log('stage', props.stage);
  return (
    <div className="events-container">
      {data.events.map((event) => (
        <div className="event" key={event.title}>
          <div className="event-title">
            <h3>{event.title}</h3>
          </div>
          <div className="event-time">
            <div className="event-time-startTime">
              {tConvert(event.startTime)}
            </div>
            <div className="event-time-endTime">{tConvert(event.endTime)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default withData()(Events);
