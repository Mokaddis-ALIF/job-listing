import {
	Box,
	Button,
	makeStyles,
	MenuItem,
	Select,
	CircularProgress,
} from '@material-ui/core';
import React, { useState } from 'react';

const useStyles = makeStyles({
	wrapper: {
		backgroundColor: '#fff',
		display: 'flex',
		boxShadow: '0px 1px 5px rgba(0,0,0,0.1)',
		borderRadius: '5px',
		'& > *': {
			flex: 1,
			height: '45px',
			margin: '8px',
		},
	},
});

const SearchBar = (props) => {
	const [jobSearch, setJobSearch] = useState({
		type: 'Full time',
		location: 'Remote',
	});
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		e.persist();
		setJobSearch((oldState) => ({
			...oldState,
			[e.target.name]: e.target.value,
		}));
	};

	// console.log(jobSearch);

	const search = async () => {
		setLoading(true);
		await props.fetchJobCustom(jobSearch);
		setLoading(false);
	};

	const classes = useStyles();

	return (
		<Box p={2} mt={-5} mb={2} className={classes.wrapper}>
			<Select
				onChange={handleChange}
				value={jobSearch.type}
				name="type"
				disableUnderline
				variant="filled"
			>
				<MenuItem value="Full time">Full time</MenuItem>
				<MenuItem value="Part time">Part time</MenuItem>
				<MenuItem value="Contract">Contract</MenuItem>
			</Select>
			<Select
				onChange={handleChange}
				value={jobSearch.location}
				name="location"
				disableUnderline
				variant="filled"
			>
				<MenuItem value="Remote">Remote</MenuItem>
				<MenuItem value="In-office">In-office</MenuItem>
			</Select>
			<Button
				onClick={search}
				disabled={loading}
				variant="contained"
				color="primary"
				disableElevation
			>
				{loading ? <CircularProgress color="secondary" size={22} /> : 'Search'}
			</Button>
		</Box>
	);
};

export default SearchBar;
