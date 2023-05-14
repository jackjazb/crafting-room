import { useParams } from "react-router-dom";

export function BookingFlow() {
	let success = useParams().success;
	if (!success) {
		return <></>;
	}

	const isSuccess = JSON.parse(success);
	let pageInfo;

	if (isSuccess) {
		pageInfo = (
			<>
				<h1>Booking Complete</h1>
				<p>You will receive confirmation shortly via email</p>
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
