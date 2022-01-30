import React, { useEffect, useState } from 'react';
import {
	Box,
	Button,
	CircularProgress,
	Grid,
	ThemeProvider,
} from '@material-ui/core';
import theme from './theme/theme';
import Header from './Components/Header/Header';
import SearchBar from './Components/SearchBar/SearchBar';
import JobCard from './Components/Job/JobCard';
import NewJobModal from './Components/Job/NewJobModal';
import { firestore, app } from './firebase/config';
import { Close as CloseIcon } from '@material-ui/icons';
import ViewJobModal from './Components/Job/ViewJobModal';

export default () => {
	const [jobs, setJobs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [customSearch, setCustomSearch] = useState(false);
	const [newJobModal, setNewJobModal] = useState(false);
	const [viewJob, setViewJob] = useState({});

	const fetchJobs = async () => {
		setCustomSearch(false);
		setLoading(true);

		const req = await firestore
			.collection('jobs')
			.orderBy('postedOn', 'desc')
			.get();

		const tempJobs = req.docs.map((job) => ({
			...job.data(),
			id: job.id,
			postedOn: job.data().postedOn.toDate(),
		}));

		setJobs(tempJobs);
		setLoading(false);
	};

	const fetchJobCustom = async (jobsearch) => {
		setLoading(true);
		setCustomSearch(true);

		const req = await firestore
			.collection('jobs')
			.orderBy('postedOn', 'desc')
			.where('location', '==', jobsearch.location)
			.where('type', '==', jobsearch.type)
			.get();

		const tempJobs = req.docs.map((job) => ({
			...job.data(),
			id: job.id,
			postedOn: job.data().postedOn.toDate(),
		}));

		setJobs(tempJobs);
		setLoading(false);
	};

	const postJob = async (jobDetails) => {
		await firestore.collection('jobs').add({
			...jobDetails,
			postedOn: app.firestore.FieldValue.serverTimestamp(),
		});

		fetchJobs();
	};

	useEffect(() => {
		fetchJobs();
	}, []);

	return (
		<ThemeProvider theme={theme}>
			<Header openNewJobModal={() => setNewJobModal(true)} />
			<NewJobModal
				closeNewJobModal={() => setNewJobModal(false)}
				newJobModal={newJobModal}
				postJob={postJob}
			/>
			<ViewJobModal jobs={viewJob} closeModal={() => setViewJob({})} />
			<Box mb={3}>
				<Grid container justify="center">
					<Grid item xs={10}>
						<SearchBar fetchJobCustom={fetchJobCustom} />
						{loading ? (
							<Box
								sx={{ height: '100%' }}
								display="flex"
								justifyContent="center"
							>
								<CircularProgress size={40} />
								<CircularProgress size={40} />
								<CircularProgress size={40} />
								<CircularProgress size={40} />
								<CircularProgress size={40} />
							</Box>
						) : (
							<>
								{customSearch && (
									<Box my={2} display="flex" justifyContent="flex-end">
										<Button onClick={fetchJobs}>
											<CloseIcon size={20} />
											Custom Search
										</Button>
									</Box>
								)}
								{jobs.map((job) => (
									<JobCard
										open={() => setViewJob(job)}
										key={job.id}
										job={job}
									/>
								))}
							</>
						)}
					</Grid>
				</Grid>
			</Box>
		</ThemeProvider>
	);
};
