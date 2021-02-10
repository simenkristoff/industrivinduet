import { FormInstance } from 'antd/lib/form';
import { OptionEntity, OptionState } from '@/types';

export interface OptionFormInterface {
  form: FormInstance<OptionEntity>;
  data: OptionState | {};
}
