import { DocumentSummary } from "@features/documents/types.ts";

export const mockDocuments: DocumentSummary[] = [
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
