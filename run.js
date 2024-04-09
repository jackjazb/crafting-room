import { spawn } from 'child_process';

if (process.argv.length === 2) {
	console.error('Expected a package.json script name as an argument');
	process.exit(1);
}

const script = process.argv[2];

spawn('yarn', [script], {
	shell: true,
	windowsHide: true,
	stdio: 'inherit'
});
