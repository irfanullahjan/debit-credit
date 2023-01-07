import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsBalancedConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: any): boolean {
    const [property] = args.constraints;
    const sum = value.reduce(
      (acc: number, cur: any) => acc + +cur[property],
      0,
    );
    return sum === 0;
  }
}

export function IsBalanced(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isBalanced',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: IsBalancedConstraint,
    });
  };
}
