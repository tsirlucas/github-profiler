import {h} from 'preact';

const icons = {
    close: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
};

const CloseIcon = props => {
    const styles = {
        svg: {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        path: {
            fill: 'black'
        }
    };
    return (
        <svg
            style={styles.svg}
            width={`25px`}
            height={`25px`}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
            stroke-linejoin="round"
            stroke-miterlimit="1.414">
            <path style={styles.path} d={icons['close']}/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    );
};

export default CloseIcon;
