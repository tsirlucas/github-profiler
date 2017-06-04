import {h} from 'preact';

const icons = {
	remove: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z',
	sync: 'M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z'
};

const Icon = (props) => {
	const styles = {
		svg: {
			display: 'inline-block',
			verticalAlign: 'middle'
		},
		path: {
			fill: props.color
		}
	};
	return (
		<svg
			style={styles.svg}
			width={`${props.size || 25}px`}
			height={`${props.size || 25}px`}
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			fillRule="evenodd"
			clipRule="evenodd"
			strokeLinejoin="round"
			strokeMiterlimit="1.414"
		>
			<path style={styles.path} className={props.className || ''} d={icons[props.icon]} id={props.icon}/>
		</svg>
	);
};

export default Icon;
