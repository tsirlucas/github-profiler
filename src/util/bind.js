function bind(target, key, {value: fn}) {
	return {
		configurable: true,
		get() {
			let value = fn.bind(this);
			Object.defineProperty(this, key, {
				value,
				configurable: true,
				writable: true
			});
			return value;
		}
	};
}

function multiMethod(inner, deco) {
	deco = deco || inner.decorate || decorator(inner);
	let d = deco();
	return (...args) => {
		let l = args.length;
		return (l < 2 ? deco : (l > 2 ? d : inner))(...args);
	};
}

function decorator(fn) {
	return opt => (
		typeof opt==='function' ? fn(opt) : (target, key, desc) => {
			desc.value = fn(desc.value, opt, target, key, desc);
		}
	);
}

export default multiMethod((f, c) => f.bind(c), () => bind);
