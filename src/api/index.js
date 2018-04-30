export function fetchData (githubName, cb) {
	fetch(`https://api.github.com/users/${githubName}`, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
		.then(res => res.json())
		.then(res => cb(res))
}
