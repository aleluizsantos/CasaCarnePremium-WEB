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

export const formatDate = (value) => {
  try {
    const date = new Date(value);
    return new Intl.DateTimeFormat("pt-BR", optionsDate).format(date);
  } catch (error) {
    return;
  }
};

export const formatDateTime = (value) => {
  try {
    const date = new Date(value);
    return new Intl.DateTimeFormat("pt-BR", optionsFull).format(date);
  } catch (error) {
    return;
  }
};

export const formatTime = (value) => {
  try {
    const date = new Date(value);
    return new Intl.DateTimeFormat("pt-BR", optionsTime).format(date);
  } catch (error) {
    return;
  }
};

export const formatCurrency = (value) => {
  try {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value);
  } catch (error) {
    return;
  }
};
