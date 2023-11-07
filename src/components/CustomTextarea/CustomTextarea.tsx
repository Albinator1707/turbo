import { ThemeContext } from '@/theme/theme';
import cn from 'classnames';
import { FormikProps } from 'formik';
import { useContext } from 'react';
import { FormValues } from '../CustomForm/formik';

import style from './customTextarea.module.scss';

function CustomTextarea({ formik, label }: { formik: FormikProps<FormValues>, label: string }) {
	const { theme } = useContext(ThemeContext);
	return (
		<textarea
			id={`${label}`}
			className={cn(style.textarea, style[`textarea__${theme}`])}
			onChange={formik.handleChange}
			onBlur={formik.handleBlur}
			value={formik.values[label]}
		/>
	);
}

export default CustomTextarea;