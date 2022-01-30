import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	FilledInput,
	Grid,
	makeStyles,
	MenuItem,
	Select,
	Typography,
	IconButton,
	CircularProgress,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Close as CloseIcon } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
	skillChip: {
		margin: theme.spacing(0.75),
		padding: theme.spacing(0.75),
		fontSize: '14.5px',
		borderRadius: '5px',
		fontWeight: 600,
		border: `1px solid ${theme.palette.secondary.main}`,
		color: theme.palette.secondary.main,
		cursor: 'pointer',

		'&:hover': {
			backgroundColor: theme.palette.secondary.main,
			color: '#fff',
		},
	},
	included: {
		backgroundColor: theme.palette.secondary.main,
		color: '#fff',
	},
}));

const initialState = {
	title: '',
	type: 'Full Time',
	companyName: '',
	companyUrl: '',
	location: 'Remote',
	link: '',
	description: '',
	skills: [],
};

const NewJobModal = (props) => {
	const [jobDetails, setJobDetails] = useState(initialState);
	const [loading, setLoading] = useState(false);

	const handleChange = (e) => {
		e.persist();
		setJobDetails((oldState) => ({
			...oldState,
			[e.target.name]: e.target.value,
		}));
	};

	const addRemoveSkill = (skill) => {
		jobDetails.skills.includes(skill)
			? setJobDetails((oldState) => ({
					...oldState,
					skills: oldState.skills.filter((s) => s !== skill),
			  }))
			: setJobDetails((oldState) => ({
					...oldState,
					skills: oldState.skills.concat(skill),
			  }));
	};

	// console.log(jobDetails);

	const handleSubmit = async () => {
		for (const field in jobDetails) {
			if (typeof jobDetails[field] === 'string' && !jobDetails[field]) {
				return;
			}
		}
		if (!jobDetails.skills.length) return;

		setLoading(true);
		await props.postJob(jobDetails);
		closeModal();
	};

	const closeModal = () => {
		setJobDetails(initialState);
		setLoading(false);
		props.closeNewJobModal();
	};

	const skills = [
		'JavaScript',
		'React',
		'Node',
		'Express',
		'Vue',
		'Firebase',
		'MongoDB',
		'SQL',
	];

	const classes = useStyles();

	return (
		<Dialog open={props.newJobModal} fullWidth>
			<DialogTitle>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					Post Job
					<IconButton onClick={closeModal}>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Grid container spacing={2}>
					<Grid item xs={6}>
						<FilledInput
							onChange={handleChange}
							autoComplete="off"
							name="title"
							value={jobDetails.title}
							placeholder="Job title"
							disableUnderline
							fullWidth
						></FilledInput>
					</Grid>
					<Grid item xs={6}>
						<Select
							onChange={handleChange}
							name="type"
							value={jobDetails.type}
							disableUnderline
							variant="filled"
							fullWidth
						>
							<MenuItem value="Full time">Full time</MenuItem>
							<MenuItem value="Part time">Part time</MenuItem>
							<MenuItem value="Contract">Contract</MenuItem>
						</Select>
					</Grid>
					<Grid item xs={6}>
						<FilledInput
							onChange={handleChange}
							name="companyName"
							value={jobDetails.companyName}
							autoComplete="off"
							placeholder="Company name"
							disableUnderline
							fullWidth
						></FilledInput>
					</Grid>
					<Grid item xs={6}>
						<FilledInput
							onChange={handleChange}
							name="companyUrl"
							value={jobDetails.companyUrl}
							autoComplete="off"
							placeholder="Company url"
							disableUnderline
							fullWidth
						></FilledInput>
					</Grid>
					<Grid item xs={6}>
						<Select
							onChange={handleChange}
							defaultValue="Remote"
							name="location"
							value={jobDetails.location}
							disableUnderline
							variant="filled"
						>
							<MenuItem value="Remote">Remote</MenuItem>
							<MenuItem value="In-office">In-office</MenuItem>
						</Select>
					</Grid>
					<Grid item xs={6}>
						<FilledInput
							onChange={handleChange}
							name="link"
							value={jobDetails.link}
							autoComplete="off"
							placeholder="Job link"
							disableUnderline
							fullWidth
						></FilledInput>
					</Grid>
					<Grid item xs={12}>
						<FilledInput
							onChange={handleChange}
							name="description"
							value={jobDetails.description}
							autoComplete="off"
							placeholder="Job description"
							disableUnderline
							multiline
							rows={4}
							fullWidth
						></FilledInput>
					</Grid>
				</Grid>
				<Box mt={2}>
					<Typography>Skills*</Typography>
					<Box display="flex">
						{skills.map((skill) => (
							<Box
								onClick={() => addRemoveSkill(skill)}
								className={`${classes.skillChip} ${
									jobDetails.skills.includes(skill) && classes.included
								}`}
								key={skill}
							>
								{skill}
							</Box>
						))}
					</Box>
				</Box>
			</DialogContent>
			<DialogActions>
				<Box
					color="red"
					width="100%"
					display="flex"
					justifyContent="space-between"
					alignItems="center"
				>
					<Typography variant="caption">*Required fields</Typography>
					<Button
						onClick={handleSubmit}
						variant="contained"
						disableElevation
						color="primary"
						disabled={loading}
					>
						{loading ? (
							<CircularProgress color="secondary" size={22} />
						) : (
							'Post job'
						)}
					</Button>
				</Box>
			</DialogActions>
		</Dialog>
	);
};

export default NewJobModal;
