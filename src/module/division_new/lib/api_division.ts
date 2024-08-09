import { IFormFixDivision } from "./type_division";

export const funGetAllDivision = async (path?: string) => {
   const response = await fetch(`/api/division${(path) ? path : ''}`, { next: { tags: ['division'] } });
   return await response.json().catch(() => null);
}

export const funGetDivisionById = async (path: string) => {
   const response = await fetch(`/api/division/${path}`);
   return await response.json().catch(() => null);
}

export const funGetDetailDivisionById = async (path: string, kategori: string) => {
   const response = await fetch(`/api/division/${path}/detail?cat=${kategori}`);
   return await response.json().catch(() => null);
}

export const funCreateDivision = async (data: IFormFixDivision) => {
   const response = await fetch("/api/division", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
}