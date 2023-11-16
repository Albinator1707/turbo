import { RootState } from "@/store/types";
import { useDispatch, useSelector } from "react-redux";
import { ThemeContext } from "@/theme/theme";
import { useContext, useEffect, useState } from "react";
import Select from 'react-select';
import cn from 'classnames';
import { sortByProp } from "@/store/actions";
import { filterByGender, filterByInterest } from "@/store/actions";
import { IDataForForm } from "@/interfaces/IDataForForms";

import style from './tablePage.module.scss';

function TablePage() {
	const { theme } = useContext(ThemeContext);
	const dataFromForms = useSelector((state: RootState) => state.form);
	const filteredData = useSelector((state: RootState) => state.filter);
	const [data, setData] = useState<IDataForForm[]>(dataFromForms);
	const filterOptions = [
		{ value: 'none', label: 'None' },
		{
			label: 'Gender',
			options: [
				{ value: 'Male', label: 'Male' },
				{ value: 'Female', label: 'Female' },
			],
		},
		{
			label: 'Interests',
			options: [
				{ value: 'Reading', label: 'Reading' },
				{ value: 'Travel', label: 'Travel' },
				{ value: 'Sports', label: 'Sports' },
				{ value: 'Music', label: 'Music' },
				{ value: 'Gaming', label: 'Gaming' },
			]
		}
	]

	const sortingOptions = [
		{ value: 'firstName', label: 'First name' },
		{ value: 'NotificationRange', label: 'Notification range' },
	]
	const [selectedFilter, setSelectedFilter] = useState<{ value: string, label: string }>(filterOptions[0]);
	const [selectedSort, setSelectedSort] = useState<{ value: string, label: string }>();
	const dispatcher = useDispatch();

	useEffect(() => {
		switch (selectedSort?.value) {
			case 'firstName':
				dispatcher(sortByProp('firstName'));
				break;
			case 'NotificationRange':
				dispatcher(sortByProp('notificationFrequency'));
				break;
			default:
				break;
		}
	}, [selectedSort])

	useEffect(() => {
		switch (selectedFilter?.value) {
			case 'Male':
				dispatcher(filterByGender({ data: dataFromForms, type: 'male' }))
				break;
			case 'Female':
				dispatcher(filterByGender({ data: dataFromForms, type: 'female' }))
				break;
			case 'Reading':
				dispatcher(filterByInterest({ data: dataFromForms, type: 'Reading' }))
				break;
			case 'Travel':
				dispatcher(filterByInterest({ data: dataFromForms, type: 'Travel' }))
				break;
			case 'Sports':
				dispatcher(filterByInterest({ data: dataFromForms, type: 'Sports' }))
				break;
			case 'Music':
				dispatcher(filterByInterest({ data: dataFromForms, type: 'Music' }))
				break;
			case 'Gaming':
				dispatcher(filterByInterest({ data: dataFromForms, type: 'Gaming' }))
				break;
		}
	}, [selectedFilter])

	useEffect(() => {
		if (selectedFilter?.value === 'none') {
			setData(dataFromForms);
		} else {
			setData(filteredData);
		}
	}, [selectedFilter, selectedSort, dataFromForms, filteredData])

	return (
		<div className={cn(style.table, style[`${theme}`])}>
			<h1>Table Page</h1>
			<section className={style.table__wrapper}>
				<h2>Table</h2>
				<div className={style.table__filtration}>
					<div className={style[`table__filtration-item`]}>
						<h3>Filter by: </h3>
						<Select
							isSearchable={false}
							options={filterOptions}
							value={selectedFilter}
							onChange={(selectedOption) => setSelectedFilter(selectedOption!)}
						/>
					</div>
					<div className={style[`table__filtration-item`]}>
						<h3>Sort by: </h3>
						<Select
							isSearchable={false}
							options={sortingOptions}
							value={selectedSort}
							onChange={(selectedOption) => setSelectedSort(selectedOption!)}
						/>
					</div>
				</div>
				<table>
					<tr>
						<th className={style.table__header}>First name</th>
						<th className={style.table__header}>Last name</th>
						<th className={style.table__header}>Email</th>
						<th className={style.table__header}>Gender</th>
						<th className={style.table__header}>Address</th>
						<th className={style.table__header}>Country</th>
						<th className={style.table__header}>Postal code</th>
						<th className={style.table__header}>Interests</th>
						<th className={style.table__header}>Language</th>
						<th className={style.table__header}>Notification frequency</th>
						<th className={style.table__header}>Comments</th>
						<th className={style.table__header}>Image</th>
					</tr>
					{data.length !== 0 ? data.map((item, index) => (
						item.terms != false && (
							<tr key={index}>
								<td className={style.table__descr}>{item.firstName}</td>
								<td className={style.table__descr}>{item.lastName}</td>
								<td className={cn(style.table__descr, style.table__descr_nowrap)}>{item.email}</td>
								<td className={cn(style.table__descr, style.table__descr_center)}>{item.gender}</td>
								<td className={cn(style.table__descr, style.table__descr_nowrap)}>{item.city}</td>
								<td className={style.table__descr}>{item.country.label}</td>
								<td className={cn(style.table__descr, style.table__descr_center)}>{item.zipCode}</td>
								<td className={style.table__descr}>{item.interests.map((interest, i) => (<li key={i}>{interest}</li>))}</td>
								<td className={style.table__descr}>{item.language.label}</td>
								<td className={cn(style.table__descr, style.table__descr_center)}>{item.notificationFrequency}</td>
								<td className={style.table__descr}>{item.comments}</td>
								<td className={style.table__descr}>{item.profilePicture}</td>
							</tr>
						)
					)) : (
						<tr>
							<td className={style.table__descr} colSpan={12}>
								<h3 style={{ textAlign: 'center' }}> No info! Please, fill the form</h3>
							</td>
						</tr>
					)}
				</table>
			</section>
		</div>
	)
}

export default TablePage;