import EventHost from './EventHost';
import EventHost2 from './EventHost2';

function Events() {
  return (
    <>
      <h2 className='center-align'>Schedule</h2>
      <h3 className='center-align'>Day 1</h3>
      <div className='events-container'>
        <EventHost stage='df_thelivingroom' />
        <EventHost stage='df_thebedroom' />
        <EventHost stage='df_thegarage' />
      </div>
      <h3 className='center-align'>Day 2</h3>
      <div className='events-container2'>
        <EventHost2 stage='df_thelivingroom' />
        <EventHost2 stage='df_thebedroom' />
        <EventHost2 stage='df_thegarage' />
      </div>
    </>
  );
}

export default Events;
