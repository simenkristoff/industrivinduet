import { OptionEntity, OptionState } from '@/state/ducks/option/types';
import { FormInstance } from 'antd/lib/form';

export interface OptionFormInterface {
  form: FormInstance<OptionEntity>;
  data: OptionState | {};
}
