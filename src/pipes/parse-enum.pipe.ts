import { NotAcceptableException, PipeTransform } from '@nestjs/common';
import { isInt } from 'class-validator';

export class ParseEnumPipeCustom<T> implements PipeTransform {
  #_enum: T;

  constructor(enumValue: T) {
    this.#_enum = enumValue;
  }

  transform(value: any) {
    if (!isInt(this.#_enum[value])) {
      throw new NotAcceptableException('Invalid enum value');
    }

    return value;
  }
}
