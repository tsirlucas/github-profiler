import React from 'react';
import {Card, CardHeader, List, ListItem} from 'material-ui';

export default class Repos extends React.Component {
    componentDidMount() {
        let store = this.context.store;
        this.unsubscribe = store.subscribe(() => {
            this.forceUpdate()
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        let store = this.context.store;
        let state = store.getState();

        return (
            <UserTemplate state={state.UserReducer}/>
        )
    }
}

Repos.contextTypes = {
    store: React.PropTypes.object
};

const UserTemplate = ({state}) => (
    <div>
        <ReposTemplate repos={state.data.repos}/>
    </div>
);

const ReposTemplate = ({repos, removeHandler}) => (
    <div className='col s12 m12 l4'>
        <Card>
            <CardHeader
                title='Repositories'
                subtitle='Users repositories'
            />
            <List className="repos-list">
                {repos.map((repo) => {
                    return <ListItem
                        primaryText={repo.name}
                        secondaryText={repo.description}
                        onClick={() => window.open(repo.html_url, '_blank')}
                        key={repos.indexOf(repo)}
                    />
                })}
            </List>
        </Card>
    </div>
);
