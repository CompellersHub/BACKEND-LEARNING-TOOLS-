import Handlebars from "handlebars";

const dateFormatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

Handlebars.registerHelper("formatDate", function (date: Date): string {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", dateFormatOptions);
});

Handlebars.registerHelper("formatPrice", function (price: number) {
  return `$${price.toFixed(2)}`;
});

Handlebars.registerHelper("fallback", function (value: any, fallback: any) {
  return value ?? fallback;
});
