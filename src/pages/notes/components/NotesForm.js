import {h} from 'preact';

import Icon from '../../../commons/Icon';
import {isUserDefined} from '../../../core/user/user.helper';

export default ({handleUpdateInput, addNoteHandler, userInput, sending}) => (
	<div className='center-align'>
		<form onSubmit={addNoteHandler}>
			<input className='notes-input' type="text" onInput={handleUpdateInput} value={userInput}
						 disabled={!isUserDefined()} placeholder='Type your note' aria-label='add-note'/>
			<button label='Add' type="submit" disabled={!isUserDefined() || userInput.trim().length <= 0}
							class={`mdl-button mdl-js-ripple-effect mdl-js-button ${!isUserDefined() || userInput.trim().length <= 0 ? 'mdl-button--disabled' : ''}`}>
				{sending ? <Icon icon='sync' color='white' className='icon-spinner'/> : 'Add'}
			</button>
		</form>
	</div>
);
