import { FormikProps } from 'formik';
import { FormValues } from '../CustomForm/formik';
import { IDataForForm } from '@/interfaces/IDataForForms';

import style from './customRadioInput.module.scss';

function customRadioInput({ formik, name, value }: { formik: FormikProps<IDataForForm>, name: string, value: string }) {
	return (
		<input
			className={style.radio}
			type="radio"
			name={name}
			value={value}
			id={value}
			checked={formik.values[name as keyof FormValues] === value}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
		/>
	)
}

export default customRadioInput;