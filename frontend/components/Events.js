import EventHost from './EventHost';

function Events() {
  return (
    <>
      <h2 className="center-align">Events</h2>
      <EventHost stage="df_thelivingroom" />
      <EventHost stage="df_thebedroom" />
      <EventHost stage="df_thegarage" />
    </>
  );
}

export default Events;
