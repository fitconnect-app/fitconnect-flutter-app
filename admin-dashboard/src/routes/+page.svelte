<script>
	import { onMount } from 'svelte';
	import { initializeApp } from '@firebase/app';
	import { getFirestore, doc, onSnapshot, collection, setDoc } from '@firebase/firestore';
	import Logo from '$lib/assets/fitconnect-logo.png';

	// Initialize Firebase
	const firebaseConfig = {
		apiKey: 'AIzaSyCB9PXVoKwQnOpSnuhQgHvMzkSb_BNCqyg',
		authDomain: 'fitconnect-be78b.firebaseapp.com',
		projectId: 'fitconnect-be78b',
		storageBucket: 'fitconnect-be78b.appspot.com',
		messagingSenderId: '169795872766',
		appId: '1:169795872766:web:cf3a969e64724e021202af',
		measurementId: 'G-EPGVXR12QD'
	};

	const app = initializeApp(firebaseConfig);
	const db = getFirestore(app);

	/**
	 * @type {any[]}
	 */
	let emergencies = [];

	// Listen to changes in the "emergencies" collection
	const unsubscribe = onSnapshot(collection(db, 'emergencies'), (snapshot) => {
		emergencies = [];
		snapshot.forEach((doc) => {
			emergencies.push({ id: doc.id, ...doc.data() });
		});
		console.log('Current emergencies: ', emergencies);
	});

	onMount(() => {
		// Unsubscribe from the snapshot listener when the component is unmounted
		return () => {
			unsubscribe();
		};
	});

	/**
	 * @param {string} id
	 */
	async function approveRequest(id) {
		// Perform the approval logic here
		await setDoc(doc(db, 'emergencies', id), {
			...emergencies.find((emergency) => emergency.id === id),
			status: 'APPROVED'
		});
	}
</script>

<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto" />

<div class="container">
	<div class="header">
		<img src={Logo} alt="FitConnect Logo" class="logo" />
		<h1 class="title">FitConnect Emergencies</h1>
	</div>
	{#if emergencies.length > 0}
		<table>
			<thead>
				<tr>
					<th>Emergency ID</th>
					<th>User Name</th>
					<th>Reason</th>
					<th>Location</th>
					<th>Timestamp</th>
					<th>Status</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each emergencies as emergency}
					<tr>
						<td>{emergency.id.slice(0, 8)}</td>
						<td>{emergency.userName}</td>
						<td>{emergency.reason}</td>
						<td>
							Lat. {emergency.location.latitude.toFixed(2)}<br />
							Lon. {emergency.location.longitude.toFixed(2)}
						</td>
						<td>{emergency.timestamp.toDate().toLocaleString()}</td>
						<td>{emergency.status}</td>
						<td class="actions">
							{#if emergency.status === 'PENDING'}
								<button on:click={() => approveRequest(emergency.id)}>Approve</button>
							{:else}
								<p>No action available</p>
							{/if}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{:else}
		<p>No emergencies found.</p>
	{/if}
</div>

<style>
	.container {
		font-family: 'Roboto', sans-serif;
		max-width: 80%;
		margin: 0 auto;
		padding: 20px;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 20px;
	}

	.logo {
		height: 50px;
	}

	.title {
		font-size: 24px;
		font-weight: bold;
		color: #091540;
	}

	table {
		width: 100%;
		text-align: center;
		border-collapse: collapse;
		margin-bottom: 20px;
	}

	th,
	td {
		text-align: center !important;
		padding: 10px;
		border: 0px solid #ffffff;
	}

	th {
		background-color: #20a4f3;
		color: #ffffff;
		font-weight: bold;
		text-align: left;
	}

	td {
		background-color: #09154036;
	}

	.actions {
		text-align: center;
	}

	.actions button {
		background-color: #dc602e;
		color: #ffffff;
		border: none;
		padding: 8px 16px;
		font-size: 14px;
		cursor: pointer;
		border-radius: 8px;
	}
</style>
