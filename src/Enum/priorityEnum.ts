enum PriorityEnum{
  Alta= 1,
  Media=2,
  Baixa=3,
}

export function getPriorityByNumber(priorityNumber: number): string {
  switch (priorityNumber) {
    case PriorityEnum.Alta:
      return 'Alta';
    case PriorityEnum.Media:
      return 'Media';
    case PriorityEnum.Baixa:
      return 'Baixa';
    default:
      return 'Prioridade inválida';
  }
}