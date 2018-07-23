const initialState = {
	posX: 0,
	posY: 0,
}
export default (state = initialState, action) => {
        const update = (
                state,
                mutations) => Object.assign({}, state, mutations)
        switch (action.type) {
                case 'MOVE_RIGHT':
                        return update(state, {
                                posX: state.posX + action.payload
                        })
		default:
			return state;
	}
}
