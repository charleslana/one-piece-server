import { registerDecorator, ValidationArguments, ValidationOptions } from 'class-validator';

export function IsTrimmed(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'isTrimmed',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') return false;
          return value === value.trim();
        },
        defaultMessage(args: ValidationArguments) {
          return `O valor de ${args.property} não pode começar ou terminar com espaços.`;
        },
      },
    });
  };
}
