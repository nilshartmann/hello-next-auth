import Link from "next/link";

export default async function UserPage() {
	return <div><h1>User!</h1>
		<p><Link href={"/"} prefetch={true}>Back</Link></p>
	</div>
}