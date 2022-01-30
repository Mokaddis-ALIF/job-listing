import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { differenceInHours, differenceInMinutes } from 'date-fns';
import React from 'react';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		border: '1px solid #e8e8e8',
		cursor: 'pointer',
		transition: '.3s',

		'&:hover': {
			boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.1)',
			borderLeft: '6px solid #4D64E4',
		},
	},
	companyName: {
		fontSize: '13.5px',
		backgroundColor: theme.palette.primary.main,
		padding: theme.spacing(0.75),
		borderRadius: '5px',
		display: 'inline-block',
		fontWeight: 600,
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

const JobCard = (props) => {
	const {
		title,
		type,
		location,
		companyName,
		// companyUrl,
		skills,
		// link,
		postedOn,
	} = props.job;

	const classes = useStyles();

	const time = differenceInMinutes(Date.now(), postedOn);
	const newTime = time > 60 ? `${Math.round(time / 60)} hour` : `${time} min`;

	return (
		<Box p={2} className={classes.wrapper}>
			<Grid container alignItems="center">
				<Grid item xs>
					<Typography variant="subtitle1">{title}</Typography>
					<Typography className={classes.companyName} variant="subtitle1">
						{companyName}
					</Typography>
				</Grid>
				<Grid item container xs>
					{skills.map((skill) => (
						<Grid className={classes.skillChip} key={skill} item>
							{skill}
						</Grid>
					))}
				</Grid>
				<Grid item container direction="column" alignItems="flex-end" xs>
					<Grid item>
						<Typography variant="caption">
							{newTime} ago | {type} |{location}
						</Typography>
					</Grid>
					<Grid item>
						<Box mt={1}>
							<Button onClick={props.open} variant="outlined">
								Check
							</Button>
						</Box>
					</Grid>
				</Grid>
			</Grid>
		</Box>
	);
};

export default JobCard;
