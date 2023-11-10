import { FormikProps } from 'formik';
import PersonalInfoForm from './PersonalInfoForm/PersonalInfoForm';
import AddressForm from './AddressForm/AddressForm';
import PreferencesForm from './PreferencesForm/PreferencesForm';
import FinalForm from './FinalForm/FinalForm';
import ConfirmationPage from '../ConfirmationPage/ConfirmationPage';
import { IDataForForm } from '@/interfaces/IDataForForms';

import style from './customForm.module.scss';

function CustomForm({ formik, currentStep }: { formik: FormikProps<IDataForForm>, currentStep: number }) {

	switch (+currentStep) {
		case 1:
			return <PersonalInfoForm formik={formik} />;
		case 2:
			return <AddressForm formik={formik} />;
		case 3:
			return <PreferencesForm formik={formik} />;
		case 4:
			return <FinalForm formik={formik} />;
		case 5:
			return <ConfirmationPage formik={formik} />;
		default:
			return null;
	}
}

export default CustomForm;