import { FormInstance } from 'antd/lib/form';

import { OptionEntity, OptionState } from '@/types';

/**
 * Inteface describes a basic OptionForm
 * @interface OptionFormInterface
 */
export interface OptionFormInterface {
  form: FormInstance<OptionEntity>;
  data: OptionState | {};
}
