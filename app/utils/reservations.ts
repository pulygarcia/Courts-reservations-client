import { isToday, parseISO } from "date-fns";

export const weekDays = [
    {value: '1', day: 'Lunes'},
    {value: '2', day: 'Martes'},
    {value: '3', day: 'Miercoles'},
    {value: '4', day: 'Jueves'},
    {value: '5', day: 'Viernes'},
    {value: '6', day: 'Sabado'},
    {value: '0', day: 'Domingo'}
]

export const getTodayReservations = async () => {
    const req = await fetch(`${process.env.API_BASE_URL}/reservations`);
    const res = await req.json();

    const todayReservations = res.filter((r: { date: string }) => 
      isToday(parseISO(r.date))
    );

    //order asc
    todayReservations.sort((a:any, b:any) => {
      const startA = Number(a.startTime.split(":")[0]);
      const startB = Number(b.startTime.split(":")[0]);

      const result = startA - startB //if < 0 → a before b, if > 0 → a after b
      return result; //reordered array
    });

    return todayReservations;
};

export const getFixedReservations = async () => {
    const req = await fetch(`${process.env.API_BASE_URL}/fixed-reservations`);
    const res = await req.json();

    //order asc
    const orderedReservations = res.sort((a:any, b:any) => {
      const startA = Number(a.startTime.split(":")[0]);
      const startB = Number(b.startTime.split(":")[0]);

      const result = startA - startB //if < 0 → a before b, if > 0 → a after b
      return result; //reordered array
    });

    return orderedReservations;
};

export const getUserReservations = async (id:number) => {
  const req = await fetch(`${process.env.API_BASE_URL}/users/${id}`)
  const res = await req.json();

  return res.reservations
}