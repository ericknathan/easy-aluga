import type { CompanyModel } from "$lib/types";

export function updateCompanyColors(company: CompanyModel) {
  document.body.style.setProperty('--primary', company.primary_color);
  document.body.style.setProperty('--primary-opaque', `${company.primary_color}66`);
  document.body.style.setProperty('--primary-filter', company.filter);
}