import moment from 'moment';
import 'moment/locale/nb';

// Components
import {DatePicker, TimePicker} from 'antd';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/no';


/** 
 * DatePickerAdapter
 * https://ant.design/components/date-picker/
 */
export const DatePickerAdapter = ({input, label, meta, ...rest}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className="form-group">
            <label className="col-form-label" htmlFor={input.name}>{label}</label>
            <DatePicker
             name={input.name} 
             className={`form-control ${hasError ? 'is-invalid' : ''}`}
             format={'ll'}
             onChange={(event) => input.onChange(event)}
             onBlur={(event) => input.onBlur(event)}
             onFocus={(event) => input.onFocus(event)}
             defaultValue={input.value ? moment(input.value) : null}
             {...rest}
            />
            {hasError && (
                <small className="form-error text-danger">{meta.error}</small>
            )}
        </div>
    );
}

/** 
 * TimePickerAdapter
 * https://ant.design/components/time-picker/
 */
export const TimePickerAdapter = ({input, label, meta, ...rest}) => {
    const hasError = meta.error && meta.touched;
    return (
        <div className="form-group">
            <label className="col-form-label" htmlFor={input.name}>{label}</label>
            <TimePicker
             name={input.name} 
             className={`form-control ${hasError ? 'is-invalid' : ''}`}
             format={'HH:mm'}
             onChange={(event) => input.onChange(event)}
             onBlur={(event) => input.onBlur(event)}
             onFocus={(event) => input.onFocus(event)}
             defaultValue={input.value ? moment(input.value) : null}
             {...rest}
            />
            {hasError && (
                <small className="form-error text-danger">{meta.error}</small>
            )}
        </div>
    );
}

/** 
 * CKEditor
 * https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/react.html
 */
 export const CKEditorAdapter = ({input, label, meta, id, ...rest}) => {
     const hasError = meta.error && meta.touched;
     return (
         <div className="form-group">
            <label className="col-form-label" htmlFor={input.name}>{label}</label>
            <div id={id}>
                <CKEditor
                 name={input.name} 
                 editor={ClassicEditor}
                 onChange={(event, editor) => input.onChange(editor.getData())}
                 onBlur={(event, editor) => input.onBlur(event, editor)}
                 onFocus={(event, editor) => input.onFocus(event, editor)}
                 config={{
                     language: 'no',
                     initialData: input.value,
                 }}
                />
            </div>
            {hasError && (
                <small className="form-error text-danger">{meta.error}</small>
            )}
         </div>
     )
 }

 /** 
 * InputAdapter
 */
 export const InputAdapter = ({input, label, meta, ...props}) => {
     const hasError = meta.error && meta.touched;
     return (
         <div className={props.className ? props.className : 'form-group'}>
            <label className="col-form-label" htmlFor={input.name}>{label}</label>
            <input
             className={`form-control ${hasError ? 'is-invalid' : ''}`}
             placeholder
             onChange={(event) => input.onChange(event)}
             onBlur={(event) => input.onBlur(event)}
             onFocus={(event) => input.onFocus(event)}
             {...input}
            />
            {props.icon}
            {hasError && (
                <small className="form-error text-danger">{meta.error}</small>
            )}
         </div>
     )
 }

 /**
 * InputIconAdapter 
 */

 export const InputIconAdapter = ({input, label, meta, ...props}) => {
     const hasError = meta.error && meta.touched;
     return (
         <div className={props.className ? props.className : 'form-group'}>
            <div className="input-group">
                <input
                className={`form-control ${hasError ? 'is-invalid' : ''}`}
                placeholder
                onChange={(event) => input.onChange(event)}
                onBlur={(event) => input.onBlur(event)}
                onFocus={(event) => input.onFocus(event)}
                {...input}
                />
                <div className="input-group-append">
                    <div class="input-group-text">{props.icon}</div>
                </div>
            </div>
            {hasError && (
                <small className="form-error text-danger">{meta.error}</small>
            )}
         </div>
     )
 }