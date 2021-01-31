import { OptionEntity } from '@/state/ducks/option/types';
import { FormInstance } from 'antd/lib/form';

export interface OptionFormInterface {
  form: FormInstance<OptionEntity>;
}
