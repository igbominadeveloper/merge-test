export const isDesiredAge = (birthDay: Date, desiredAge = 18): boolean => {
  const currentDate = new Date();
  const birthDate = new Date(birthDay);
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    return age - 1 >= desiredAge;
  }
  return age >= desiredAge;
};

export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const convertToNumber = (value: string) => parseFloat(value.replace(/[^\d.]/g, ''));
