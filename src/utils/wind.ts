export type WindDirectionClass =
  | 'north'
  | 'northEast'
  | 'east'
  | 'southEast'
  | 'south'
  | 'southWest'
  | 'west'
  | 'northWest';

const directions = [
  { label: 'N', className: 'north' },
  { label: 'NE', className: 'northEast' },
  { label: 'E', className: 'east' },
  { label: 'SE', className: 'southEast' },
  { label: 'S', className: 'south' },
  { label: 'SW', className: 'southWest' },
  { label: 'W', className: 'west' },
  { label: 'NW', className: 'northWest' },
] as const;

function getWindDirectionIndex(degrees: number): number {
  return Math.round((((degrees % 360) + 360) % 360) / 45) % directions.length;
}

export function getWindDirectionLabel(degrees: number): string {
  return directions[getWindDirectionIndex(degrees)].label;
}

export function getWindDirectionClass(degrees: number): WindDirectionClass {
  return directions[getWindDirectionIndex(degrees)].className;
}
