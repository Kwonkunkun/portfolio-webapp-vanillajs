/**
 * @description 두 값 사이의 랜덤값을 반환
 */
export const getRandomArbitrary = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

/**
 * @description clamp
 */
export const clamp = (value: number, min: number, max: number) => {
    return Math.min(Math.max(value, min), max);
}