import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

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
        <div class="error">
          <h3>Sorry, there was an error.</h3>
          <p>{error.message}</p>
        </div>
      </>
    );

  const events = data.events;

  return (
    <>
      <h3
        className="center-align"
        style={{ gridColumn: `${props.stage}`, gridRow: 'tracks' }}
      >
        {props.stage === 'df_thelivingroom' ? 'Living Room' : ''}
        {props.stage === 'df_thebedroom' ? 'Bedroom' : ''}
        {props.stage === 'df_thegarage' ? 'Garage' : ''}
      </h3>
      {events.map((event) => {
        const cleanStartTime = event.startTime.split(':').join('');
        const cleanEndTime = event.endTime.split(':').join('');
        const GMTstartTime = Number(cleanStartTime) + 500;
        const GMTendTime = Number(cleanEndTime) + 500;

        if (event.host === props.stage)
          return (
            <>
              <div
                className={`event ${props.stage}`}
                key={event.title}
                style={{
                  gridRow: `time-${cleanStartTime} / time-${cleanEndTime}`,
                  gridColumn: props.stage,
                }}
                key={event.title}
              >
                <div className="event-title">
                  <h3>{event.title}</h3>
                </div>
                <div className="event-time">
                  <div className="event-time-startTime">
                    {tConvert(event.startTime)}
                  </div>
                  <div className="event-time-endTime">
                    {tConvert(event.endTime)}
                  </div>
                </div>
                <div className="event-reminder">
                  <a
                    href={`http://www.google.com/calendar/event?action=TEMPLATE&dates=20200518T${GMTstartTime}00Z%2F20200518T${GMTendTime}00Z&text=${event.title}%20Reminder!&location=${event.host}&details=Live on distancefest.com`}
                    target="_blank"
                  >
                    <FontAwesomeIcon icon={faClock} />
                    Remind me
                  </a>
                </div>
              </div>
            </>
          );
      })}
    </>
  );
}

export default withData()(Events);
