import { describe, expect, it } from "vitest";
import { getPriorityByNumber } from "./priorityEnum";

describe("teste retorno de enumeração", () => {
  it("deve retornar 'Alta' para 1", () => {
    const result = getPriorityByNumber(1);
    expect(result).toBe('Alta');
  });

  it("deve retornar 'Media' para 2", () => {
    const result = getPriorityByNumber(2);
    expect(result).toBe('Media');
  });

  it("deve retornar 'Baixa' para 3", () => {
    const result = getPriorityByNumber(3);
    expect(result).toBe('Baixa');
  });

  it("deve retornar 'Prioridade inválida' para número fora do enum", () => {
    const result = getPriorityByNumber(99);
    expect(result).toBe('Prioridade inválida');
  });
});