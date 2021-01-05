import { FormApi, SubmissionErrors } from 'final-form';

export interface DatabaseFormProps {
  editMode: boolean;
  onSubmit: (
    values: Record<string, any>,
    form: FormApi<Record<string, any>, any>,
    callback?: ((errors?: SubmissionErrors | undefined) => void) | undefined,
  ) => void;
}

export interface DatabaseManagerProps<DataType> {
  name: {
    singular: string;
    plural: string;
  };
  tableConfig?: TableProps<DataType> | undefined;
  modalConfig?: ModalProps;
  data: DataType[];
  columns: ColumnsType<DataType>;
  component: React.ComponentType<any>;
  updateObject: (record: DataType) => void;
  addObject: (record: DataType) => void;
  deleteObject: (id: string) => void;
  setObject: (record: DataType | Record<string, unknown>) => void;
}
