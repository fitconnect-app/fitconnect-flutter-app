<script>
	import { onMount } from 'svelte';
	import { initializeApp } from '@firebase/app';
	import { getFirestore, doc, onSnapshot, collection, setDoc } from '@firebase/firestore';

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
				<td>{emergency.id}</td>
				<td>{emergency.userName}</td>
				<td>{emergency.reason}</td>
				<td>Latitude: {emergency.location.latitude}, Longitude: {emergency.location.longitude}</td>
				<td>{emergency.timestamp.toDate().toLocaleString()}</td>
				<td>{emergency.status}</td>
				<td>
					{#if emergency.status === 'PENDING'}
						<button on:click={() => approveRequest(emergency.id)}>Approve</button>
					{:else}
						<p>Already approved</p>
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>
