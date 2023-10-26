export async function load({ url }) {
	return {
		step: Number(url.pathname.split('/').pop())
	};
}
