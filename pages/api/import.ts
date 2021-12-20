import dayjs from 'dayjs';
import { config } from '../../util/config';

export default async function importAppointments(_req, res) {
  const result = await fetch(config.apiUrl, {
    method: 'GET',
    headers: {
      key: config.apiKey,
    },
  });
  const json = await result.json();

  const fixedData = json.map((appointment) => {
    const dayjsDate = dayjs(appointment.date);
    const date = dayjsDate.get('date');
    const month = dayjsDate.get('month');
    const year = dayjsDate.get('year');
    return {
      ...appointment,
      startTime: dayjs(appointment.startTime)
        .set('date', date)
        .set('month', month)
        .set('year', year),
      endTime: dayjs(appointment.endTime)
        .set('date', date)
        .set('month', month)
        .set('year', year),
    };
  });

  res.status(200).json(fixedData);
}
