import {
  ArgumentMetadata,
  NotAcceptableException,
  PipeTransform,
} from '@nestjs/common';

export class ParseIntCustomPipe implements PipeTransform {
  #defaultNumber: number;

  constructor(defaultValue: number) {
    this.#defaultNumber = defaultValue;
  }

  transform(value: any, metadata: ArgumentMetadata) {
    if(value == "test") return this.#defaultNumber;

    const number = parseInt(value, 10);

    if (isNaN(number)) {
      throw new NotAcceptableException(
        `${metadata.data} should be valid number`,
      );
    }

    return number;
  }
}
