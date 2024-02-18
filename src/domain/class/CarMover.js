import Car from './Car';

class CarMover {
  #moveFunction;
  #moveDistance;

  constructor(moveFunction, moveDistance) {
    this.#moveFunction = moveFunction;
    this.#moveDistance = moveDistance;
  }

  giveManyTry(car, maxTryCount) {
    this.#validateTryCount(maxTryCount);
    this.#giveManyTryRecursive(car, maxTryCount);
  }

  // #giveManyTryFor(car, maxTryCount) {
  //   for (let tryCount = 0; tryCount < maxTryCount; tryCount++)
  //     this.#giveOneTry(car);
  // }

  // 스택 오버플로우 방지를 위해 2 이상의 카운트가 들어올 경우 분기를 나눠서 실행
  #giveManyTryRecursive(car, leftCount) {
    if (leftCount >= 2) {
      this.#giveManyTryRecursive(car, Math.floor(leftCount / 2));
      this.#giveManyTryRecursive(car, leftCount - Math.floor(leftCount / 2));
    }
    if (leftCount === 1) this.#giveOneTry(car, leftCount - 1);
  }

  #giveOneTry(car) {
    if (!(car instanceof Car)) throw new Error('[ERROR] Car가 아님');
    const canGo = this.#moveFunction();
    car.grantTry(canGo ? this.#moveDistance : 0);
  }

  #validateTryCount(tryCount) {
    if (this.#isValidTryCount(tryCount))
      throw new Error('[ERROR] tryCount가 정수가 아님');
  }

  #isValidTryCount(tryCount) {
    return !Number.isInteger(tryCount) || tryCount < 0;
  }
}

export default CarMover;