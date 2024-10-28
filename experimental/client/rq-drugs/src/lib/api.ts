import { Drug } from "../../../../server/strapi-cvs/types/globalTypes";

export const BASE_URL = "http://localhost:1337/api/drugs";

export const getDrugs = async (): Promise<Drug[]> => {
  const params = "?sort=name";
  const res = await fetch(BASE_URL + params);
  const results: { data: Drug[] } = await res.json();
  return results.data;
};

export const getDrug = async (id: string): Promise<Drug> => {
  const res = await fetch(`${BASE_URL}/${id}`);
  const results: { data: Drug } = await res.json();
  return results.data;
};

export const createDrug = async (drug: Drug): Promise<Drug> =>
  fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({ data: drug }),
  }).then((res) => res.json());

export const updateDrug = async (drug: Drug): Promise<Drug> => {
  const clone = { ...drug, approval_date: new Date(drug.approval_date) };
  // delete attributes that will cause collisions
  delete clone.documentId;
  delete clone.id;
  delete clone.createdAt;
  delete clone.publishedAt;
  delete clone.updatedAt;

  const res = await fetch(`${BASE_URL}/${drug.documentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      data: clone,
    }),
  });
  const results = await res.json();

  return results;
};

export const deleteDrug = async (drug: Drug): Promise<Drug> =>
  fetch(`${BASE_URL}/${drug.documentId}`, {
    method: "DELETE",
    headers: {
      Content_Type: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_STRAPI_API_TOKEN}`,
    },
  }).then(() => drug);
