import React, {useEffect, useState} from "react";
import "react-datetime/css/react-datetime.css";
import Datetime from "react-datetime";

const DateTimePicker = (props) => {

    const [classStyles, setClassStyles] = useState(props.className);

    const {placeholder} = props;

    useEffect(() => {
        setClassStyles(props.className);
    }, [props.className])

    const renderInput = (props) => {
        return (
            <input {...props} className={classStyles} placeholder={placeholder}/>
        );
    }

    return <Datetime {...props} className="" renderInput={renderInput} />;
}

export default DateTimePicker;
