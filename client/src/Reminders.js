function Reminders(props) {
  const sidebar = (
    <ul>
      {props.events.map((event) =>
        <li key={event.id}>
          {event.title}
        </li>
      )}
    </ul>
  );
  const content = props.events.map((event) =>
    <div key={event.id}>
      <h3>{event.title}</h3>
      <p>{event.date}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'CSES GBM', date: 'September 10th, 2020 - 2:30 PM'},
  {id: 2, title: 'Khosla Fanclub GBM', date: 'September 11th, 2020 - 2:30 PM'},
  {id: 3, title: 'ZOOM Back-to-school Party', date: 'October 12th, 2020 - 5:00 PM'},
  {id: 4, title: 'ZOOM CS Students Meet-up', date: 'October 15th, 2020 - 6:00 PM'},
  {id: 5, title: 'ZOOM Dungeon CS Students Mixer', date: 'October 25th, 2020 - 7:00 PM'}
];
ReactDOM.render(
  <Blog events={events} />,
  document.getElementById('root')
);
