const diaSemana = [
  {
    weekday: "Monday",
    diaSemana: "Segunda",
  },
  {
    weekday: "Tuesday",
    diaSemana: "Terça",
  },
  {
    weekday: "Wednesday",
    diaSemana: "Quarta",
  },
  {
    weekday: "Thursday",
    diaSemana: "Quinta",
  },
  {
    weekday: "Friday",
    diaSemana: "Sexta",
  },
  {
    weekday: "Saturday",
    diaSemana: "Sábado",
  },
  {
    weekday: "Sunday",
    diaSemana: "Domingo",
  },
];
export function translate(weekday) {
  let dia = "";

  diaSemana.map((item) => {
    if (item.weekday == weekday) {
      dia = item.diaSemana;
    }
  });
  return dia;
}
