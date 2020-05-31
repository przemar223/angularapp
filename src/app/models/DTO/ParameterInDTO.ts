import { OptionDTO } from './OptionDTO';

export class ParameterInDTO {
    membershipFunctions: OptionDTO[] = new Array<OptionDTO>();s
    algorithmFunctions: OptionDTO[] = new Array<OptionDTO>();
    selectedAmountCars: String = '';
    type: String = '';
    ratioValue: String = '';
}
