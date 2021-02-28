const optionsFull = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Sao_Paulo",
};

const optionsDate = {
  day: "numeric",
  month: "numeric",
  year: "numeric",
  timeZone: "America/Sao_Paulo",
};

const optionsTime = {
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
  hour12: false,
  timeZone: "America/Sao_Paulo",
};

export const formatDateTime = (value) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat("pt-BR", optionsFull).format(date);
};

export const formatDate = (value) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat("pt-BR", optionsDate).format(date);
};

export const formatTime = (value) => {
  const date = new Date(value);
  return new Intl.DateTimeFormat("pt-BR", optionsTime).format(date);
};
