import React from 'react';
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
import { Close as CloseIcon } from '@material-ui/icons';
import { format } from 'date-fns';

const useStyles = makeStyles((theme) => ({
	info: {
		'& > *': {
			margin: '4px',
		},
	},
	skillChip: {
		margin: theme.spacing(0.75),
		padding: theme.spacing(0.75),
		fontSize: '14.5px',
		borderRadius: '5px',
		fontWeight: 600,
		backgroundColor: theme.palette.secondary.main,
		color: '#fff',
	},
}));

const ViewJobModal = (props) => {
	const classes = useStyles();

	return (
		<Dialog open={!!Object.keys(props.jobs).length} fullWidth>
			<DialogTitle>
				<Box display="flex" justifyContent="space-between" alignItems="center">
					{props.jobs.title} @ {props.jobs.companyName}
					<IconButton onClick={props.closeModal}>
						<CloseIcon />
					</IconButton>
				</Box>
			</DialogTitle>
			<DialogContent>
				<Box>
					<Box className={classes.info} display="flex">
						<Typography variant="body2">Posted on: </Typography>
						<Typography variant="caption">
							{props.jobs.postedOn &&
								format(props.jobs.postedOn, 'dd/MM/yyyy HH:MM')}
						</Typography>
					</Box>
					<Box className={classes.info} display="flex">
						<Typography variant="body2">Job Type: </Typography>
						<Typography variant="caption">{props.jobs.type}</Typography>
					</Box>
					<Box className={classes.info} display="flex">
						<Typography variant="body2">Job location: </Typography>
						<Typography variant="caption">{props.jobs.location}</Typography>
					</Box>
					<Box className={classes.info} display="flex">
						<Typography variant="body2">Job description: </Typography>
						<Typography variant="caption">{props.jobs.description}</Typography>
					</Box>
					<Box className={classes.info} display="flex">
						<Typography variant="body2">Company Name: </Typography>
						<Typography variant="caption">{props.jobs.companyName}</Typography>
					</Box>
					<Box display="flex" justify="center" alignItems="center" ml={0.5}>
						<Typography variant="captions">Skills: </Typography>
						<Grid container alignItems="center">
							{props.jobs.skills &&
								props.jobs.skills.map((s) => (
									<Grid item key={s} className={classes.skillChip}>
										{s}
									</Grid>
								))}
						</Grid>
					</Box>
				</Box>
			</DialogContent>
			<DialogActions></DialogActions>
		</Dialog>
	);
};

export default ViewJobModal;
