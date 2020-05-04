import React, { useState } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const CREATE_EVENT = gql`
  mutation CREATE_EVENT(
    $title: String!
    $host: String!
    $date: String!
    $startTime: String!
    $endTime: String!
  ) {
    createEvent(
      title: $title
      host: $host
      date: $date
      startTime: $startTime
      endTime: $endTime
    ) {
      host
    }
  }
`;

export default function AddEvent() {
  const [
    title,
    host,
    date,
    startTime,
    endTime,
    setTitle,
    setHost,
    setDate,
    setStartTime,
    setEndTime,
  ] = useState('');

  const [addEvent, { data }] = useMutation(CREATE_EVENT);
  return (
    <>
      <h2>Test</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addEvent({
            variables: {
              title: { title },
              host: { host },
              date: { date },
              startTime: { startTime },
              endTime: { endTime },
            },
          });
        }}
      >
        <input id="title" name="title" placeholder="Title" value={title} />
        <input id="title" name="title" placeholder="Host/Stage" value={host} />
        <input id="title" name="title" placeholder="Date" value={date} />
        <input
          id="title"
          name="title"
          placeholder="Start Time"
          value={startTime}
        />
        <input id="title" name="title" placeholder="End Time" value={endTime} />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}
