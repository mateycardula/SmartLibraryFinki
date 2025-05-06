import { Document } from "@features/documents/types.ts";

export const mockDocuments: Document[] = [
  {
    id: "1",
    title: "Пример PDF документ",
    categories: ["Историја"],
    file: "/sample.pdf",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Пример PDF документ 2",
    categories: ["Математика"],
    file: "/sample.pdf",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Пример PDF документ",
    categories: ["Историја"],
    file: "/sample.pdf",
    createdAt: new Date().toISOString(),
  },
];
