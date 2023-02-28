import { useParams } from "react-router-dom";

export function BookingFlow() {
	let success = useParams().success;
	if (!success) {
		return <></>;
	}

	const isSuccess = JSON.parse(success);
	console.log(isSuccess);
	let pageInfo;

	if (isSuccess) {
		pageInfo = (
			<>
				<h1>Booking Complete</h1>
				<p>You should receive a receipt shortly via email</p>
			</>
		);
	}
	else {
		pageInfo = (
			<h1>Booking Failed</h1>
		);
	}
	return (
		<div className="container">
			{pageInfo}
		</div>
	);
}
