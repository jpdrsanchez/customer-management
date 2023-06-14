export enum Gender {
  MALE = 'male',
  FEMALE = 'female'
}

export const genderObject: Record<Gender, string> = {
  [Gender.FEMALE]: 'F',
  [Gender.MALE]: 'M'
}
