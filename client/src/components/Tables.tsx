type Day = Engineers[];
type Engineers = {
  firstName: string;
  totalShifts: number;
  id: number;
};
type Props = {
  week: Day[];
  title: string;
};
const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const Table = ({ week, title }: Props) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th></th>
            {weekDays.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th id="time">🔅 AM</th>
            {week.map((day, i) => (
              //If undefined or null, return 'Not Available'
              <td key={`${title}-${weekDays[i]}-${day[0]?.id}`}>
                {day[0]?.firstName ?? "N/A"}
              </td>
            ))}
          </tr>
          <tr>
            <th id="time">✨ PM</th>
            {week.map((day, i) => (
              //If undefined or null, return 'Not Available'
              <td key={`${title}-${weekDays[i]}-${day[1]?.id}`}>
                {day[1]?.firstName ?? "N/A"}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};
