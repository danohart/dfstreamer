import EventHost from './EventHost';

function Events() {
  return (
    <>
      <h2 className="center-align">Schedule</h2>
      <div className="events-container">
        <EventHost stage="df_thelivingroom" />
        <EventHost stage="df_thebedroom" />
        <EventHost stage="df_thegarage" />
      </div>
    </>
  );
}

export default Events;
